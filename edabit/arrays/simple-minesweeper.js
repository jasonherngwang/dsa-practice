/*
Simple Minesweeper
https://edabit.com/challenge/cEGny3Pc8tjTfJryr

Problem
Given a 2D array of mines, replace the question mark with the number of mines that immediately surround it. This includes the diagonals, meaning it is possible for it to be surrounded by 8 mines maximum.

The key is as follows:

An empty space: "-"
A mine: "#"
Number showing number of mines surrounding it: "?"

Inputs: 3x3 nested array where elements are '-', '#', or '?'
Outputs: 3x3 nested array where '?' has been replaced by a string represented the number of '#' it is surrounded by

Rules, Requirements, Definitions
- You will only be given 3x3 grids.
- The question mark is not limited to the centre (there may be multiple question marks).
- When converting '?' to a number, examine the elements in the 3x3 grid from (-1, -1) relative to the element, to (1, 1).
- The same mine can be counted multiple times, by different '?'.
- If '?' is on the edge of the grid, only consider elements inside the grid.

Clarifying Questions
- Any elements that are not '-', '#', or '?'? No.
- Any empty strings as elements? No.
- Input array always 3x3? Yes.
- Missing arguments or too many arguments? No.

Data Structure
Input: Array
Intermediate: Transform array
Output: Array

Algorithm
- Transform the input array.
  - If element is not '?', leave alone.
  - If element is '?':
    - Use helper function to identify coordinates of surrounding 8 elements.
    - Transform coordinates to values from the input array.
    - Count the number of '#' values in this array.
    - Return this number (as a string) from the function body.
      - Could be any number from 0 to 8.

Helper function: Surrounding 8 elements' coords
- Return nested array with 8 elements.
- Each coord is in the format [row, col].

Helper function: Count mines in surrounding coords
- Input: Array of coords in form [row, col].
- Retrieve all elements at those coords (including undefined if out-of-bounds coords).
- Filter to '#'.
- Return length of array.

*/

function surroundingCoords(row, col) {
  return [
    [row - 1, col - 1],
    [row - 1, col],
    [row - 1, col + 1],
    [row, col - 1],
    [row, col + 1],
    [row + 1, col - 1],
    [row + 1, col],
    [row + 1, col + 1],
  ];
}

// console.log(surroundingCoords(1, 1));

function countMines(coords, grid) {
  let filteredCoords = coords.filter(([row, col]) => {
    return row >= 0 && row < grid.length && col >= 0 && col < grid[0].length;
  });
  let elements = filteredCoords.map(([row, col]) => grid[row][col]);
  return String(elements.filter((e) => e === '#').length);
}

// console.log(countMines(surroundingCoords(1, 1), [
//   ["-", "#", "#"],
//   ["-", "?", "-"],
//   ["-", "-", "#"]
// ]));

function minesweeper(grid) {
  let gridCopy = grid.map((row) => row.slice());

  for (let row = 0; row < grid.length; row += 1) {
    for (let col = 0; col < grid[0].length; col += 1) {
      if (gridCopy[row][col] === '?') {
        gridCopy[row][col] = countMines(surroundingCoords(row, col), grid);
      }
    }
  }
  return gridCopy;
}

// Generic cases
console.log(
  minesweeper([
    ['-', '#', '-'],
    ['-', '?', '-'],
    ['-', '-', '-'],
  ])
);
// [
//   ["-", "#", "-"],
//   ["-", "1", "-"],
//   ["-", "-", "-"]
// ]

console.log(
  minesweeper([
    ['-', '#', '-'],
    ['#', '-', '?'],
    ['#', '#', '-'],
  ])
);
// [
//   ["-", "#", "-"],
//   ["#", "-", "2"],
//   ["#", "#", "-"]
// ]

// Each mine can be counted multiple times.
console.log(
  minesweeper([
    ['-', '#', '#'],
    ['?', '#', ''],
    ['#', '?', '-'],
  ])
);
// [
//   ["-", "#", "#"],
//   ["3", "#", ""],
//   ["#", "2", "-"]
// ]

// No adjacent mines
console.log(
  minesweeper([
    ['-', '-', '#'],
    ['?', '-', '-'],
    ['-', '-', '-'],
  ])
);
// [
//   ["-", "-", "#"],
//   ["0", "-", "-"],
//   ["-", "-", "-"]
// ]

// Edge cases
// No mines ('?' => '0')
console.log(
  minesweeper([
    ['-', '-', '-'],
    ['?', '-', '-'],
    ['-', '-', '-'],
  ])
);
// [
//   ["-", "-", "-"],
//   ["0", "-", "-"],
//   ["-", "-", "-"]
// ]

// No question marks (nothing gets replaced)
console.log(
  minesweeper([
    ['-', '-', '#'],
    ['-', '-', '-'],
    ['-', '-', '-'],
  ])
);
// [
//   ["-", "-", "#"],
//   ["-", "-", "-"],
//   ["-", "-", "-"]
// ]

// Max number of mines
console.log(
  minesweeper([
    ['#', '#', '#'],
    ['#', '?', '#'],
    ['#', '#', '#'],
  ])
);
// [
//   ["#", "#", "#"],
//   ["#", "8", "#"],
//   ["#", "#", "#"]
// ]

// Same mine counted 8x
console.log(
  minesweeper([
    ['?', '?', '?'],
    ['?', '#', '?'],
    ['?', '?', '?'],
  ])
);
// [
//   ["1", "1", "1"],
//   ["1", "#", "1"],
//   ["1", "1", "1"]
// ]
