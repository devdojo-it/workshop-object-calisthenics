package main

type User struct {
	Name                  string
	Email                 string
	Age                   int
	Roles                 []string
	HasActiveSubscription bool
}

func (u User) CanAccessFeature(feature string) bool {
	if u.HasActiveSubscription && contains(u.Roles, "premium") {
		return true
	}
	if feature == "basic" && contains(u.Roles, "basic") {
		return true
	}
	return false
}

func (u User) IsAdult() bool {
	return u.Age >= 18
}

func contains(slice []string, val string) bool {
	for _, item := range slice {
		if item == val {
			return true
		}
	}
	return false
} 