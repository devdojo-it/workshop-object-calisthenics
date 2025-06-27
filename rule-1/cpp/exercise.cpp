#include <vector>
#include <optional>

struct Item {
    double price;
    int quantity;
    std::optional<double> discount;
};

struct Cart {
    std::vector<Item> items;
};

double calculateCartTotalBad(const Cart& cart) {
    double total = 0;
    if (!cart.items.empty()) {
        for (size_t i = 0; i < cart.items.size(); ++i) {
            const auto& item = cart.items[i];
            if (item.price > 0) {
                if (item.quantity > 0) {
                    total += item.price * item.quantity;
                    if (item.discount.has_value()) {
                        total -= item.discount.value();
                    }
                }
            }
        }
    }
    return total;
} 