/*
Problem
------------------------------------------
Standard competition ranking (also known as "1224" ranking) assigns the same
rank to matching values. Rank numbers are increased each time, so ranks are
sometimes skipped. If we have 5 scores (the highest score having a rank of 1):

No matching values:

Scores = [99, 98, 97, 96, 95]
Rank = 1,  2,  3,  4,  5

With matching values:

Scores = [99, 98, 98, 96, 95]
Rank = 1,  2,  2,  4,  5
// Second and third scores are equal, so rank "3" is skipped.

Given an object containing the names and scores of 5 competitors, and a
competitor name, return the rank of that competitor after applying competition
ranking.

Inputs:
- 1 object of names and scores
  - Key: name
  - Value: score (number)
- 1 name
Outputs: 1 number, the rank of the input name

Rules, Requirements, Definitions
- If any competitor has the same score as a previous competitor, that person
  shares the same rank.
- Upon every occurence of rank sharing, a rank number is skipped.


Clarifying Questions
- Always at least 1 competitor? Yes.
- Possible for all scores to be different? Yes.
- Possible for all scores to be same? Yes.
- Maximum number of people that can share a single rank? Infinity.
- All names unique? Yes.
- Can scores be out of order? Do we need to sort first? No guarantee of order.

Edge Cases
-


Examples, Test Cases
------------------------------------------


Data Structure
------------------------------------------
Need to keep track of current rank

Algorithm
------------------------------------------
- Initialize new object ranks to hold names and ranks
{
  George: 1,
  Emily: 2,
  ...
}
- Convert object entries to nested array.
- Sort nested array by 2nd element (the score), descending
- Initialize variable currentRank to 1
- Iterate over array, keeping track of index:
  - For the first person:
    - Set currentRank to 1.
  - If person's score is the same as the score of the preceding person in
    the array:
    - This person will share the same rank as the preceding person. Don't change
      the current rank value.
  - If not:
    - Reassign currentRank to index + 1
  - Add a new property:
    - Key: name
    - Value: index + 1
- Look up score for input name.
*/

'use strict';

function competitionRank(results, person) {
  let ranksObj = {};
  let resultsArr = Object.entries(results);
  resultsArr.sort((a, b) => b[1] - a[1]);
  let currentRank = 1;

  resultsArr.forEach((result, index, array) => {
    let name = result[0];
    let score = result[1];

    if (index > 0 && score !== array[index - 1][1]) {
      currentRank = index + 1;
    }

    ranksObj[name] = currentRank;
  });

  return ranksObj[person];
}

// All scores different
console.log(
  competitionRank(
    {
      George: 96,
      Emily: 95,
      Susan: 93,
      Jane: 89,
      Brett: 82,
    },
    'Jane'
  ) === 4
);

// Some scores same
console.log(
  competitionRank(
    {
      Kate: 92,
      Carol: 92,
      Jess: 87,
      Bruce: 87,
      Scott: 84,
    },
    'Bruce'
  ) === 3
);
// Some scores same
console.log(
  competitionRank(
    {
      Kate: 92,
      Carol: 92,
      Jess: 92,
      Bruce: 90,
      Scott: 84,
    },
    'Bruce'
  ) === 4
);

// All scores same
console.log(
  competitionRank(
    {
      Kate: 92,
      Carol: 92,
      Jess: 92,
      Bruce: 92,
      Scott: 92,
    },
    'Bruce'
  ) === 1
);

console.log(
  competitionRank(
    { Aria: 90, Brooke: 90, Olivia: 90, Eve: 74, Ellie: 87 },
    'Ellie'
  ) === 4
);
console.log(
  competitionRank(
    { Ryan: 97, Thomas: 85, Kai: 95, Aiden: 87, Logan: 90 },
    'Logan'
  ) === 3
);
console.log(
  competitionRank(
    { Lilly: 91, Harris: 87, Archie: 93, Lexi: 100, Ava: 88 },
    'Lilly'
  ) === 3
);
console.log(
  competitionRank(
    { Jayden: 90, Josh: 90, Rebecca: 96, Jack: 89, Max: 96 },
    'Rebecca'
  ) === 1
);
console.log(
  competitionRank(
    { Ben: 78, Quinn: 84, Lena: 84, Isla: 92, Kayla: 72 },
    'Ben'
  ) === 4
);
console.log(
  competitionRank(
    { Lucy: 81, Ella: 90, Summer: 91, Harper: 81, Sadie: 85 },
    'Ella'
  ) === 2
);
console.log(
  competitionRank(
    { Cole: 96, Carson: 92, Gabriel: 91, Hollie: 97, Penelope: 85 },
    'Hollie'
  ) === 1
);
console.log(
  competitionRank(
    { Michael: 89, Noah: 98, Reuben: 88, Sam: 91, Mia: 91 },
    'Mia'
  ) === 2
);
console.log(
  competitionRank(
    { James: 93, Maria: 91, Lewis: 95, Joseph: 96, Imogen: 90 },
    'Lewis'
  ) === 2
);
console.log(
  competitionRank(
    { Jessica: 90, Emily: 99, Hope: 91, Charlie: 96, Lucas: 87 },
    'Hope'
  ) === 3
);
console.log(
  competitionRank(
    { Sophie: 86, Piper: 98, Elliot: 100, Erica: 90, Freya: 100 },
    'Freya'
  ) === 1
);
console.log(
  competitionRank(
    { Grace: 93, Henry: 90, Florence: 98, Millie: 89, David: 99 },
    'Henry'
  ) === 4
);
console.log(
  competitionRank(
    { Alfie: 90, Elijah: 90, Cara: 85, Isaac: 96, Bella: 92 },
    'Elijah'
  ) === 3
);
console.log(
  competitionRank(
    { Clara: 85, Matilda: 86, Amelia: 98, Oliver: 95, Adam: 94 },
    'Clara'
  ) === 5
);
console.log(
  competitionRank(
    { Nina: 81, Tommy: 79, Tyler: 84, Leo: 79, Hallie: 79 },
    'Nina'
  ) === 2
);
