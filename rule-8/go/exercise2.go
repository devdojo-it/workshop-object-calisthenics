package main

import "fmt"

type OrderManager struct {
	OrderRepository      any
	PaymentGateway       any
	ShippingService      any
	InventoryService     any
	NotificationService  any
	LoggingService       any
	AnalyticsService     any
	TaxCalculator        any
}

func (om *OrderManager) ProcessOrder(order *Order) any {
	om.LoggingService.(Logger).Log(fmt.Sprintf("Inizio elaborazione ordine: %v", order.ID))
	if !om.InventoryService.(Inventory).CheckStock(order.Items) {
		om.NotificationService.(Notifier).Send(order.CustomerEmail, "Ordine fallito: articoli esauriti")
		return nil
	}
	taxes := om.TaxCalculator.(TaxCalc).Calculate(order)
	order.Total += taxes
	paymentResult := om.PaymentGateway.(Gateway).Charge(order.Total)
	if !paymentResult.Success {
		om.NotificationService.(Notifier).Send(order.CustomerEmail, "Ordine fallito: problema nel pagamento")
		return nil
	}
	om.OrderRepository.(Repository).Save(order)
	om.ShippingService.(Shipper).Ship(order)
	om.AnalyticsService.(Analytics).Track(order)
	om.LoggingService.(Logger).Log(fmt.Sprintf("Ordine elaborato con successo: %v", order.ID))
	return paymentResult
}

func (om *OrderManager) CancelOrder(order *Order) any {
	om.LoggingService.(Logger).Log(fmt.Sprintf("Annullamento ordine: %v", order.ID))
	om.NotificationService.(Notifier).Send(order.CustomerEmail, fmt.Sprintf("Il tuo ordine %v è stato annullato.", order.ID))
	refundResult := om.PaymentGateway.(Gateway).Refund(order.Total)
	order.Status = "cancelled"
	om.OrderRepository.(Repository).Save(order)
	return refundResult
}

func (om *OrderManager) RefundOrder(order *Order) any {
	om.LoggingService.(Logger).Log(fmt.Sprintf("Richiesta di rimborso per ordine: %v", order.ID))
	refundResult := om.PaymentGateway.(Gateway).Refund(order.Total)
	if refundResult.Success {
		order.Status = "refunded"
		om.OrderRepository.(Repository).Save(order)
		om.NotificationService.(Notifier).Send(order.CustomerEmail, fmt.Sprintf("Il rimborso per il tuo ordine %v è stato effettuato.", order.ID))
	}
	return refundResult
}

func (om *OrderManager) TrackOrder(order *Order) any {
	om.LoggingService.(Logger).Log(fmt.Sprintf("Tracciamento ordine: %v", order.ID))
	trackingInfo := om.ShippingService.(Shipper).GetTrackingInfo(order)
	om.AnalyticsService.(Analytics).Track(order)
	return trackingInfo
}

func (om *OrderManager) ApplyDiscount(order *Order, discountCode string) float64 {
	om.LoggingService.(Logger).Log(fmt.Sprintf("Applicazione sconto per ordine: %v con codice %v", order.ID, discountCode))
	if discountCode == "DISCOUNT10" {
		order.Total = order.Total * 0.9
		om.NotificationService.(Notifier).Send(order.CustomerEmail, fmt.Sprintf("È stato applicato uno sconto del 10%% al tuo ordine %v.", order.ID))
	} else {
		om.NotificationService.(Notifier).Send(order.CustomerEmail, fmt.Sprintf("Codice sconto %v non valido per ordine %v.", discountCode, order.ID))
	}
	om.OrderRepository.(Repository).Save(order)
	return order.Total
} 