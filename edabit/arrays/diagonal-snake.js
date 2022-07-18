/*
7:21pm
Diagonal Snake from a Rectangular Matrix
https://edabit.com/challenge/eGTrKXoDFGsvFCJsT

Problem
------------------------------------------
The function is given a rectangular array of arrays of numbers. Make an array from these numbers in the order of connecting diagonals like a snake before the strike. Starting from the left-up corner:

First diagonal, going up: [0][0]
Second diagonal, going down: [0][1] -> [1][0]
Third diagonal, going up: [2][0] -> [1][1] -> [0][2]
etc, alternate between going up and going down
Last diagonal: [rows - 1][cols -1]

Inputs: Nested array
- Subarrays of any length
Outputs: Array of the elements traversed by the snake.

Rules, Requirements, Definitions
- Snake travels in the following pattern:
  - From left edge of matrix (col 1), travels up and to the right.
  - From top edge of matrix (row 1), travels down and to the left
  - Travels one element at a time.
- Output array contains the elements in order of the snake eating them.

Edge Cases
- Empty input array w/o any subarrays => Return empty array
- 1 subarray with 1 element => That element is the only one in the output
- 1 subarray with multiple elements => Treat this as the top row. The elements are returned in the order of their appearance since the snake moves over by one on each diagonal.

Numbers
- Any zero or negative numbers? Possible. Include them in the output array.
- Non-number data types? Possible. Include them in the output array.
  - Current solution fails with undefined.

Examples, Test Cases
------------------------------------------
// Square matrix
diagonalSnake([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]) ➞ [1, 2, 4, 7, 5, 3, 6, 8, 9]

Order of elements
0,0
0,1
1,0
2,0
1,1
0,2
1,2
2,1
2,2

// 1 row, 1 col
diagonalSnake([[9]]) ➞ [9]

// Row only
diagonalSnake([[9, 8, 7]]) ➞ [9, 8, 7]

// Column only
diagonalSnake([
  [3],
  [2]
]) ➞ [3, 2]

diagonalSnake([
  [1],
  [4],
  [7]
]) ➞ [1, 4, 7]

// More cols than rows
diagonalSnake([
  [1, 2, 3],
  [4, 5, 6]
]) ➞ [1, 2, 4, 5, 3, 6]

// More rows than cols
diagonalSnake([
  [1, 2],
  [4, 5],
  [7, 8]
]) ➞ [1, 2, 4, 7, 5, 8]

// Empty input
diagonalSnake([]) ➞ []
- Edge case; handle with guard clause.

// Other data types
diagonalSnake([
  [1,    -1,    0],
  [true, null,  undefined],
  ['',   'abc', NaN]
]) ➞ [1, -1, true, '', null, 0, undefined, 'abc', NaN]


Data Structure
------------------------------------------
Iterate over nested array.

Algorithm
------------------------------------------
Approach: Brute force.
- Determine whether there are more rows or columns, and save this value as maxDimension.
- Imagine all inputs are square matrices, filled with undefined.
- Iterate in the sequence:
  - Retrieve the starting coordinate.
  - Retrieve elements in down-left diagonal. Every other set of elements is reversed.
  - If element is undefined, don't do anything with it. Otherwise add to result array.

Determining starting coordinates
- Starting at [0,0], we travel across the top and down the right edge.
- We iterate a total of 2*maxDimension - 1 times.
- On iteration N (0-indexed), our starting coordinate is:
  topRowIndex: min(maxDimension - 1, N)
  [topRowIndex, 1 - topRowIndex)
- U

Helper function: Traverse diagonal down-left
- Inputs:
  - Starting coordinates (row, col)
  - Direction ('up-right', 'down-left')
    - If direction is 'up-right' we reverse the array before returning it.
- Initialize empty result array
  - Retrieve element at current coordinates
  - If not undefined, append to result array
  - Increment row, decrement col
  - If we go out-of-bounds, exit iteration
    - Col < 0
    - Row > last row (matrix length)
- If direciton is 'up-right', reverse result array.
- Return result array.


*/

//
function traverseDiagonal(matrix, row, col, direction = 'down-left') {
  let result = [];

  // Stop looping if we go out-of-bounds.
  while (row < matrix.length && col >= 0) {
    let elem = matrix[row][col];
    if (elem !== undefined) result.push(elem); // Ignore non-existing elements.
    row += 1;
    col -= 1;
  }

  return direction === 'up-right' ? result.reverse() : result;
}

// console.log(traverseDiagonal([
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9]
// ], 0, 1)); // [2, 4]
// console.log(traverseDiagonal([
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9]
// ], 0, 1, 'up-right')); // [4, 2]
// console.log(traverseDiagonal([
//   [1],
//   [4],
//   [7]
// ], 0, 0)); // [1]
// console.log(traverseDiagonal([
//   [1],
//   [4],
//   [7]
// ], 0, 2)); // [7]

// Assume a square matrix and repeatedly traverse diagonally.
function diagonalSnake(matrix) {
  if (matrix.length === 0) return [];

  let squareSideLength = Math.max(matrix.length, matrix[0].length);
  let startingCoords = [...Array(squareSideLength).keys()].map((col) => [
    0,
    col,
  ]);
  startingCoords.push(
    ...[...Array(squareSideLength - 1).keys()].map((row) => [
      row + 1,
      squareSideLength - 1,
    ])
  );

  let direction;
  return startingCoords.flatMap(([row, col]) => {
    direction = direction === 'up-right' ? 'down-left' : 'up-right';
    return traverseDiagonal(matrix, row, col, direction);
  });
}

console.log(
  diagonalSnake([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ])
); // [1, 2, 4, 7, 5, 3, 6, 8, 9]

// 1 row, 1 col
console.log(diagonalSnake([[9]])); // [9]

// Row only
console.log(diagonalSnake([[9, 8, 7]])); // [9, 8, 7]

// Column only
console.log(diagonalSnake([[3], [2]])); // [3, 2]

console.log(diagonalSnake([[1], [4], [7]])); // [1, 4, 7]

// More cols than rows
console.log(
  diagonalSnake([
    [1, 2, 3],
    [4, 5, 6],
  ])
); // [1, 2, 4, 5, 3, 6]

// More rows than cols
console.log(
  diagonalSnake([
    [1, 2],
    [4, 5],
    [7, 8],
  ])
); // [1, 2, 4, 7, 5, 8]

// Empty input
// Edge case; handle with guard clause.
console.log(diagonalSnake([])); // []

// Other data types
console.log(
  diagonalSnake([
    [1, -1, 0],
    [true, null, undefined],
    ['', 'abc', NaN],
  ])
); // [1, -1, true, '', null, 0, undefined, 'abc', NaN]
