package main

import (
	"fmt"
)

type PersonalInfo struct {
	FullName string
}
type Language struct {
	Label string
}
type Preferences struct {
	Language Language
}
type Settings struct {
	Preferences Preferences
}
type PrimaryEmail struct {
	Address string
}
type ContactInfo struct {
	PrimaryEmail PrimaryEmail
}
type Profile struct {
	PersonalInfo PersonalInfo
	Settings     Settings
	ContactInfo  ContactInfo
}
type Plan struct {
	Name string
}
type Subscription struct {
	Plan Plan
}
type SupportDepartment struct {
	ContactInfo ContactInfo
}
type Company struct {
	SupportDepartment SupportDepartment
}
type User struct {
	Profile      Profile
	Subscription Subscription
	Company      Company
}

type Composer struct{}

func (c *Composer) To(email string) *Composer         { return c }
func (c *Composer) WithSubject(subject string) *Composer { return c }
func (c *Composer) WithContent(content string) *Composer { return c }
func (c *Composer) Send() string                        { return "sent" }

type Mailer struct{}

func (m *Mailer) Compose() *Composer { return &Composer{} }

func SendWelcomeEmail(user User, mailer *Mailer) string {
	emailContent := """
      <h1>Benvenuto %s</h1>
      <p>La tua iscrizione a %s è confermata.</p>
      <p>Il tuo profilo è configurato nella lingua %s.</p>
      <p>Per assistenza contatta %s</p>
    """
	emailContent = fmt.Sprintf(emailContent,
		user.Profile.PersonalInfo.FullName,
		user.Subscription.Plan.Name,
		user.Profile.Settings.Preferences.Language.Label,
		user.Company.SupportDepartment.ContactInfo.PrimaryEmail.Address,
	)
	return mailer.Compose().
		To(user.Profile.ContactInfo.PrimaryEmail.Address).
		WithSubject("Benvenuto!").
		WithContent(emailContent).
		Send()
} 