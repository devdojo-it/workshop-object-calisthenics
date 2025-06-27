#[derive(Debug)]
struct Item {
    price: f64,
    quantity: i32,
    discount: Option<f64>,
}

#[derive(Debug)]
struct Cart {
    items: Vec<Item>,
}

fn calculate_cart_total_bad(cart: &Cart) -> f64 {
    let mut total = 0.0;
    if !cart.items.is_empty() {
        for i in 0..cart.items.len() {
            let item = &cart.items[i];
            if item.price > 0.0 {
                if item.quantity > 0 {
                    total += item.price * item.quantity as f64;
                    if let Some(discount) = item.discount {
                        total -= discount;
                    }
                }
            }
        }
    }
    total
} 