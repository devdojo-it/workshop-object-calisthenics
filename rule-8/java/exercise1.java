import java.util.Date;
import java.util.List;

public class CustomerSupportTicket {
    public String id;
    public String title;
    public String description;
    public String status;
    public String priority;
    public String assignedTo;
    public String createdBy;
    public Date createdAt;
    public Date updatedAt;
    public String category;
    public List<String> tags;
    public List<String> relatedTickets;
    public List<String> attachments;

    public CustomerSupportTicket(String id, String title, String description, String status, String priority,
                                 String assignedTo, String createdBy, Date createdAt, Date updatedAt,
                                 String category, List<String> tags, List<String> relatedTickets, List<String> attachments) {
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

    public void escalate() {
        this.priority = "high";
        this.updatedAt = new Date();
        System.out.println("Ticket " + this.id + " escalated to high priority");
    }

    public void assign(String supportAgent) {
        this.assignedTo = supportAgent;
        this.updatedAt = new Date();
        System.out.println("Ticket " + this.id + " assigned to " + supportAgent);
    }
} 