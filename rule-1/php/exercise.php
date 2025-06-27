<?php

class Item {
    public function __construct(
        public float $price,
        public int $quantity,
        public ?float $discount = null
    ) {}
}

class Cart {
    public function __construct(
        public array $items // array of Item
    ) {}
}

function calculateCartTotalBad(Cart $cart): float {
    $total = 0;
    if (count($cart->items) > 0) {
        for ($i = 0; $i < count($cart->items); $i++) {
            $item = $cart->items[$i];
            if ($item->price > 0) {
                if ($item->quantity > 0) {
                    $total += $item->price * $item->quantity;
                    if ($item->discount !== null) {
                        $total -= $item->discount;
                    }
                }
            }
        }
    }
    return $total;
} 