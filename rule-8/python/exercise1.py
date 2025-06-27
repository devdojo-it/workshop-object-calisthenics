from dataclasses import dataclass, field
from typing import List, Any
from datetime import datetime

@dataclass
class CustomerSupportTicket:
    id: str
    title: str
    description: str
    status: str
    priority: str
    assigned_to: str
    created_by: str
    created_at: datetime
    updated_at: datetime
    category: str
    tags: List[str]
    related_tickets: List[str]
    attachments: List[Any]

    def escalate(self):
        self.priority = 'high'
        self.updated_at = datetime.now()
        print(f"Ticket {self.id} escalated to high priority")

    def assign(self, support_agent: str):
        self.assigned_to = support_agent
        self.updated_at = datetime.now()
        print(f"Ticket {self.id} assigned to {support_agent}") 