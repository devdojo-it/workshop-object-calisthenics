class Comment {
  String status;
  String createdAt; // ISO date string
  int? rating;

  Comment({required this.status, required this.createdAt, this.rating});
}

Map<String, dynamic> processComments(List<Comment> comments) {
  final approvedComments = comments.where((c) => c.status == 'approved').toList();
  approvedComments.sort((a, b) => DateTime.parse(b.createdAt).compareTo(DateTime.parse(a.createdAt)));
  final totalRating = approvedComments.fold(0, (sum, c) => sum + (c.rating ?? 0));
  final averageRating = approvedComments.isNotEmpty ? totalRating / approvedComments.length : 0.0;
  final featuredComments = approvedComments.where((c) => (c.rating ?? 0) >= 4).toList();
  return {
    'approvedComments': approvedComments,
    'averageRating': averageRating,
    'featuredComments': featuredComments,
    'totalComments': comments.length,
    'approvedCount': approvedComments.length
  };
} 