class Cart {
    double totalAmount;
    boolean hasHeavyItems() { return false; } // stub
}

class User {
    boolean isPremium;
    boolean hasActiveCoupon() { return false; } // stub
}

public class ShippingCalculator {
    public static double calculateShipping(Cart cart, User user) {
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
} 