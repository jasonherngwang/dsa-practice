/*
Crop Fields
https://edabit.com/challenge/9KMYT5u9sww3MSzNt

Problem
You're given a 2D array / matrix of a crop field. Each crop needs to be hydrated. Each water source hydrates the 8 tiles around it. With "w" representing a water source, and "c" representing a crop, is every crop hydrated?

Inputs: 1 nested array of strings
- 'w' is a water source.
- 'c' is a crop.
Outputs: Boolean
- true if all crops watered.
- false if not.

Rules, Requirements, Definitions
"To water" means that a water sources hydrates the 8 tiles around it
- Locations: If source is at 0,0 the following are watered;
  - -1, -1 to -1, 1
  -  0, -1 to  0, 1
  -  1, -1 to  1, 1
- The water source is itself hydrated.
- Overlapping watered areas are simply watered, not double watered.
- Water does not spill from a crop site to adjacent sites.

Non-domain-specific requirements
- Do not mutate input array.

Examples, Test Cases
// Generic cases
console.log(cropHydrated([
  [ "w", "c" ],
  [ "w", "c" ],
  [ "c", "c" ]
])); // true

console.log(cropHydrated([
  [ "w", "c", "c" ],
  [ "w", "c", "c" ],
  [ "c", "c", "w" ]
])); // false (top right crop not watered)

console.log(cropHydrated([
  [ "c", "c", "c", "c" ],
  [ "w", "c", "c", "c" ],
  [ "c", "c", "c", "c" ],
  [ "c", "w", "c", "c" ]
])); // false

Edge Cases
// Water sources only
console.log(cropHydrated([
  [ "w" ]
])); // true
console.log(cropHydrated([
  [ "w", "w", "w" ]
])); // true

// No water sources
console.log(cropHydrated([
  [ "c" ]
])); // false
console.log(cropHydrated([
  [ "c", "c", "c" ]
])); // false

// Empty array
console.log(cropHydrated([
  []
])); // false

// Unexpected level of nesting
console.log(cropHydrated([
  [ "w", "w", ["w"] ]
])); // false

// Sparse array
console.log(cropHydrated([
  ["w", , "c"]
])); // false

// Illegal characters
console.log(cropHydrated([
  [ "c", "a", "t" ]
])); // false

console.log(cropHydrated([
  [ "9", "c", "w" ]
])); // false

// Missing or too many args
console.log(cropHydrated()); // false
console.log(cropHydrated([[ "w" ]], 123456)); // true

Data Structure
- Use an array to track "watered" status.

Algorithm
Use a nested array of same dimensions to track watered status. For each water sources, identify its 8 adjacent locations and "mark" them as watered. Check if all elements are marked watered.

- Initialize array `watered` to track watered status, by copying input array (splicing at level 2)
- Iterate over all elements of the input array, tracking its coordinates (row, col):
  - If current element is 'w', use helper function to identify surrounding elements by coordinate (row, col).
  - Iterate over surrounding coordinates and check if it falls within the bound of the field, by checking for undefined.
    - Reassign the element in the `watered` array to `true`
- Flatten `watered` array and check if every element is `true`.

Helper function: Identify surrounding coords
- Inputs: row, col
- Return an array of 8 coordinate pairs, relative to the input coords:
  -1, -1 to -1, 1
   0, -1 to  0, 1
   1, -1 to  1, 1


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

// console.log(surroundingCoords(0, 0));

function cropHydrated(field) {
  if (arguments.length === 0) return false;
  if (field.some((row) => row.length === 0)) return false;

  let watered = field.map((row) => row.map((crop) => crop === 'w'));

  for (let row = 0; row < field.length; row += 1) {
    for (let col = 0; col < field[0].length; col += 1) {
      let tile = field[row][col];
      if (typeof tile !== 'string' || !['w', 'c'].includes(tile)) return false;

      if (tile === 'w') {
        let wateredCoords = surroundingCoords(row, col);
        wateredCoords.forEach(([r, c]) => {
          if (watered[r] !== undefined && watered[r][c] !== undefined) {
            watered[r][c] = true;
          }
        });
      }
    }
  }

  return watered.flat().every((tile) => tile === true);
}

('use strict');
// Generic cases
console.log(
  cropHydrated([
    ['w', 'c'],
    ['w', 'c'],
    ['c', 'c'],
  ])
); // true

console.log(cropHydrated([['c', 'w']])); // true

console.log(
  cropHydrated([
    ['w', 'c', 'c', 'c', 'c'],
    ['c', 'c', 'c', 'w', 'c'],
  ])
); // true

console.log(
  cropHydrated([
    ['w', 'c', 'c'],
    ['w', 'c', 'c'],
    ['c', 'c', 'w'],
  ])
); // false (top right crop not watered)

console.log(
  cropHydrated([
    ['c', 'c', 'c', 'c'],
    ['w', 'c', 'c', 'c'],
    ['c', 'c', 'c', 'c'],
    ['c', 'w', 'c', 'c'],
  ])
); // false

// Edge Cases
// Water sources only
console.log(cropHydrated([['w']])); // true
console.log(cropHydrated([['w', 'w', 'w']])); // true

// No water sources
console.log(cropHydrated([['c']])); // false
console.log(cropHydrated([['c', 'c', 'c']])); // false

// Empty array
console.log(cropHydrated([[]])); // false

// Unexpected level of nesting
console.log(cropHydrated([['w', 'w', ['w']]])); // false

// Sparse array
console.log(cropHydrated([['w', , 'c']])); // false

// Illegal characters
console.log(cropHydrated([['c', 'a', 't']])); // false

console.log(cropHydrated([['9', 'c', 'w']])); // false

// Missing or too many args
console.log(cropHydrated()); // false
console.log(cropHydrated([['w']], 123456)); // true
