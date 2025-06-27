package main

type Item struct {
	Price    float64w
	Quantity int
	Discount *float64 // nil if no discount
}

type Cart struct {
	Items []Item
}

func CalculateCartTotalBad(cart Cart) float64 {
	total := 0.0
	if len(cart.Items) > 0 {
		for i := 0; i < len(cart.Items); i++ {
			item := cart.Items[i]
			if item.Price > 0 {
				if item.Quantity > 0 {
					total += item.Price * float64(item.Quantity)
					if item.Discount != nil {
						total -= *item.Discount
					}
				}
			}
		}
	}
	return total
} 