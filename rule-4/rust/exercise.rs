use chrono::{DateTime, Utc};

#[derive(Clone)]
pub struct Comment {
    pub status: String,
    pub created_at: String, // ISO date string
    pub rating: Option<i32>,
}

pub struct ProcessedComments {
    pub approved_comments: Vec<Comment>,
    pub average_rating: f64,
    pub featured_comments: Vec<Comment>,
    pub total_comments: usize,
    pub approved_count: usize,
}

pub fn process_comments(comments: &[Comment]) -> ProcessedComments {
    let mut approved_comments: Vec<Comment> = comments.iter().cloned().filter(|c| c.status == "approved").collect();
    approved_comments.sort_by(|a, b| {
        let da = DateTime::parse_from_rfc3339(&a.created_at).unwrap_or_else(|_| Utc::now().into());
        let db = DateTime::parse_from_rfc3339(&b.created_at).unwrap_or_else(|_| Utc::now().into());
        db.cmp(&da)
    });
    let total_rating: i32 = approved_comments.iter().map(|c| c.rating.unwrap_or(0)).sum();
    let average_rating = if approved_comments.is_empty() { 0.0 } else { total_rating as f64 / approved_comments.len() as f64 };
    let featured_comments: Vec<Comment> = approved_comments.iter().cloned().filter(|c| c.rating.unwrap_or(0) >= 4).collect();
    ProcessedComments {
        approved_comments,
        average_rating,
        featured_comments,
        total_comments: comments.len(),
        approved_count: approved_comments.len(),
    }
} 