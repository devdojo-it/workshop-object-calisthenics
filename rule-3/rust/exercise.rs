pub struct User {
    pub name: String,
    pub email: String,
    pub age: i32,
    pub roles: Vec<String>,
    pub has_active_subscription: bool,
}

impl User {
    pub fn can_access_feature(&self, feature: &str) -> bool {
        if self.has_active_subscription && self.roles.contains(&"premium".to_string()) {
            return true;
        }
        if feature == "basic" && self.roles.contains(&"basic".to_string()) {
            return true;
        }
        false
    }

    pub fn is_adult(&self) -> bool {
        self.age >= 18
    }
} 