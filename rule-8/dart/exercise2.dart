class OrderManager {
  final dynamic orderRepository;
  final dynamic paymentGateway;
  final dynamic shippingService;
  final dynamic inventoryService;
  final dynamic notificationService;
  final dynamic loggingService;
  final dynamic analyticsService;
  final dynamic taxCalculator;

  OrderManager({
    required this.orderRepository,
    required this.paymentGateway,
    required this.shippingService,
    required this.inventoryService,
    required this.notificationService,
    required this.loggingService,
    required this.analyticsService,
    required this.taxCalculator,
  });

  dynamic processOrder(dynamic order) {
    loggingService.log('Inizio elaborazione ordine: ${order.id}');
    if (!inventoryService.checkStock(order.items)) {
      notificationService.send(order.customerEmail, 'Ordine fallito: articoli esauriti');
      return null;
    }
    final taxes = taxCalculator.calculate(order);
    order.total += taxes;
    final paymentResult = paymentGateway.charge(order.total);
    if (!paymentResult.success) {
      notificationService.send(order.customerEmail, 'Ordine fallito: problema nel pagamento');
      return null;
    }
    orderRepository.save(order);
    shippingService.ship(order);
    analyticsService.track(order);
    loggingService.log('Ordine elaborato con successo: ${order.id}');
    return paymentResult;
  }

  dynamic cancelOrder(dynamic order) {
    loggingService.log('Annullamento ordine: ${order.id}');
    notificationService.send(order.customerEmail, 'Il tuo ordine ${order.id} è stato annullato.');
    final refundResult = paymentGateway.refund(order.total);
    order.status = 'cancelled';
    orderRepository.save(order);
    return refundResult;
  }

  dynamic refundOrder(dynamic order) {
    loggingService.log('Richiesta di rimborso per ordine: ${order.id}');
    final refundResult = paymentGateway.refund(order.total);
    if (refundResult.success) {
      order.status = 'refunded';
      orderRepository.save(order);
      notificationService.send(order.customerEmail, 'Il rimborso per il tuo ordine ${order.id} è stato effettuato.');
    }
    return refundResult;
  }

  dynamic trackOrder(dynamic order) {
    loggingService.log('Tracciamento ordine: ${order.id}');
    final trackingInfo = shippingService.getTrackingInfo(order);
    analyticsService.track(order);
    return trackingInfo;
  }

  double applyDiscount(dynamic order, String discountCode) {
    loggingService.log('Applicazione sconto per ordine: ${order.id} con codice $discountCode');
    if (discountCode == 'DISCOUNT10') {
      order.total = order.total * 0.9;
      notificationService.send(order.customerEmail, 'È stato applicato uno sconto del 10% al tuo ordine ${order.id}.');
    } else {
      notificationService.send(order.customerEmail, 'Codice sconto $discountCode non valido per ordine ${order.id}.');
    }
    orderRepository.save(order);
    return order.total;
  }
} 