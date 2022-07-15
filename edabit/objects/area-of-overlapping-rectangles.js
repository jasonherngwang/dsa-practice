/*
Area of Overlapping Rectangles
https://edabit.com/challenge/dejHsfH2qWpgu4CGC

Problem
------------------------------------------
Create a function that returns the area of the overlap between two rectangles.
The function will receive two rectangles, each with the coordinates of two of
its opposite angles.

Inputs: Two arrays containing coordinates for the bottom-left and top-right
corners of rectangles.
- Coordinates can be positive or negative integers.
Outputs: 1 integer, the area of the overlap

Rules, Requirements, Definitions
- There may be no overlap: Return 0.


Clarifying Questions
- Order of coordinates? Seems to be bottom-left first and then top-right, but
  assume it could be any two diagonally-opposite corners.

Edge Cases
- Rectangles share a border but do not overlap: Return 0.
- One rectangle completely inside the other: Return the area of the enclosed
  rectangle.
- Zero-area rectangle? Possible.


Examples, Test Cases
------------------------------------------
overlappingRectangles(
  [{ x: 2, y: 1 }, { x: 5, y: 5 }],
  [{ x: 3, y: 2 }, { x: 5, y: 7 }]
) ➞ 6

Idea: Determine horizontal overlap, then multiply by vertical overlap.
Rect1 spans x from 2-5
Rect1 spans x from 3-5
Overlap is 3-5 => width of 2
Rect1 spans y from 1-5
Rect1 spans y from 2-7
Overlap is 2-5 => height of 3
Multiply: 2 * 3 = 6

Data Structure
------------------------------------------
Use variables to track spans.

Algorithm
------------------------------------------
- Take max of x coordinates of rect1, coord1.
- Take min of x coordinates of rect1, coord2.
- Take the difference as xOverlap.
- Take max of y coordinates of rect1, coord1.
- Take min of y coordinates of rect1, coord2.
- Take the difference as yOverlap.
- Multiply xOverlap and yOverlap.

*/

'use strict';

function overlappingRectangles(rect1, rect2) {
  let xOverlap =
    Math.min(rect1[1].x, rect2[1].x) - Math.max(rect1[0].x, rect2[0].x);
  let yOverlap =
    Math.min(rect1[1].y, rect2[1].y) - Math.max(rect1[0].y, rect2[0].y);
  return Math.max(xOverlap, 0) * Math.max(yOverlap, 0);
}

console.log(
  overlappingRectangles(
    [
      { x: 2, y: 1 },
      { x: 5, y: 5 },
    ],
    [
      { x: 3, y: 2 },
      { x: 5, y: 7 },
    ]
  )
); // 6
console.log(
  overlappingRectangles(
    [
      { x: 2, y: -9 },
      { x: 13, y: -4 },
    ],
    [
      { x: 5, y: -11 },
      { x: 7, y: -2 },
    ]
  )
); // 10
console.log(
  overlappingRectangles(
    [
      { x: -8, y: -7 },
      { x: -4, y: 0 },
    ],
    [
      { x: -5, y: -9 },
      { x: -1, y: -2 },
    ]
  )
); // 5
console.log(
  overlappingRectangles(
    [
      { x: -11, y: 2 },
      { x: -1, y: 6 },
    ],
    [
      { x: -8, y: 2 },
      { x: -4, y: 9 },
    ]
  )
); // 16
console.log(
  overlappingRectangles(
    [
      { x: -4, y: -6 },
      { x: 1, y: 1 },
    ],
    [
      { x: -2, y: -2 },
      { x: 3, y: 4 },
    ]
  )
); // 9
console.log(
  overlappingRectangles(
    [
      { x: -3, y: -3 },
      { x: 3, y: 3 },
    ],
    [
      { x: -1, y: -1 },
      { x: 1, y: 1 },
    ]
  )
); // 4

// No overlaps
console.log(
  overlappingRectangles(
    [
      { x: 1, y: 1 },
      { x: 4, y: 4 },
    ],
    [
      { x: 4, y: 4 },
      { x: 6, y: 6 },
    ]
  )
); // 0
console.log(
  overlappingRectangles(
    [
      { x: 1, y: 1 },
      { x: 4, y: 3 },
    ],
    [
      { x: 4, y: 4 },
      { x: 6, y: 6 },
    ]
  )
); // 0
console.log(
  overlappingRectangles(
    [
      { x: 1, y: 1 },
      { x: 3, y: 3 },
    ],
    [
      { x: 4, y: 4 },
      { x: 6, y: 6 },
    ]
  )
); // 0
