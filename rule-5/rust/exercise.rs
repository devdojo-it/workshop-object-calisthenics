pub struct PersonalInfo {
    pub full_name: String,
}
pub struct Language {
    pub label: String,
}
pub struct Preferences {
    pub language: Language,
}
pub struct Settings {
    pub preferences: Preferences,
}
pub struct PrimaryEmail {
    pub address: String,
}
pub struct ContactInfo {
    pub primary_email: PrimaryEmail,
}
pub struct Profile {
    pub personal_info: PersonalInfo,
    pub settings: Settings,
    pub contact_info: ContactInfo,
}
pub struct Plan {
    pub name: String,
}
pub struct Subscription {
    pub plan: Plan,
}
pub struct SupportDepartment {
    pub contact_info: ContactInfo,
}
pub struct Company {
    pub support_department: SupportDepartment,
}
pub struct User {
    pub profile: Profile,
    pub subscription: Subscription,
    pub company: Company,
}

pub struct Composer;
impl Composer {
    pub fn to(&self, _email: &str) -> &Self { self }
    pub fn with_subject(&self, _subject: &str) -> &Self { self }
    pub fn with_content(&self, _content: &str) -> &Self { self }
    pub fn send(&self) -> &'static str { "sent" }
}
pub struct Mailer;
impl Mailer {
    pub fn compose(&self) -> Composer { Composer }
}

pub fn send_welcome_email(user: &User, mailer: &Mailer) -> &'static str {
    let email_content = format!(
        "<h1>Benvenuto {}</h1>\n<p>La tua iscrizione a {} è confermata.</p>\n<p>Il tuo profilo è configurato nella lingua {}.</p>\n<p>Per assistenza contatta {}</p>",
        user.profile.personal_info.full_name,
        user.subscription.plan.name,
        user.profile.settings.preferences.language.label,
        user.company.support_department.contact_info.primary_email.address
    );
    mailer.compose()
        .to(&user.profile.contact_info.primary_email.address)
        .with_subject("Benvenuto!")
        .with_content(&email_content)
        .send()
} 