interface Comment {
    status: string;
    createdAt: string; // ISO date string
    rating?: number;
}

interface ProcessedComments {
    approvedComments: Comments;
    averageRating: number;
    featuredComments: Comments;
    totalComments: number;
    approvedCount: number;
}

class Comments {
    constructor(protected comments:Comment[]) {
    
    }

    approved(): ApprovedComments {
        return new ApprovedComments(
            this.comments
            .filter(c => c.status === 'approved')
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        )
    }

    count():number {
        return this.comments.length;
    }

    
}

class ApprovedComments extends Comments {
    totalRatings(): number {
        return this.comments.reduce((sum, c) => sum + (c.rating ?? 0), 0);
    }

    averageRatings():  number {
        return this.comments.length > 0 ? this.totalRatings() / this.comments.length : 0;
    }

    featured(): ApprovedComments {
        return new ApprovedComments(this.comments.filter(c => (c.rating ?? 0) >= 4));
    }
}


function processComments(comments: Comments): ProcessedComments {

    const approvedComments = comments.approved();
    const totalRating = approvedComments.totalRatings();
    const averageRating = approvedComments.averageRatings();
    const featuredComments = approvedComments.featured()
    return {
        approvedComments,
        averageRating,
        featuredComments,
        totalComments: comments.count(),
        approvedCount: approvedComments.count()
    };
} 