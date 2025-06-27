import java.util.*;
import java.util.stream.Collectors;

class Comment {
    String status;
    Date createdAt;
    Integer rating;
}

class ProcessedComments {
    List<Comment> approvedComments;
    double averageRating;
    List<Comment> featuredComments;
    int totalComments;
    int approvedCount;

    public ProcessedComments(List<Comment> approvedComments, double averageRating, List<Comment> featuredComments, int totalComments, int approvedCount) {
        this.approvedComments = approvedComments;
        this.averageRating = averageRating;
        this.featuredComments = featuredComments;
        this.totalComments = totalComments;
        this.approvedCount = approvedCount;
    }
}

public class CommentProcessor {
    public static ProcessedComments processComments(List<Comment> comments) {
        List<Comment> approvedComments = comments.stream()
                .filter(c -> "approved".equals(c.status))
                .collect(Collectors.toList());

        approvedComments.sort((a, b) -> b.createdAt.compareTo(a.createdAt));

        int totalRating = 0;
        for (Comment comment : approvedComments) {
            totalRating += comment.rating != null ? comment.rating : 0;
        }
        double averageRating = approvedComments.isEmpty() ? 0 : (double) totalRating / approvedComments.size();

        List<Comment> featuredComments = approvedComments.stream()
                .filter(c -> c.rating != null && c.rating >= 4)
                .collect(Collectors.toList());

        return new ProcessedComments(
                approvedComments,
                averageRating,
                featuredComments,
                comments.size(),
                approvedComments.size()
        );
    }
} 