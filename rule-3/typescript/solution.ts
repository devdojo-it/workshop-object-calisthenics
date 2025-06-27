class Name {
    constructor(public readonly value:string) {
        if (value.length < 2) {
            throw new Error('Invalid name')
        } 
    }

    equals(name:Name):boolean {
        return name.value === this.value;
    }

    public static fromName(value:string) {
        return new Name(value)
    }
}



interface User2 {
    name: Name;
    email: string;
    age: number;
    roles: string[];
    hasActiveSubscription: boolean;
    canAccessFeature(feature: string): boolean;
    isAdult(): boolean;
}

function createUser(name: string, email: string, age: number, roles: string[], activeSubscription: boolean): User2 {
    return { 
        name: new Name(name),
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