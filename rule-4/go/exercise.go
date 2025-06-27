package main

import (
	"sort"
	"time"
)

type Comment struct {
	Status    string
	CreatedAt string // ISO date string
	Rating    *int
}

type ProcessedComments struct {
	ApprovedComments []Comment
	AverageRating    float64
	FeaturedComments []Comment
	TotalComments    int
	ApprovedCount    int
}

func processComments(comments []Comment) ProcessedComments {
	approvedComments := make([]Comment, 0)
	for _, c := range comments {
		if c.Status == "approved" {
			approvedComments = append(approvedComments, c)
		}
	}

	sort.Slice(approvedComments, func(i, j int) bool {
		t1, _ := time.Parse(time.RFC3339, approvedComments[i].CreatedAt)
		t2, _ := time.Parse(time.RFC3339, approvedComments[j].CreatedAt)
		return t1.After(t2)
	})
	totalRating := 0
	for _, c := range approvedComments {
		if c.Rating != nil {
			totalRating += *c.Rating
		}
	}
	averageRating := 0.0
	if len(approvedComments) > 0 {
		averageRating = float64(totalRating) / float64(len(approvedComments))
	}
	featuredComments := make([]Comment, 0)
	for _, c := range approvedComments {
		if c.Rating != nil && *c.Rating >= 4 {
			featuredComments = append(featuredComments, c)
		}
	}
	return ProcessedComments{
		ApprovedComments: approvedComments,
		AverageRating:    averageRating,
		FeaturedComments: featuredComments,
		TotalComments:    len(comments),
		ApprovedCount:    len(approvedComments),
	}
} 