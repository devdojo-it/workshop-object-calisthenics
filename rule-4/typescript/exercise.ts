interface Comment {
    status: string;
    createdAt: string; // ISO date string
    rating?: number;
}

interface ProcessedComments {
    approvedComments: Comment[];
    averageRating: number;
    featuredComments: Comment[];
    totalComments: number;
    approvedCount: number;
}

function processComments(comments: Comment[]): ProcessedComments {
    const approvedComments = comments.filter(c => c.status === 'approved');
    approvedComments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    const totalRating = approvedComments.reduce((sum, c) => sum + (c.rating ?? 0), 0);
    const averageRating = approvedComments.length > 0 ? totalRating / approvedComments.length : 0;
    const featuredComments = approvedComments.filter(c => (c.rating ?? 0) >= 4);
    return {
        approvedComments,
        averageRating,
        featuredComments,
        totalComments: comments.length,
        approvedCount: approvedComments.length
    };
} 