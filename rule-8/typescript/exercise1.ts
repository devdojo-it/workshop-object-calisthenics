class CustomerSupportTicket {
    id: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    assignedTo: string;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    category: string;
    tags: string[];
    relatedTickets: string[];
    attachments: any[];

    constructor(id: string, title: string, description: string, status: string, priority: string,
        assignedTo: string, createdBy: string, createdAt: Date, updatedAt: Date,
        category: string, tags: string[], relatedTickets: string[], attachments: any[]) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.priority = priority;
        this.assignedTo = assignedTo;
        this.createdBy = createdBy;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.category = category;
        this.tags = tags;
        this.relatedTickets = relatedTickets;
        this.attachments = attachments;
    }

    escalate(): void {
        this.priority = 'high';
        this.updatedAt = new Date();
        console.log(`Ticket ${this.id} escalated to high priority`);
    }

    assign(supportAgent: string): void {
        this.assignedTo = supportAgent;
        this.updatedAt = new Date();
        console.log(`Ticket ${this.id} assigned to ${supportAgent}`);
    }
} 