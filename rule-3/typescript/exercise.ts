interface User {
    name: string;
    email: string;
    age: number;
    roles: string[];
    hasActiveSubscription: boolean;
    canAccessFeature(feature: string): boolean;
    isAdult(): boolean;
}

function createUser(name: string, email: string, age: number, roles: string[], activeSubscription: boolean): User {
    return { 
        name,
        email,
        age,
        roles,
        hasActiveSubscription: activeSubscription,
        canAccessFeature(feature: string) {
            if (this.hasActiveSubscription && this.roles.includes('premium')) {
                return true;
            }
            if (feature === 'basic' && this.roles.includes('basic')) {
                return true;
            }
            return false;
        },
        isAdult() {
            return this.age >= 18;
        }
    };
} 