/*
Moving Particles Absorb Each Other after Collisions
https://edabit.com/challenge/LeadHSgaXD3YFQkS6

Problem
------------------------------------------
Given an array of particles size/directions, resolve all collisions and return
an array representing the end state.

Inputs: 1 array of integers
- Absolute value of the number represents the particle mass.
- Positive represents particle moving right.
- Negative represents particle moving left.
Outputs: 1 array of integers, the final state

Rules, Requirements, Definitions
- A positive value collides with a negative value immediately to its right. This
  is the only scenario in which particles collide.
- Two adjacent positive values, and two adjacent negative values, will not
  collide with each other since they are moving in the same direction at the
  same speed.
- Contiguous negative values at the beginning of the array can be ignored.
- Contiguous positive values at the end of the array can be ignored.
- If there are contiguous positive values at the beginning, ignore all but the
  last one.
- When two values collide, their resulting mass is the sum of their absolute
  values.
  - If the positive mass >= negative mass, the resuling value is positive
  - If the positive mass < negative mass, the resuling value is negative.
- All negatives on left, all positives on right => Equilibrium

Clarifying Questions
-

Edge Cases


Examples, Test Cases
------------------------------------------
movingParticles([3, -1]) ➞ [4]
// 3 absorbs -1.

movingParticles([-1, 3, -1, 2]) ➞ [-1, 4, 2]
// -1 is moving to the left, 2 is moving to the right, 3 absorbs -1.

movingParticles([]) ➞ []
// No particles are in the list.

movingParticles([5, -1, -2, -9]) ➞ [-17]
// 5 absorbs -1, new 6 absorbs -2, new 8 is being absorbed by -9.

[-1, -2, -3, 3, 2, 1]
// No movement; equilibrium

[1, 2, 3, -3, -2, -1]
3 collides with -3 => 6
6 collides with -2 => 8
8 collides with -1 => 9
[1, 2, 9]

[1, 1, 1, -1, -5, 1]
1 & -1 => 2
2 & -5 => -7
1 & -7 => -8
1 & -8 => -9

Data Structure
------------------------------------------
Arrays for iteration

Algorithm
------------------------------------------
// Approach 1
Repeatedly iterate through the array, performing one operation on each pass.
If no operations were performed, the array is at equilibrium.

Helper function: Merge 2 particles
Inputs: pos, neg (integers)
- If pos >= -(neg), return pos - neg
- Else, return neg - pos

Guard clause (not necessary)
- If array length <= 1 return itself.

Steps
- Shallow copy input array so we can mutate it.
- While loop:
  - Initialize flag to track if a merge was performed, to false.
  - Iterate from index 0 to 2nd-to-last element:
    - If current elem is positive and next is negative, replace these two
      elements with the single return value of calling the helper function.
      - slice() could be useful.
      - Set flag to true.
  - If flag is false, no merges were made. Exit loop.
- Return result array.
*/

'use strict';

function mergeParticles(pos, neg) {
  return pos >= -neg ? pos - neg : neg - pos;
}

function movingParticles(arr) {
  let particles = arr.slice();

  while (true) {
    let mergeOccurred = false;

    for (let i = 0; i < particles.length - 1; i += 1) {
      if (particles[i] > 0 && particles[i + 1] < 0) {
        particles.splice(i, 2, mergeParticles(particles[i], particles[i + 1]));
        mergeOccurred = true;
        break;
      }
    }
    if (!mergeOccurred) break;
  }

  return particles;
}

console.log(movingParticles([3, -1])); // 4
console.log(movingParticles([-1, 3, -1, 2])); // [-1, 4, 2]
console.log(movingParticles([])); // []
console.log(movingParticles([5, -1, 2, -9])); // [-17]
console.log(movingParticles([-1, -2, -3, 3, 2, 1])); // [-1, -2, -3, 3, 2, 1]
console.log(movingParticles([1, 2, 3, -3, -2, -1])); // [1, 2, 9]
console.log(movingParticles([1, 1, 1, -1, -5, 1])); // [-9, 1]
console.log(movingParticles([1, 1, 0, 1, -1, -5, 1])); // [1, 1, 0, -7, 1]
