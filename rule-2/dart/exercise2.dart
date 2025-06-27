class Cart {
  double totalAmount;
  Cart({required this.totalAmount});
  bool hasHeavyItems() => false; // stub
}

class User {
  bool isPremium;
  User({required this.isPremium});
  bool hasActiveCoupon() => false; // stub
}

double calculateShipping(Cart cart, User user) {
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