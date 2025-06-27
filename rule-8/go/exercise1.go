package main

import (
	"fmt"
	"time"
)

type CustomerSupportTicket struct {
	ID             string
	Title          string
	Description    string
	Status         string
	Priority       string
	AssignedTo     string
	CreatedBy      string
	CreatedAt      time.Time
	UpdatedAt      time.Time
	Category       string
	Tags           []string
	RelatedTickets []string
	Attachments    []string
}

func (t *CustomerSupportTicket) Escalate() {
	t.Priority = "high"
	t.UpdatedAt = time.Now()
	fmt.Printf("Ticket %s escalated to high priority\n", t.ID)
}

func (t *CustomerSupportTicket) Assign(supportAgent string) {
	t.AssignedTo = supportAgent
	t.UpdatedAt = time.Now()
	fmt.Printf("Ticket %s assigned to %s\n", t.ID, supportAgent)
} 