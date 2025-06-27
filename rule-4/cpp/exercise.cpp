#include <string>
#include <vector>
#include <optional>
#include <algorithm>
#include <chrono>

struct Comment {
    std::string status;
    std::string createdAt; // ISO date string
    std::optional<int> rating;
};

struct ProcessedComments {
    std::vector<Comment> approvedComments;
    double averageRating;
    std::vector<Comment> featuredComments;
    int totalComments;
    int approvedCount;
};

// Helper to parse ISO date string to time_point (stub: always returns epoch)
auto parseDate(const std::string&) {
    return std::chrono::system_clock::time_point{};
}

ProcessedComments processComments(const std::vector<Comment>& comments) {
    std::vector<Comment> approvedComments;
    for (const auto& c : comments) {
        if (c.status == "approved") {
            approvedComments.push_back(c);
        }
    }
    std::sort(approvedComments.begin(), approvedComments.end(), [](const Comment& a, const Comment& b) {
        return parseDate(b.createdAt) < parseDate(a.createdAt);
    });
    int totalRating = 0;
    for (const auto& c : approvedComments) {
        totalRating += c.rating.value_or(0);
    }
    double averageRating = approvedComments.empty() ? 0 : static_cast<double>(totalRating) / approvedComments.size();
    std::vector<Comment> featuredComments;
    for (const auto& c : approvedComments) {
        if (c.rating.value_or(0) >= 4) {
            featuredComments.push_back(c);
        }
    }
    return ProcessedComments{
        approvedComments,
        averageRating,
        featuredComments,
        static_cast<int>(comments.size()),
        static_cast<int>(approvedComments.size())
    };
} 