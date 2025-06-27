#include <string>
#include <vector>
#include <iostream>

class CustomerSupportTicket {
public:
    std::string id;
    std::string title;
    std::string description;
    std::string status;
    std::string priority;
    std::string assignedTo;
    std::string createdBy;
    std::string createdAt;
    std::string updatedAt;
    std::string category;
    std::vector<std::string> tags;
    std::vector<std::string> relatedTickets;
    std::vector<std::string> attachments;

    CustomerSupportTicket(const std::string& id, const std::string& title, const std::string& description, const std::string& status, const std::string& priority,
        const std::string& assignedTo, const std::string& createdBy, const std::string& createdAt, const std::string& updatedAt,
        const std::string& category, const std::vector<std::string>& tags, const std::vector<std::string>& relatedTickets, const std::vector<std::string>& attachments)
        : id(id), title(title), description(description), status(status), priority(priority), assignedTo(assignedTo), createdBy(createdBy),
          createdAt(createdAt), updatedAt(updatedAt), category(category), tags(tags), relatedTickets(relatedTickets), attachments(attachments) {}

    void escalate() {
        priority = "high";
        updatedAt = "now"; // stub for time
        std::cout << "Ticket " << id << " escalated to high priority" << std::endl;
    }

    void assign(const std::string& supportAgent) {
        assignedTo = supportAgent;
        updatedAt = "now"; // stub for time
        std::cout << "Ticket " << id << " assigned to " << supportAgent << std::endl;
    }
}; 