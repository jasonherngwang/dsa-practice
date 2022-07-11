/*
Snail
https://www.codewars.com/kata/521c2db8ddc89b9b7a0000c1/javascript

Problem
------------------------------------------
Given an n x n array, return the array elements arranged from outermost
elements to the middle element, traveling clockwise, in a snail shell pattern.

Inputs: 1 2-D nested array
Outputs: 1 1-D array with all the elements of the input array

Rules, Requirements, Definitions
- The input array will always contain at least 1 array.


Clarifying Questions
- Can there be an empty grid, i.e. multiple sparse arrays? No.

Edge Cases
-


Examples, Test Cases
------------------------------------------
array = [[1,2,3],
         [8,9,4],
         [7,6,5]]
snail(array) #=> [1,2,3,4,5,6,7,8,9]

Take top row: [1, 2, 3]
Take rightmost column: [4, 5]
- Vertical descending order
Take bottom-most row, from right to left: [6, 7]
Take leftmost column, from bottom to top: [7, 8]
Take top row: [9]


Data Structure
------------------------------------------
All arrays

Algorithm
------------------------------------------
- If empty array, return [].
- Initialize empty result array
- Make copy of input array, called `arrCopy`
- While copy has length > 0
  - Extract top row using shift(). Push to result array.
    - Spread elements of array when pushing.
  - Extract last col by iterating over rows. Pop off last element and push to
    result array.
  - Extract bottom row by popping from `arr`, reversing, and pushing to result
    array.
      - Check for empty array, since while condition only checks at start of
        loop.
  - Extract first col by iterationg from `arr` length - 1 down to 0. Shift and
    push.

*/

'use strict';
function snail(array) {
  if (array.length === 0) return [];

  let arrCopy = array.map((row) => row.slice());
  let result = [];

  while (arrCopy.length > 0) {
    result.push(...arrCopy.shift()); // Spread array elements
    for (let row of arrCopy) {
      result.push(row.pop());
    }
    result.push(...(arrCopy.pop() || []).reverse()); // May be empty
    for (let rowIdx = arrCopy.length - 1; rowIdx >= 0; rowIdx -= 1) {
      result.push(arrCopy[rowIdx].shift());
    }
  }

  return result;
}

console.log(snail([])); // []
console.log(snail([[]])); // []
console.log(snail([[1]])); // [1])
console.log(
  snail([
    [1, 2, 3],
    [4, 5, 6],
  ])
); // [1, 2, 3, 6, 5, 4])
console.log(
  snail([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ])
); // [1, 2, 3, 6, 9, 8, 7, 4, 5]
console.log(
  snail([
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25],
  ])
);
// [
//   1, 2, 3, 4, 5, 10, 15, 20, 25, 24, 23, 22, 21, 16, 11, 6, 7, 8, 9, 14, 19,
//   18, 17, 12, 13,
// ]
console.log(
  snail([
    [1, 2, 3, 4, 5, 6],
    [20, 21, 22, 23, 24, 7],
    [19, 32, 33, 34, 25, 8],
    [18, 31, 36, 35, 26, 9],
    [17, 30, 29, 28, 27, 10],
    [16, 15, 14, 13, 12, 11],
  ])
);

// [
//   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
//   22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
// ]
