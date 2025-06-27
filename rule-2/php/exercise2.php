<?php
class Cart {
    public function __construct(
        public float $totalAmount
    ) {}
    public function hasHeavyItems(): bool { return false; } // stub
}

class User {
    public function __construct(
        public bool $isPremium
    ) {}
    public function hasActiveCoupon(): bool { return false; } // stub
}

function calculateShipping(Cart $cart, User $user): float {
    if ($cart->totalAmount > 100) {
        return 0;
    } else {
        if ($user->isPremium) {
            return 4.99;
        } else {
            if ($cart->hasHeavyItems()) {
                return 15.99;
            } else {
                if ($user->hasActiveCoupon()) {
                    return 2.99;
                } else {
                    return 8.99;
                }
            }
        }
    }
} 