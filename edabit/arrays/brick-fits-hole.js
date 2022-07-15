/*
Check If the Brick Fits through the Hole
https://edabit.com/challenge/ixdXLyopP7c4aPXqx

Problem
------------------------------------------
Write the function that takes three dimensions of a brick: height(a), width(b)
and depth(c) and returns true if this brick can fit into a hole with the
width(w) and height(h).

Inputs: 5 integers: brick HxWxD, hole WxH
Outputs: true if brick fits, false if not

Rules, Requirements, Definitions
- You can turn the brick with any side towards the hole.
- We assume that the brick fits if its sizes equal the ones of the hole
  (i.e. brick size should be less than or equal to the size of the hole, not
  strictly less).
- You can't put a brick in at a non-orthogonal angle.

Brick fits if:
- For any combination of two of height, width, depth
  - The first is <= hole width and second <= hole height, OR
  - The first is <= hole height and second <= hole width


Clarifying Questions
-

Edge Cases
- Dimensions cannot be zero, otherwise the brick or hole would not exist.


Examples, Test Cases
------------------------------------------
Brick 1x1x1, Hole 1x1: Brick will fit in any orientation

Brick 1x2x1, Hole 1x1: Brick will fit if the 1x1 cross-section is inserted.

Brick 1x2x2, Hole 1x1: Brick will not fit. There is not side that is 1x1 or
smaller


Data Structure
------------------------------------------
Use array. Generate combinations.

Algorithm
------------------------------------------
- Create 3 pairs of dimensions from the brick dimensions: HxW, HxD, WxD.
- For each pair XxY, and hole dimensions HxW, check if either:
  - X <= H and Y <= W, or
  - Y <= H and X <= W
  - If either is true, return true.
- Return false.
*/

'use strict';

function doesBrickFit(a, b, c, w, h) {
  let brickFaces = [
    [a, b],
    [a, c],
    [b, c],
  ];
  for (let [x, y] of brickFaces) {
    if ((x <= w && y <= h) || (x <= h && y <= w)) return true;
  }
  return false;
}

console.log(doesBrickFit(1, 1, 1, 1, 1)); // true
console.log(doesBrickFit(1, 2, 1, 1, 1)); // true
console.log(doesBrickFit(1, 2, 2, 1, 1)); // false
console.log(doesBrickFit(1, 2, 2, 1, 2)); // true
console.log(doesBrickFit(1, 2, 2, 2, 1)); // true
console.log(doesBrickFit(2, 2, 2, 1, 2)); // false
