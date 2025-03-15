function calculateItemPrice(item) {
  if (!item.price && !item.quantity) return 0;

  return item.price * item.quantity - (item.discount ?? 0);
}

function calculateCartTotal(cart) {
  let total = 0;

  for (const item of cart.items) {
    total += calculateItemPrice(item);
  }
  
  // ! Alternativa con Reduce
  // total = cart.items.reduce((totalAcc, item) => {
  //   return totalAcc + calculateItemPrice(item)
  // }, 0);

  return total;
}
