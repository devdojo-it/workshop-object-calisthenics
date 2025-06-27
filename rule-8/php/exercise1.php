<?php
class CustomerSupportTicket {
    public function __construct(
        public string $id,
        public string $title,
        public string $description,
        public string $status,
        public string $priority,
        public string $assignedTo,
        public string $createdBy,
        public \DateTime $createdAt,
        public \DateTime $updatedAt,
        public string $category,
        public array $tags,
        public array $relatedTickets,
        public array $attachments
    ) {}

    public function escalate(): void {
        $this->priority = 'high';
        $this->updatedAt = new \DateTime();
        echo "Ticket {$this->id} escalated to high priority\n";
    }

    public function assign(string $supportAgent): void {
        $this->assignedTo = $supportAgent;
        $this->updatedAt = new \DateTime();
        echo "Ticket {$this->id} assigned to {$supportAgent}\n";
    }
} 