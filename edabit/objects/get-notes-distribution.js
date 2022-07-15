/*
Get Notes Distribution
https://edabit.com/challenge/WyEL2YcemhrS4waEE

Problem
------------------------------------------
Create a function that takes an array of students and returns an object
representing their notes distribution. Keep in mind that all invalid notes
should not be counted in the distribution. Valid notes are: 1, 2, 3, 4, 5

Inputs: 1 array of student objects
- name: student's name (can be ignored)
- note: Array of notes values
Outputs: 1 object of notes counts
- Key: Notes value.
- Value: Total count of notes of this value, across all students.

Rules, Requirements, Definitions
- Ignore invalid notes in the output object.
- Can I assume there will always be a notes property? Yes.
- Can I assume there will always be a name property? Doesn't matter.

Clarifying Questions
- Does output order matter? Shouldn't for an object.

Edge Cases
- Empty notes array? Valid. Nothing will be added to the counts.
- Negative, float, 0, >6 values for notes? Ignore.
- Non-number objects in notes array? Ignore.

Examples, Test Cases
------------------------------------------
getNotesDistribution([
  {
    "name": "Steve",
    "notes": [5, 5, 3, -1, 6]
  },
  {
    "name": "John",
    "notes": [3, 2, 5, 0, -3]
  }
] ➞ {
  5: 3,
  3: 2,
  2: 1
})

Data Structure
------------------------------------------
Use object to store notes counts.
Iterate over input array.

Algorithm
------------------------------------------
- Initialize empty result array.
- Iterate over student objects:
  - Iterate over array associated with `notes` property:
    - If value is one of [1, 2, 3, 4, 5], increment its count in result array.
      - May need to create a property if it doesn't yet exist.
- Return result array.
*/

'use strict';

function getNotesDistribution(students) {
  let result = {};
  students.forEach(({ notes }) => {
    notes.forEach((note) => {
      if ([1, 2, 3, 4, 5].includes(note))
        result[note] = (result[note] || 0) + 1;
    });
  });

  return result;
}

console.log(
  getNotesDistribution([
    {
      name: 'Steve',
      notes: [5, 5, 3, -1, 6],
    },
    {
      name: 'John',
      notes: [3, 2, 5, 0, -3],
    },
  ])
);
