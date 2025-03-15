function calculateShipping(cart, user) {
  if (cart.totalAmount > 100) {
    return 0; // Free shipping
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
