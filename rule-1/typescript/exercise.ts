interface Item {
    price: number;
    quantity: number;
    discount?: number;
}

interface Cart {
    items: Item[];
}

function calculateCartTotalBad(cart: Cart): number {
    let total = 0;
    if (cart.items.length > 0) {
        for (let i = 0; i < cart.items.length; i++) {
            const item = cart.items[i];
            if (item.price > 0) {
                if (item.quantity > 0) {
                    total += item.price * item.quantity;
                    if (item.discount !== undefined) {
                        total -= item.discount;
                    }
                }
            }
        }
    }
    return total;
} 