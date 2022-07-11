/*
Sudoku Solution Validator
https://www.codewars.com/kata/529bf0e9bdf7657179000008

Problem
------------------------------------------
Sudoku is a game played on a 9x9 grid. The goal of the game is to fill all cells
of the grid with digits from 1 to 9, so that each column, each row, and each of
the nine 3x3 sub-grids (also known as blocks) contain all of the digits from
1 to 9.

Write a function to validate a sudoku board.
0's are empty cells. Boards with any number of 0's are invalid.

Inputs: 1 2D nested array of length 9, representing a Sudoku board
- Each subarray contains 9 integers (0-9)
Outputs: true or false

Rules, Requirements, Definitions
- Each row, column, and 3x3 block must contain all the digits 1-9.
- Will always be 9 rows of 9 numbers (0-9)

Clarifying Questions
-

Edge Cases
-


Examples, Test Cases
------------------------------------------


Data Structure
------------------------------------------
Arrays

Algorithm
------------------------------------------
Helper function: Check if a set contains all digits 1-9
- Add all numbers to a JS Set.
- If set has 0, return false
- If set length is 9, return true

Separating the board into sets.
- Check every row using the helper function
  - Access row using row indices 0-8
- Check every column. To access a column:
  - Iterate from col 0-8
    - Iterate from row 0-8
    - Gather column elements into a set, and check using the helper function
- To check each 3x3 block
  - Create an object
    - Keys: '0,0', '0,1', ... , '2,2'
    - Value: arrays
  - Iterate from row 0-8
    - Iterate from col 0-8
      - Use integer division on the index coordinates, e.g. 5,5 => 1,1
      - Transform the new coords into a string (key).
      - Push the number at the current coordinate onto the array associated with
        the coordinate key, in the object.
  - Iterate over all arrays in the object, checking valid set.

*/

'use strict';

function validSet(array) {
  let set = new Set(array);
  return !set.has(0) && set.size === 9;
}

// console.log(validSet([1, 2, 3, 4, 5, 6, 7, 8, 9])); // true
// console.log(validSet([9, 2, 3, 4, 5, 6, 7, 8, 1])); // true
// console.log(validSet([1, 2, 3, 4, 5, 6, 7, 8, 8])); // false (duplicated 8)
// console.log(validSet([1, 2, 3, 4, 5, 6, 7, 8, 0])); // false (has 0)

function validSolution(board) {
  // Check rows
  for (let rowSet of board) {
    if (!validSet(rowSet)) return false;
  }
  // Check cols
  for (let col = 0; col < board[0].length; col += 1) {
    let colSet = [...Array(board.length)].map((_, row) => board[row][col]);
    if (!validSet(colSet)) return false;
  }
  // Check 3x3 blocks
  let blocks = {};
  for (let row = 0; row < board.length; row += 1) {
    for (let col = 0; col < board[0].length; col += 1) {
      let key = `${Math.floor(row / 3)},${Math.floor(col / 3)}`;
      blocks[key] = (blocks[key] || []).concat(board[row][col]);
    }
  }
  for (let blockSet of Object.values(blocks)) {
    if (!validSet(blockSet)) return false;
  }

  return true;
}

console.log(
  validSolution([
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9],
  ]) === true
);

console.log(
  validSolution([
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 0, 3, 4, 8],
    [1, 0, 0, 3, 4, 2, 5, 6, 0],
    [8, 5, 9, 7, 6, 1, 0, 2, 0],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 0, 1, 5, 3, 7, 2, 1, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 0, 0, 4, 8, 1, 1, 7, 9],
  ]) === false
);
