use chrono::{DateTime, Utc};

pub struct CustomerSupportTicket {
    pub id: String,
    pub title: String,
    pub description: String,
    pub status: String,
    pub priority: String,
    pub assigned_to: String,
    pub created_by: String,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
    pub category: String,
    pub tags: Vec<String>,
    pub related_tickets: Vec<String>,
    pub attachments: Vec<String>,
}

impl CustomerSupportTicket {
    pub fn escalate(&mut self) {
        self.priority = "high".to_string();
        self.updated_at = Utc::now();
        println!("Ticket {} escalated to high priority", self.id);
    }

    pub fn assign(&mut self, support_agent: &str) {
        self.assigned_to = support_agent.to_string();
        self.updated_at = Utc::now();
        println!("Ticket {} assigned to {}", self.id, support_agent);
    }
} 