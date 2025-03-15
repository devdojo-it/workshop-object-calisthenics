const studentVoteMap = [
  [90, "A"],
  [80, "B"],
  [70, "C"],
  [60, "D"],
];

const studentVoteFallback = "F";

function classifyStudentVote(score) {
  if (score < 60) return studentVoteFallback;

  for (const [limit, value] of studentVoteMap) {
    if (score >= limit) return value;
  }
}

// ------------------

const studentVoteMap = {
  90: "A",
  80: "B",
  70: "C",
  60: "D",
};

const studentVoteFallback = "F";

function classifyStudentVote(score) {
  const scoreCap = Math.floor(score / 10);

  return studentVoteMap[scoreCap] ?? studentVoteFallback;
}
