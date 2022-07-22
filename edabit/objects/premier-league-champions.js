/*
Premier League Champions
https://edabit.com/challenge/xuFor4LkEXfBmtDqH

Problem
Create a function that takes an array of football clubs with properties: name, wins, loss, draws, scored, conceded, and returns the team name with the highest number of points. If two teams have the same number of points, return the team with the largest goal difference.


How to Calculate Points and Goal Difference

team = { name: "Manchester United", wins: 30, loss: 3, draws: 5, scored: 88, conceded: 20 }

Total Points = 3 * wins + 0 * loss + 1 * draws = 3 * 30 + 0 * 3 + 5 * 1 = 95 points
Goal Difference = scored - conceded = 88 - 20 = 68

Inputs: Array of teams objects
Outputs: 1 string, the name of team with highest number of points
- If 2 teams tied, return team with largest goal difference

Rules, Requirements, Definitions


Examples, Test Cases
// 1 clear winner
console.log(champions([
  {
    name: "Manchester United",
    wins: 30,
    loss: 3,
    draws: 5,
    scored: 88,
    conceded: 20,
  },
  {
    name: "Arsenal",
    wins: 24,
    loss: 6,
    draws: 8,
    scored: 98,
    conceded: 29,
  },
  {
    name: "Chelsea",
    wins: 22,
    loss: 8,
    draws: 8,
    scored: 98,
    conceded: 29,
  },
]));
// ManU: score = 95, difference = 68
// Arsenal: score = 80, difference = 69
// Chelsea: score = 74, difference = 69
// "Manchester United"

// 2 teams, same num of pts
console.log(champions([
  {
    name: "Manchester United",
    wins: 30,
    loss: 3,
    draws: 5,
    scored: 88,
    conceded: 20,
  },
  {
    name: "Liverpool",
    wins: 30,
    loss: 3,
    draws: 5,
    scored: 100,
    conceded: 20,
  }
]));
// ManU: score = 95, difference = 68
// Liverpool: score = 95, difference = 80
// "Liverpool"

// 1 team
console.log(champions([
  {
    name: "Manchester United",
    wins: 30,
    loss: 3,
    draws: 5,
    scored: 88,
    conceded: 20,
  }
]));
// "Manchester United"

Edge Cases
- Missing argument? No.
- Missing properties? No.
- Computations result in negative numbers, e.g. scored < conceded? No.

Data Structure
Input: Array of objects
Intermediate: No new objects
Output: String

Algorithm
Iterate over teams, calc points & diff, maintain highest encoutered team name/points/diff. Overwrite if points greater, or points equal and diff greater.

Helper function: Calculate points

Helper function: Calculate goal difference

Main steps
- Initialize variables to track:
  - Highest points value encountered. Initialize to -Infinity.
  - Highest difference value encountered. Initialize  to -Infinity.
  - Name of team associated with these two values.
- Iterate over array of objects.
  - Use helper function to calculate points.
  - Use helper function to calculate difference.
  - Compare current points with maxPoints.
    - If higher, replace points, diff, name.
    - If equal
      - Compare diff. If greater, replace points, diff, name.
- Return name.
*/

function calcPoints(wins, draws) {
  return wins * 3 + draws;
}

function calcDiff(scored, conceded) {
  return scored - conceded;
}

function champions(teams) {
  let maxPoints = -Infinity;
  let championDiff = -Infinity;
  let championName;

  teams.forEach((team) => {
    let points = calcPoints(team.wins, team.draws);
    let diff = calcDiff(team.scored, team.conceded);
    if (points > maxPoints || (points === maxPoints && diff > championDiff)) {
      maxPoints = points;
      championDiff = diff;
      championName = team.name;
    }
  });
  return championName;
}

// 1 clear winner
console.log(
  champions([
    {
      name: 'Manchester United',
      wins: 30,
      loss: 3,
      draws: 5,
      scored: 88,
      conceded: 20,
    },
    {
      name: 'Arsenal',
      wins: 24,
      loss: 6,
      draws: 8,
      scored: 98,
      conceded: 29,
    },
    {
      name: 'Chelsea',
      wins: 22,
      loss: 8,
      draws: 8,
      scored: 98,
      conceded: 29,
    },
  ])
);
// ManU: score = 95, difference = 68
// Arsenal: score = 80, difference = 69
// Chelsea: score = 74, difference = 69
// "Manchester United"

// 2 teams, same num of pts
console.log(
  champions([
    {
      name: 'Manchester United',
      wins: 30,
      loss: 3,
      draws: 5,
      scored: 88,
      conceded: 20,
    },
    {
      name: 'Liverpool',
      wins: 30,
      loss: 3,
      draws: 5,
      scored: 100,
      conceded: 20,
    },
  ])
);
// ManU: score = 95, difference = 68
// Liverpool: score = 95, difference = 80
// "Liverpool"

// 1 team
console.log(
  champions([
    {
      name: 'Manchester United',
      wins: 30,
      loss: 3,
      draws: 5,
      scored: 88,
      conceded: 20,
    },
  ])
);
// "Manchester United"

// 3 teams tied
console.log(
  champions([
    {
      name: 'Manchester United',
      wins: 30,
      loss: 3,
      draws: 5,
      scored: 88,
      conceded: 20,
    },
    {
      name: 'Arsenal',
      wins: 30,
      loss: 3,
      draws: 5,
      scored: 88,
      conceded: 20,
    },
    {
      name: 'Chelsea',
      wins: 30,
      loss: 3,
      draws: 5,
      scored: 88,
      conceded: 20,
    },
  ])
);
// "Manchester United"
