interface PersonalInfo {
    fullName: string;
}
interface Language {
    label: string;
}
interface Preferences {
    language: Language;
}
interface Settings {
    preferences: Preferences;
}
interface PrimaryEmail {
    address: string;
}
interface ContactInfo {
    primaryEmail: PrimaryEmail;
}
interface Profile {
    personalInfo: PersonalInfo;
    settings: Settings;
    contactInfo: ContactInfo;
}
interface Plan {
    name: string;
}
interface Subscription {
    plan: Plan;
}
interface SupportDepartment {
    contactInfo: ContactInfo;
}
interface Company {
    supportDepartment: SupportDepartment;
}
interface User {
    profile: Profile;
    subscription: Subscription;
    company: Company;
}

class Composer {
    to(email: string): this { return this; }
    withSubject(subject: string): this { return this; }
    withContent(content: string): this { return this; }
    send(): string { return 'sent'; }
}
class Mailer {
    compose(): Composer { return new Composer(); }
}

function sendWelcomeEmail(user: User, mailer: Mailer): string {
    const emailContent = `
      <h1>Benvenuto ${user.profile.personalInfo.fullName}</h1>
      <p>La tua iscrizione a ${user.subscription.plan.name} è confermata.</p>
      <p>Il tuo profilo è configurato nella lingua ${user.profile.settings.preferences.language.label}.</p>
      <p>Per assistenza contatta ${user.company.supportDepartment.contactInfo.primaryEmail.address}</p>
    `;
    return mailer.compose()
        .to(user.profile.contactInfo.primaryEmail.address)
        .withSubject("Benvenuto!")
        .withContent(emailContent)
        .send();
} 