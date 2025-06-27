struct Cart {
    total_amount: f64,
}

impl Cart {
    fn has_heavy_items(&self) -> bool {
        false // stub
    }
}

struct User {
    is_premium: bool,
}

impl User {
    fn has_active_coupon(&self) -> bool {
        false // stub
    }
}

fn calculate_shipping(cart: &Cart, user: &User) -> f64 {
    if cart.total_amount > 100.0 {
        0.0
    } else {
        if user.is_premium {
            4.99
        } else {
            if cart.has_heavy_items() {
                15.99
            } else {
                if user.has_active_coupon() {
                    2.99
                } else {
                    8.99
                }
            }
        }
    }
} 