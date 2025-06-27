<?php
class Comment {
    public function __construct(
        public string $status,
        public string $createdAt, // ISO date string
        public ?int $rating = null
    ) {}
}

function processComments(array $comments): array {
    $approvedComments = array_filter($comments, fn($c) => $c->status === 'approved');
    usort($approvedComments, fn($a, $b) => strtotime($b->createdAt) <=> strtotime($a->createdAt));
    $totalRating = 0;
    foreach ($approvedComments as $comment) {
        $totalRating += $comment->rating ?? 0;
    }
    $averageRating = count($approvedComments) > 0 ? $totalRating / count($approvedComments) : 0;
    $featuredComments = array_filter($approvedComments, fn($c) => ($c->rating ?? 0) >= 4);
    return [
        'approvedComments' => $approvedComments,
        'averageRating' => $averageRating,
        'featuredComments' => $featuredComments,
        'totalComments' => count($comments),
        'approvedCount' => count($approvedComments)
    ];
} 