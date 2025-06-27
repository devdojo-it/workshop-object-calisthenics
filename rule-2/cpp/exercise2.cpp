#include <string>

struct Cart {
    double totalAmount;
    bool hasHeavyItems() const { return false; } // stub
};

struct User {
    bool isPremium;
    bool hasActiveCoupon() const { return false; } // stub
};

double calculateShipping(const Cart& cart, const User& user) {
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