#include <string>
#include <vector>
#include <algorithm>

struct User {
    std::string name;
    std::string email;
    int age;
    std::vector<std::string> roles;
    bool hasActiveSubscription;

    bool canAccessFeature(const std::string& feature) const {
        if (hasActiveSubscription && std::find(roles.begin(), roles.end(), "premium") != roles.end()) {
            return true;
        }
        if (feature == "basic" && std::find(roles.begin(), roles.end(), "basic") != roles.end()) {
            return true;
        }
        return false;
    }

    bool isAdult() const {
        return age >= 18;
    }
}; 