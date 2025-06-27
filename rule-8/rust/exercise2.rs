pub struct OrderManager<'a> {
    pub order_repository: &'a dyn Repository,
    pub payment_gateway: &'a dyn Gateway,
    pub shipping_service: &'a dyn Shipper,
    pub inventory_service: &'a dyn Inventory,
    pub notification_service: &'a dyn Notifier,
    pub logging_service: &'a dyn Logger,
    pub analytics_service: &'a dyn Analytics,
    pub tax_calculator: &'a dyn TaxCalc,
}

impl<'a> OrderManager<'a> {
    pub fn process_order(&self, order: &mut Order) -> Option<PaymentResult> {
        self.logging_service.log(&format!("Inizio elaborazione ordine: {}", order.id));
        if !self.inventory_service.check_stock(&order.items) {
            self.notification_service.send(&order.customer_email, "Ordine fallito: articoli esauriti");
            return None;
        }
        let taxes = self.tax_calculator.calculate(order);
        order.total += taxes;
        let payment_result = self.payment_gateway.charge(order.total);
        if !payment_result.success {
            self.notification_service.send(&order.customer_email, "Ordine fallito: problema nel pagamento");
            return None;
        }
        self.order_repository.save(order);
        self.shipping_service.ship(order);
        self.analytics_service.track(order);
        self.logging_service.log(&format!("Ordine elaborato con successo: {}", order.id));
        Some(payment_result)
    }

    pub fn cancel_order(&self, order: &mut Order) -> RefundResult {
        self.logging_service.log(&format!("Annullamento ordine: {}", order.id));
        self.notification_service.send(&order.customer_email, &format!("Il tuo ordine {} è stato annullato.", order.id));
        let refund_result = self.payment_gateway.refund(order.total);
        order.status = "cancelled".to_string();
        self.order_repository.save(order);
        refund_result
    }

    pub fn refund_order(&self, order: &mut Order) -> RefundResult {
        self.logging_service.log(&format!("Richiesta di rimborso per ordine: {}", order.id));
        let refund_result = self.payment_gateway.refund(order.total);
        if refund_result.success {
            order.status = "refunded".to_string();
            self.order_repository.save(order);
            self.notification_service.send(&order.customer_email, &format!("Il rimborso per il tuo ordine {} è stato effettuato.", order.id));
        }
        refund_result
    }

    pub fn track_order(&self, order: &Order) -> TrackingInfo {
        self.logging_service.log(&format!("Tracciamento ordine: {}", order.id));
        let tracking_info = self.shipping_service.get_tracking_info(order);
        self.analytics_service.track(order);
        tracking_info
    }

    pub fn apply_discount(&self, order: &mut Order, discount_code: &str) -> f64 {
        self.logging_service.log(&format!("Applicazione sconto per ordine: {} con codice {}", order.id, discount_code));
        if discount_code == "DISCOUNT10" {
            order.total = order.total * 0.9;
            self.notification_service.send(&order.customer_email, &format!("È stato applicato uno sconto del 10% al tuo ordine {}.", order.id));
        } else {
            self.notification_service.send(&order.customer_email, &format!("Codice sconto {} non valido per ordine {}.", discount_code, order.id));
        }
        self.order_repository.save(order);
        order.total
    }
} 