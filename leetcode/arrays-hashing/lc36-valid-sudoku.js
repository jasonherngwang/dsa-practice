/*
Valid Sudoku
https://leetcode.com/problems/valid-sudoku/

Problem
------------------------------------------
Determine if a 9x9 Sudoku board is valid. Only filled cells need to be
validated

1. Each row must contain the digits 1-9 without repetition.
2. Each column must contain the digits 1-9 without repetition.
3. Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9
   without repetition.

Note: A Sudoku board (partially filled) could be valid but is not necessarily
solvable. Only the filled cells need to be validated according to the mentioned
rules.

Inputs: A 9x9 nested array
- Elements are digit strings 1-9.
- Empty cells are represented by periods: "."
Outputs: true (valid) or false (invalid)

Rules, Requirements, Definitions
- The rows, cols, sub-boxes are validated independent of each other. It's not
  required to figure out if the current state of the board can be solved.


Clarifying Questions
-

Edge Cases
- A character other than 1-9 is used.


Examples, Test Cases
------------------------------------------


Data Structure
------------------------------------------
Use a Set to check if values in a row/col/block are unique.
- Check for duplicates: Compare an array's length with the size of the Set
  created from it.
- Use regex to check for illegal characters: /[^1-9.]/

Algorithm
------------------------------------------
Approach 1: Check every row, col, 3x3 block
Helper function: isValidSet(array)
- Check if row/col/block is valid

Main function
- Check that each row is valid, using helper function.
- Check that each col is valid, using helper function.
  - Extract cols by mapping cols 0-9 to the indices in each row
- Check that 3x3 block are valid.
  - Iterate over every value in the board
  - Divide (integer division) by 3 to determine its block
- Return false from any check, if it fails.
- Return true

Approach 2: Hash Set
Iterate over every element and check if it has any duplicates in its row, col,
or square.

Time: O(N^2). Need to traverse each of the 81 positions, and perform multiple
checks and operations at each.

Steps
- Create hash sets (objects with Sets as values) for rows, cols, squares.
  - Keys: row num, cols num, or square coord (0,0 up to 2,2)
  - Values: Set containing row, col, or square's elements.
- Iterate over row indices
  - Iterate over col indices
    - Examine the element at row, col:
      - If blank ".", skip to next iteration
      - If set does exist yet for row/col/block, instantiate a Set there.
      - If element in row set, or
        if element in col set, or
        if element is square set, return false.
    - Else add element to row, col, and square sets.
- Return true
*/

'use strict';

function isValidSet(array) {
  let numbers = array.filter((char) => char !== '.');
  let set = new Set(numbers);
  // Duplicate values
  if (numbers.length !== set.size) return false;
  // Characters that are not 1-9
  if (/[^1-9]/.test(numbers.join(''))) return false;
  return true;
}

// console.log(isValidSet(['1', '2', '3', '.', '.'])); // true
// console.log(isValidSet(['1', '2', '3', '3'])); // false

function isValidSudoku(board) {
  for (let rowSet of board) {
    if (!isValidSet(rowSet)) return false;
  }
  for (let colIdx in board[0]) {
    let colSet = [...Array(board.length).keys()].map(
      (row) => board[row][colIdx]
    );
    if (!isValidSet(colSet)) return false;
  }
  // Split board up into 3x3 blocks
  let blocks = Array.from({ length: 3 }, (e) =>
    Array.from({ length: 3 }, (e) => [])
  );
  for (let row = 0; row < board.length; row += 1) {
    for (let col = 0; col < board[0].length; col += 1) {
      blocks[Math.floor(row / 3)][Math.floor(col / 3)].push(board[row][col]);
    }
  }
  for (let block of blocks.flat()) {
    if (!isValidSet(block)) return false;
  }

  return true;
}

// console.log(
//   isValidSudoku([
//     ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
//     ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
//     ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
//     ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
//     ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
//     ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
//     ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
//     ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
//     ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
//   ])
// ); // true

// console.log(
//   isValidSudoku([
//     ['8', '3', '.', '.', '7', '.', '.', '.', '.'],
//     ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
//     ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
//     ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
//     ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
//     ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
//     ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
//     ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
//     ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
//   ])
// ); // false (fail col and block)

// console.log(
//   isValidSudoku([
//     ['5', '3', '9', '.', '7', '.', '.', '.', '.'],
//     ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
//     ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
//     ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
//     ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
//     ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
//     ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
//     ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
//     ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
//   ])
// ); // false (fail block)

function isValidSudoku2(board) {
  let cols = {};
  let rows = {};
  let squares = {};

  for (let row = 0; row < 9; row += 1) {
    for (let col = 0; col < 9; col += 1) {
      const num = board[row][col];

      if (num === '.') continue;

      const squareCoords = `${Math.floor(row / 3)},${Math.floor(col / 3)}`;

      if (!rows[row]) rows[row] = new Set();
      if (!cols[col]) cols[col] = new Set();
      if (!squares[squareCoords]) squares[squareCoords] = new Set();

      // Check for duplicates
      if (
        rows[row].has(num) ||
        cols[col].has(num) ||
        squares[squareCoords].has(num)
      ) {
        return false;
      }

      cols[col].add(num);
      rows[row].add(num);
      squares[squareCoords].add(num);
    }
  }

  return true;
}

console.log(
  isValidSudoku2([
    ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
    ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
    ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
    ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
    ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
    ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
    ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
    ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
    ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
  ])
); // true

console.log(
  isValidSudoku2([
    ['8', '3', '.', '.', '7', '.', '.', '.', '.'],
    ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
    ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
    ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
    ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
    ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
    ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
    ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
    ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
  ])
); // false (fail col and block)

console.log(
  isValidSudoku2([
    ['5', '3', '9', '.', '7', '.', '.', '.', '.'],
    ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
    ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
    ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
    ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
    ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
    ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
    ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
    ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
  ])
); // false (fail block)
