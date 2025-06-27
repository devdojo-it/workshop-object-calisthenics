interface Cart {
    hasFreeShipping(): boolean
    hasHeavyItems(): boolean;
}

interface User {
    isPremium: boolean;
    hasActiveCoupon(): boolean;
}

interface ShippingPrice {
    isEgible(cart: Cart, user:User):boolean;
}

function calculateShipping(cart: Cart, user: User): number {
    if (cart.hasFreeShipping()) {
        return 0;
    }

    if (user.isPremium) {
        return 4.99;
    } 

    if (cart.hasHeavyItems()) {
        return 15.99;
    } 

    if (user.hasActiveCoupon()) {
        return 2.99;
    } 
    
    return 8.99;    
} 