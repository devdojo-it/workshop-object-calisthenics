class OrderManager {
    constructor(
        public orderRepository: any,
        public paymentGateway: any,
        public shippingService: any,
        public inventoryService: any,
        public notificationService: any,
        public loggingService: any,
        public analyticsService: any,
        public taxCalculator: any
    ) {}

    processOrder(order: any): any {
        this.loggingService.log(`Inizio elaborazione ordine: ${order.id}`);
        if (!this.inventoryService.checkStock(order.items)) {
            this.notificationService.send(order.customerEmail, "Ordine fallito: articoli esauriti");
            return null;
        }
        const taxes = this.taxCalculator.calculate(order);
        order.total += taxes;
        const paymentResult = this.paymentGateway.charge(order.total);
        if (!paymentResult.success) {
            this.notificationService.send(order.customerEmail, "Ordine fallito: problema nel pagamento");
            return null;
        }
        this.orderRepository.save(order);
        this.shippingService.ship(order);
        this.analyticsService.track(order);
        this.loggingService.log(`Ordine elaborato con successo: ${order.id}`);
        return paymentResult;
    }

    cancelOrder(order: any): any {
        this.loggingService.log(`Annullamento ordine: ${order.id}`);
        this.notificationService.send(order.customerEmail, `Il tuo ordine ${order.id} è stato annullato.`);
        const refundResult = this.paymentGateway.refund(order.total);
        order.status = 'cancelled';
        this.orderRepository.save(order);
        return refundResult;
    }

    refundOrder(order: any): any {
        this.loggingService.log(`Richiesta di rimborso per ordine: ${order.id}`);
        const refundResult = this.paymentGateway.refund(order.total);
        if (refundResult.success) {
            order.status = 'refunded';
            this.orderRepository.save(order);
            this.notificationService.send(order.customerEmail, `Il rimborso per il tuo ordine ${order.id} è stato effettuato.`);
        }
        return refundResult;
    }

    trackOrder(order: any): any {
        this.loggingService.log(`Tracciamento ordine: ${order.id}`);
        const trackingInfo = this.shippingService.getTrackingInfo(order);
        this.analyticsService.track(order);
        return trackingInfo;
    }

    applyDiscount(order: any, discountCode: string): number {
        this.loggingService.log(`Applicazione sconto per ordine: ${order.id} con codice ${discountCode}`);
        if (discountCode === 'DISCOUNT10') {
            order.total = order.total * 0.9;
            this.notificationService.send(order.customerEmail, `È stato applicato uno sconto del 10% al tuo ordine ${order.id}.`);
        } else {
            this.notificationService.send(order.customerEmail, `Codice sconto ${discountCode} non valido per ordine ${order.id}.`);
        }
        this.orderRepository.save(order);
        return order.total;
    }
} 