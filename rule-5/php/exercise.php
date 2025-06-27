<?php
class PersonalInfo {
    public function __construct(public string $fullName) {}
}
class Preferences {
    public function __construct(public Language $language) {}
}
class Language {
    public function __construct(public string $label) {}
}
class Settings {
    public function __construct(public Preferences $preferences) {}
}
class PrimaryEmail {
    public function __construct(public string $address) {}
}
class ContactInfo {
    public function __construct(public PrimaryEmail $primaryEmail) {}
}
class Profile {
    public function __construct(
        public PersonalInfo $personalInfo,
        public Settings $settings,
        public ContactInfo $contactInfo
    ) {}
}
class Plan {
    public function __construct(public string $name) {}
}
class Subscription {
    public function __construct(public Plan $plan) {}
}
class SupportDepartment {
    public function __construct(public ContactInfo $contactInfo) {}
}
class Company {
    public function __construct(public SupportDepartment $supportDepartment) {}
}
class User {
    public function __construct(
        public Profile $profile,
        public Subscription $subscription,
        public Company $company
    ) {}
}
class Mailer {
    public function compose(): Composer { return new Composer(); }
}
class Composer {
    public function to(string $email): static { return $this; }
    public function withSubject(string $subject): static { return $this; }
    public function withContent(string $content): static { return $this; }
    public function send(): string { return 'sent'; }
}

function sendWelcomeEmail(User $user, Mailer $mailer): string {
    $emailContent = <<<HTML
      <h1>Benvenuto {$user->profile->personalInfo->fullName}</h1>
      <p>La tua iscrizione a {$user->subscription->plan->name} è confermata.</p>
      <p>Il tuo profilo è configurato nella lingua {$user->profile->settings->preferences->language->label}.</p>
      <p>Per assistenza contatta {$user->company->supportDepartment->contactInfo->primaryEmail->address}</p>
    HTML;
    return $mailer->compose()
        ->to($user->profile->contactInfo->primaryEmail->address)
        ->withSubject("Benvenuto!")
        ->withContent($emailContent)
        ->send();
} 