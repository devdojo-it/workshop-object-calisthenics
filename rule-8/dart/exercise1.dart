class CustomerSupportTicket {
  String id;
  String title;
  String description;
  String status;
  String priority;
  String assignedTo;
  String createdBy;
  DateTime createdAt;
  DateTime updatedAt;
  String category;
  List<String> tags;
  List<String> relatedTickets;
  List<dynamic> attachments;

  CustomerSupportTicket({
    required this.id,
    required this.title,
    required this.description,
    required this.status,
    required this.priority,
    required this.assignedTo,
    required this.createdBy,
    required this.createdAt,
    required this.updatedAt,
    required this.category,
    required this.tags,
    required this.relatedTickets,
    required this.attachments,
  });

  void escalate() {
    priority = 'high';
    updatedAt = DateTime.now();
    print('Ticket $id escalated to high priority');
  }

  void assign(String supportAgent) {
    assignedTo = supportAgent;
    updatedAt = DateTime.now();
    print('Ticket $id assigned to $supportAgent');
  }
} 