interface Cart {
    totalAmount: number;
    hasHeavyItems(): boolean;
}

interface User {
    isPremium: boolean;
    hasActiveCoupon(): boolean;
}

function calculateShipping(cart: Cart, user: User): number {
    if (cart.totalAmount > 100) {
        return 0;
    } else {
        if (user.isPremium) {
            return 4.99;
        } else {
            if (cart.hasHeavyItems()) {
                return 15.99;
            } else {
                if (user.hasActiveCoupon()) {
                    return 2.99;
                } else {
                    return 8.99;
                }
            }
        }
    }
} 