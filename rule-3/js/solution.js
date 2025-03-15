class Age {
  constructor(value) {
    // implementazione regole di cap sul value

    this.value = value;
  }
}

class Email {
  constructor(value) {
    // implementazione regole di controllo
    // sulla validità dell'email

    this.value = value;
  }
}

class Role {
  static get BASIC() {
    return "BASIC";
  }

  static get PREMIUM() {
    return "PREMIUM";
  }

  static get allowedRoles() {
    return [Role.BASIC, Role.PREMIUM];
  }

  constructor(value) {
    // implementazione regole di controllo
    // il value deve essere includo in Role.allowedRoles

    this.value = value;
  }
}

class User {
  canAccessFeature(feature) {
    return this.isPremium() || (feature === Role.BASIC && this.isBasic(feature));
  }

  isBasic(feature) {
    return this.roles.includes(Role.BASIC);
  }

  isPremium() {
    return this.hasActiveSubscription && this.roles.includes(Role.PREMIUM);
  }

  isAdult() {
    return this.age >= 18;
  }

  constructor(name, email, age, roles, activeSubscription) {
    Object.assign(this, {
      name: name,
      email: email,
      age: age,
      roles: roles,
      hasActiveSubscription: activeSubscription,
    });
  }
}

