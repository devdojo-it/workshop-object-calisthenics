from dataclasses import dataclass
from typing import List, Optional

@dataclass
class Item:
    price: float
    quantity: int
    discount: Optional[float] = None

@dataclass
class Cart:
    items: List[Item]

def calculate_cart_total_bad(cart: Cart) -> float:
    total = 0
    if len(cart.items) > 0:
        for i in range(len(cart.items)):
            item = cart.items[i]
            if item.price > 0:
                if item.quantity > 0:
                    total += item.price * item.quantity
                    if item.discount is not None:
                        total -= item.discount
    return total 