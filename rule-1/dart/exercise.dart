class Item {
  double price;
  int quantity;
  double? discount;

  Item({required this.price, required this.quantity, this.discount});
}

class Cart {
  List<Item> items;

  Cart({required this.items});
}

double calculateCartTotalBad(Cart cart) {
  double total = 0;
  if (cart.items.isNotEmpty) {
    for (int i = 0; i < cart.items.length; i++) {
      final item = cart.items[i];
      if (item.price > 0) {
        if (item.quantity > 0) {
          total += item.price * item.quantity;
          if (item.discount != null) {
            total -= item.discount!;
          }
        }
      }
    }
  }
  return total;
} 