from dataclasses import dataclass
from typing import List, Optional, Dict, Any
from datetime import datetime

@dataclass
class Comment:
    status: str
    created_at: str  # ISO date string
    rating: Optional[int] = None

def process_comments(comments: List[Comment]) -> Dict[str, Any]:
    approved_comments = [c for c in comments if c.status == 'approved']
    approved_comments.sort(key=lambda c: datetime.fromisoformat(c.created_at), reverse=True)
    total_rating = sum(c.rating or 0 for c in approved_comments)
    average_rating = total_rating / len(approved_comments) if approved_comments else 0
    featured_comments = [c for c in approved_comments if (c.rating or 0) >= 4]
    return {
        'approvedComments': approved_comments,
        'averageRating': average_rating,
        'featuredComments': featured_comments,
        'totalComments': len(comments),
        'approvedCount': len(approved_comments)
    } 