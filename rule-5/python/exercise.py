from dataclasses import dataclass

@dataclass
class PersonalInfo:
    full_name: str
@dataclass
class Language:
    label: str
@dataclass
class Preferences:
    language: Language
@dataclass
class Settings:
    preferences: Preferences
@dataclass
class PrimaryEmail:
    address: str
@dataclass
class ContactInfo:
    primary_email: PrimaryEmail
@dataclass
class Profile:
    personal_info: PersonalInfo
    settings: Settings
    contact_info: ContactInfo
@dataclass
class Plan:
    name: str
@dataclass
class Subscription:
    plan: Plan
@dataclass
class SupportDepartment:
    contact_info: ContactInfo
@dataclass
class Company:
    support_department: SupportDepartment
@dataclass
class User:
    profile: Profile
    subscription: Subscription
    company: Company

class Composer:
    def to(self, email): return self
    def with_subject(self, subject): return self
    def with_content(self, content): return self
    def send(self): return 'sent'

class Mailer:
    def compose(self): return Composer()

def send_welcome_email(user: User, mailer: Mailer) -> str:
    email_content = f'''
      <h1>Benvenuto {user.profile.personal_info.full_name}</h1>
      <p>La tua iscrizione a {user.subscription.plan.name} è confermata.</p>
      <p>Il tuo profilo è configurato nella lingua {user.profile.settings.preferences.language.label}.</p>
      <p>Per assistenza contatta {user.company.support_department.contact_info.primary_email.address}</p>
    '''
    return (mailer.compose()
        .to(user.profile.contact_info.primary_email.address)
        .with_subject("Benvenuto!")
        .with_content(email_content)
        .send()) 