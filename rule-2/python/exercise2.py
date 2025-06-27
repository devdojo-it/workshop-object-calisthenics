from dataclasses import dataclass

@dataclass
class Cart:
    total_amount: float
    def has_heavy_items(self) -> bool:
        return False  # stub

@dataclass
class User:
    is_premium: bool
    def has_active_coupon(self) -> bool:
        return False  # stub

def calculate_shipping(cart: Cart, user: User) -> float:
    if cart.total_amount > 100:
        return 0
    else:
        if user.is_premium:
            return 4.99
        else:
            if cart.has_heavy_items():
                return 15.99
            else:
                if user.has_active_coupon():
                    return 2.99
                else:
                    return 8.99 