import java.util.List;

public class User {
    private String name;
    private String email;
    private int age;
    private List<String> roles;
    private boolean hasActiveSubscription;

    public User(String name, String email, int age, List<String> roles, boolean activeSubscription) {
        this.name = name;
        this.email = email;
        this.age = age;
        this.roles = roles;
        this.hasActiveSubscription = activeSubscription;
    }

    public boolean canAccessFeature(String feature) {
        if (hasActiveSubscription && roles.contains("premium")) {
            return true;
        }
        if (feature.equals("basic") && roles.contains("basic")) {
            return true;
        }
        return false;
    }

    public boolean isAdult() {
        return age >= 18;
    }
} 