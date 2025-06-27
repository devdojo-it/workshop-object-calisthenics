public record Item(double price, int quantity, Double discount) {}
public record Cart(java.util.List<Item> items) {}

public class CartCalculator {
    public static double calculateCartTotalBad(Cart cart) {
        double total = 0;
        if (!cart.items().isEmpty()) {
            for (int i = 0; i < cart.items().size(); i++) {
                Item item = cart.items().get(i);
                if (item.price() > 0) {
                    if (item.quantity() > 0) {
                        total += item.price() * item.quantity();
                        if (item.discount() != null) {
                            total -= item.discount();
                        }
                    }
                }
            }
        }
        return total;
    }
} 