class PersonalInfo {
    String fullName;
}
class Preferences {
    Language language;
}
class Language {
    String label;
}
class Settings {
    Preferences preferences;
}
class ContactInfo {
    PrimaryEmail primaryEmail;
}
class PrimaryEmail {
    String address;
}
class Profile {
    PersonalInfo personalInfo;
    Settings settings;
    ContactInfo contactInfo;
}
class Plan {
    String name;
}
class Subscription {
    Plan plan;
}
class SupportDepartment {
    ContactInfo contactInfo;
}
class Company {
    SupportDepartment supportDepartment;
}
class User {
    Profile profile;
    Subscription subscription;
    Company company;
}

class Mailer {
    Composer compose() { return new Composer(); }
    static class Composer {
        Composer to(String email) { return this; }
        Composer withSubject(String subject) { return this; }
        Composer withContent(String content) { return this; }
        String send() { return "sent"; }
    }
}

public class EmailService {
    public static String sendWelcomeEmail(User user, Mailer mailer) {
        String emailContent = String.format("""
          <h1>Benvenuto %s</h1>
          <p>La tua iscrizione a %s è confermata.</p>
          <p>Il tuo profilo è configurato nella lingua %s.</p>
          <p>Per assistenza contatta %s</p>
        """,
            user.profile.personalInfo.fullName,
            user.subscription.plan.name,
            user.profile.settings.preferences.language.label,
            user.company.supportDepartment.contactInfo.primaryEmail.address
        );
        return mailer.compose()
            .to(user.profile.contactInfo.primaryEmail.address)
            .withSubject("Benvenuto!")
            .withContent(emailContent)
            .send();
    }
} 