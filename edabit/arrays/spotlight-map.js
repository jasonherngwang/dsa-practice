/*
Spotlight Map
https://edabit.com/challenge/ZkGDweXrsSaCfXGzq

Problem
------------------------------------------
Given a grid of numbers, return a grid of the Spotlight Sum of each number.
The spotlight sum can be defined as the total of all numbers immediately
surrounding the number on the grid, including the number in the total.

Inputs: Nested 2D array of numbers, representing a grid.
- Rows will all be same length.
- Numbers are not bound by any specific range.
Outputs: A new nested array of the same dimenstions, with each element
replaced by its spotlight sum.

Rules, Requirements, Definitions
"Spotlight sum" is the sum of the immediately surrounding numbers. If the number
is at coordinates 0,0 then the spotlight sum is the sum of numbers at coords:
-1,-1; -1,0; -1,1;
 0,-1;  0,0;  0,1;
 1,-1;  1,0;  1,1;

 If a number is on an edge or in a corner, some of these coordinates will be
 out-of-bounds. Do not include them in the sum.

 "Grid" will always be a 2D array.
 - Empty array [[]]
 - Array with 1 element[[3]]
 - Square [[1,2],[3,4]]
 - Rectangle [[1,2,3],[4,5,6]]

Edge Cases
- No non-number data types.
- No NaN.
- No guaranteed of positive numbers.


Examples, Test Cases
------------------------------------------
Input
1 2
3 4

These are all corner numbers. For each, the spotlight sum is the sum of all 4.

Sums
10 10
10 10


Data Structure
------------------------------------------
Arrays to hold the sums.
In JS, accessing an out-of-bounds element in an array will return undefined.


Algorithm
------------------------------------------
Helper function: Given a coordinate [row, col], return an array of all 9 coords
in the spotlight: [[row1, col1], ..., [row9],[col9]]

Main algorithm
- Shallow copy the input array.
- Iterate over every nested element, transforming the array.
  - Use helper function to create spotlight coordinates.
  - Retrieve numbers at all the coordinates. If coordinate is out of bounds,
    return 0 so it won't impact the sum.
  - Compute the sum.
  - Replace element with the sum.
- Return the transformed array.
*/

'use strict';

function spotlightCoords(r, c) {
  return [
    [
      [r - 1, c - 1],
      [r - 1, c],
      [r - 1, c + 1],
    ],
    [
      [r, c - 1],
      [r, c],
      [r, c + 1],
    ],
    [
      [r + 1, c - 1],
      [r + 1, c],
      [r + 1, c + 1],
    ],
  ];
}

// console.log(spotlightCoords(1, 1));

function spotlightMap(grid) {
  let sumGrid = [];

  for (let r = 0; r < grid.length; r += 1) {
    let sumRow = [];

    for (let c = 0; c < grid[0].length; c += 1) {
      let coords = spotlightCoords(r, c);

      let spotlightValues = coords.map((row) => {
        return row.map(([r, c]) => {
          if (grid[r] === undefined || grid[r][c] === undefined) {
            return 0;
          } else {
            return grid[r][c];
          }
        });
      });

      let spotlightSum = spotlightValues.flat().reduce((sum, num) => sum + num);
      sumRow.push(spotlightSum);
    }

    sumGrid.push(sumRow);
  }

  return sumGrid;
}

// console.log(
//   spotlightMap([
//     [1, 2, 3],
//     [4, 5, 6],
//     [7, 8, 9],
//   ])
// );
// [
//   [12, 21, 16],
//   [27, 45, 33],
//   [24, 39, 28]
// ]

console.log(
  spotlightMap([
    [2, 6, 1, 3, 7],
    [8, 5, 9, 4, 0],
  ])
);
// [
//   [21, 31, 28, 24, 14],
//   [21, 31, 28, 24, 14]
// ]

// console.log(spotlightMap([[3]])); // [[3]]
