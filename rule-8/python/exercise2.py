class OrderManager:
    def __init__(self, order_repository, payment_gateway, shipping_service, inventory_service,
                 notification_service, logging_service, analytics_service, tax_calculator):
        self.order_repository = order_repository
        self.payment_gateway = payment_gateway
        self.shipping_service = shipping_service
        self.inventory_service = inventory_service
        self.notification_service = notification_service
        self.logging_service = logging_service
        self.analytics_service = analytics_service
        self.tax_calculator = tax_calculator

    def process_order(self, order):
        self.logging_service.log(f"Inizio elaborazione ordine: {order.id}")
        if not self.inventory_service.check_stock(order.items):
            self.notification_service.send(order.customer_email, "Ordine fallito: articoli esauriti")
            return None
        taxes = self.tax_calculator.calculate(order)
        order.total += taxes
        payment_result = self.payment_gateway.charge(order.total)
        if not payment_result.success:
            self.notification_service.send(order.customer_email, "Ordine fallito: problema nel pagamento")
            return None
        self.order_repository.save(order)
        self.shipping_service.ship(order)
        self.analytics_service.track(order)
        self.logging_service.log(f"Ordine elaborato con successo: {order.id}")
        return payment_result

    def cancel_order(self, order):
        self.logging_service.log(f"Annullamento ordine: {order.id}")
        self.notification_service.send(order.customer_email, f"Il tuo ordine {order.id} è stato annullato.")
        refund_result = self.payment_gateway.refund(order.total)
        order.status = 'cancelled'
        self.order_repository.save(order)
        return refund_result

    def refund_order(self, order):
        self.logging_service.log(f"Richiesta di rimborso per ordine: {order.id}")
        refund_result = self.payment_gateway.refund(order.total)
        if refund_result.success:
            order.status = 'refunded'
            self.order_repository.save(order)
            self.notification_service.send(order.customer_email, f"Il rimborso per il tuo ordine {order.id} è stato effettuato.")
        return refund_result

    def track_order(self, order):
        self.logging_service.log(f"Tracciamento ordine: {order.id}")
        tracking_info = self.shipping_service.get_tracking_info(order)
        self.analytics_service.track(order)
        return tracking_info

    def apply_discount(self, order, discount_code):
        self.logging_service.log(f"Applicazione sconto per ordine: {order.id} con codice {discount_code}")
        if discount_code == 'DISCOUNT10':
            order.total = order.total * 0.9
            self.notification_service.send(order.customer_email, f"È stato applicato uno sconto del 10% al tuo ordine {order.id}.")
        else:
            self.notification_service.send(order.customer_email, f"Codice sconto {discount_code} non valido per ordine {order.id}.")
        self.order_repository.save(order)
        return order.total 