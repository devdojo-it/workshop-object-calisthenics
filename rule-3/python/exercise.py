from dataclasses import dataclass
from typing import List

@dataclass
class User:
    name: str
    email: str
    age: int
    roles: List[str]
    has_active_subscription: bool

    def can_access_feature(self, feature: str) -> bool:
        if self.has_active_subscription and 'premium' in self.roles:
            return True
        if feature == 'basic' and 'basic' in self.roles:
            return True
        return False

    def is_adult(self) -> bool:
        return self.age >= 18 