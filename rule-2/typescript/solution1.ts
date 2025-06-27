const scoresAndGrades = [
    {score: 90, grade: 'A'},
    {score: 80, grade: 'B'},
    {score: 70, grade: 'C'},
    {score: 60, grade: 'D'},
];

function classifyStudentVote(score: number): string {
    if (score >= 90) {
        return "A";
    } 
    if (score >= 80) {
        return "B";
    } 
    if (score >= 70) {
        return "C";
    }  
    if (score >= 60) {
        return "D";
    }
    
    return "F";
}