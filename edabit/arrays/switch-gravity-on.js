/*
2:18pm - 2:40pm

Switch on the Gravity
https://edabit.com/challenge/HDpN8a7SunaAY94NX

Problem
------------------------------------------
Given a 2D array of some suspended blocks (represented as hastags), return
another 2D array which shows the end result once gravity is switched on.


Inputs: 2D array of strings, either "-" or "#"
- "-" represents empty space
- "#" represents objects with mass.
  - If gravity is OFF, they stay where they are.
  - Once gravity is turned ON, they move vertically down.
  - They can stack on top of each other.
Outputs: 2D array of strings
- Same dimensions as the input.
- '#' strings may have been "moved around" to reflect the effect of gravity.

Rules, Requirements, Definitions
- Blocks only move vertically downward, regardless of how tall the column is.
- For every column, the number of "-" and "#" stays the same, though their
  positions may change due to gravity.
  - Each column is independent of every other.


Edge Cases
- No blocks: Nothing moves.
- All blocks: Nothing moves.
- Gaps between blocks: All stack at the bottom.


Examples, Test Cases
------------------------------------------
// Tall column
switchGravityOn([
  ["#"],
  ["-"],
  ["-"],
  ["-"],
  ["-"],
])
[
  ["-"],
  ["-"],
  ["-"],
  ["-"],
  ["#"],
]

// No blocks
switchGravityOn([
  ["-"],
  ["-"],
  ["-"],
  ["-"],
  ["-"],
])
[
  ["-"],
  ["-"],
  ["-"],
  ["-"],
  ["-"],
]

// All blocks
switchGravityOn([
  ["#"],
  ["#"],
  ["#"],
  ["#"],
  ["#"],
])
[
  ["#"],
  ["#"],
  ["#"],
  ["#"],
  ["#"],
]

// Spaces between blocks
switchGravityOn([
  ["-"],
  ["#"],
  ["-"],
  ["#"],
  ["-"],
])
[
  ["-"],
  ["-"],
  ["-"],
  ["#"],
  ["#"],
]

switchGravityOn([
  ["-", "#", "#", "-"],
  ["-", "-", "-", "-"],
  ["-", "-", "-", "-"],
  ["-", "-", "-", "-"]
]) ➞ [
  ["-", "-", "-", "-"],
  ["-", "-", "-", "-"],
  ["-", "-", "-", "-"],
  ["-", "#", "#", "-"]
]

switchGravityOn([
  ["-", "#", "#", "-"],
  ["-", "-", "#", "-"],
  ["-", "-", "-", "-"],
]) ➞ [
  ["-", "-", "-", "-"],
  ["-", "-", "#", "-"],
  ["-", "#", "#", "-"]
]

switchGravityOn([
  ["-", "#", "#", "#", "#", "-"],
  ["#", "-", "-", "#", "#", "-"],
  ["-", "#", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-"]
]) ➞ [
  ["-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-"],
  ["-", "#", "-", "#", "#", "-"],
  ["#", "#", "#", "#", "#", "-"]
]

Data Structure
------------------------------------------
Use arrays to track each column.

Algorithm
------------------------------------------
- Transpose the matrix.
- Move the blocks to the right:
  - Custom sort in-place:
    - If "-" return -1.
    - If "#" return 1.
- Transpose and return the matrix.

*/

'use strict';

function transpose(matrix) {
  return [...Array(matrix[0].length).keys()].map((col) =>
    [...Array(matrix.length).keys()].map((row) => matrix[row][col])
  );
}

function switchGravityOn(arr) {
  let arrTranspose = transpose(arr);
  arrTranspose.forEach((row) =>
    row.sort((a, b) => {
      if (a === '#' && b === '-') return 1;
      if (a === '-' && b === '#') return -1;
    })
  );
  return transpose(arrTranspose);
}
console.log(
  switchGravityOn([
    ['-', '#', '#', '#', '#', '-'],
    ['#', '-', '-', '#', '#', '-'],
    ['-', '#', '-', '-', '-', '-'],
    ['-', '-', '-', '-', '-', '-'],
  ])
);
console.log(
  switchGravityOn([
    ['-', '#', '#', '-'],
    ['-', '-', '#', '-'],
    ['-', '-', '-', '-'],
  ])
);
console.log(
  switchGravityOn([
    ['-', '#', '#', '-'],
    ['-', '-', '-', '-'],
    ['-', '-', '-', '-'],
    ['-', '-', '-', '-'],
  ])
);

// Tall column
console.log(switchGravityOn([['#'], ['-'], ['-'], ['-'], ['-']]));

// No blocks
console.log(switchGravityOn([['-'], ['-'], ['-'], ['-'], ['-']]));

// All blocks
console.log(switchGravityOn([['#'], ['#'], ['#'], ['#'], ['#']]));

// Spaces between blocks
console.log(switchGravityOn([['-'], ['#'], ['-'], ['#'], ['-']]));
