package main

type Cart struct {
	TotalAmount float64
}

func (c Cart) HasHeavyItems() bool {
	return false // stub
}

type User struct {
	IsPremium bool
}

func (u User) HasActiveCoupon() bool {
	return false // stub
}

func CalculateShipping(cart Cart, user User) float64 {
	if cart.TotalAmount > 100 {
		return 0
	} else {
		if user.IsPremium {
			return 4.99
		} else {
			if cart.HasHeavyItems() {
				return 15.99
			} else {
				if user.HasActiveCoupon() {
					return 2.99
				} else {
					return 8.99
				}
			}
		}
	}
} 