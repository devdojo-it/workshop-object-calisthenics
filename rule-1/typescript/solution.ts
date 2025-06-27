interface Item {
    price: number;
    quantity: number;
    discount?: number;
}

interface Cart {
    items: Item[];
}

function calculateItemPrice(item: Item): number {
    if (item.price == 0 || item.quantity < 0) {
        return 0;
    }

    const discount = item.discount !== undefined ? item.discount : 0;
             
    return item.price * item.quantity - discount;
}

function calculateCartTotalBad2(cart: Cart): number {
    
    if (cart.items.length == 0) {
        return 0;
    }

    let total = 0;
    
    for (let i = 0; i < cart.items.length; i++) {
        const item = cart.items[i];

        total += calculateItemPrice(item);
        
    }
    
    return total;
} 

function calculateCartTotal3(cart: Cart): number {
    return cart.items.reduce(
        (total, item) => calculateItemPrice(item) + total, 0 
    );
} 