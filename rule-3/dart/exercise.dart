class User {
  String name;
  String email;
  int age;
  List<String> roles;
  bool hasActiveSubscription;

  User({
    required this.name,
    required this.email,
    required this.age,
    required this.roles,
    required this.hasActiveSubscription,
  });

  bool canAccessFeature(String feature) {
    if (hasActiveSubscription && roles.contains('premium')) {
      return true;
    }
    if (feature == 'basic' && roles.contains('basic')) {
      return true;
    }
    return false;
  }

  bool isAdult() {
    return age >= 18;
  }
} 