<?php
class OrderManager {
    public function __construct(
        public $orderRepository,
        public $paymentGateway,
        public $shippingService,
        public $inventoryService,
        public $notificationService,
        public $loggingService,
        public $analyticsService,
        public $taxCalculator
    ) {}

    public function processOrder($order) {
        $this->loggingService->log("Inizio elaborazione ordine: {$order->id}");
        if (!$this->inventoryService->checkStock($order->items)) {
            $this->notificationService->send($order->customerEmail, "Ordine fallito: articoli esauriti");
            return null;
        }
        $taxes = $this->taxCalculator->calculate($order);
        $order->total += $taxes;
        $paymentResult = $this->paymentGateway->charge($order->total);
        if (!$paymentResult->success) {
            $this->notificationService->send($order->customerEmail, "Ordine fallito: problema nel pagamento");
            return null;
        }
        $this->orderRepository->save($order);
        $this->shippingService->ship($order);
        $this->analyticsService->track($order);
        $this->loggingService->log("Ordine elaborato con successo: {$order->id}");
        return $paymentResult;
    }

    public function cancelOrder($order) {
        $this->loggingService->log("Annullamento ordine: {$order->id}");
        $this->notificationService->send($order->customerEmail, "Il tuo ordine {$order->id} è stato annullato.");
        $refundResult = $this->paymentGateway->refund($order->total);
        $order->status = 'cancelled';
        $this->orderRepository->save($order);
        return $refundResult;
    }

    public function refundOrder($order) {
        $this->loggingService->log("Richiesta di rimborso per ordine: {$order->id}");
        $refundResult = $this->paymentGateway->refund($order->total);
        if ($refundResult->success) {
            $order->status = 'refunded';
            $this->orderRepository->save($order);
            $this->notificationService->send($order->customerEmail, "Il rimborso per il tuo ordine {$order->id} è stato effettuato.");
        }
        return $refundResult;
    }

    public function trackOrder($order) {
        $this->loggingService->log("Tracciamento ordine: {$order->id}");
        $trackingInfo = $this->shippingService->getTrackingInfo($order);
        $this->analyticsService->track($order);
        return $trackingInfo;
    }

    public function applyDiscount($order, $discountCode) {
        $this->loggingService->log("Applicazione sconto per ordine: {$order->id} con codice {$discountCode}");
        if ($discountCode === 'DISCOUNT10') {
            $order->total = $order->total * 0.9;
            $this->notificationService->send($order->customerEmail, "È stato applicato uno sconto del 10% al tuo ordine {$order->id}.");
        } else {
            $this->notificationService->send($order->customerEmail, "Codice sconto {$discountCode} non valido per ordine {$order->id}.");
        }
        $this->orderRepository->save($order);
        return $order->total;
    }
} 