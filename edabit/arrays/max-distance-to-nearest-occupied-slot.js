/*
Max Distance to the Nearest Occupied Slot
https://edabit.com/challenge/n97PkSByLXZrApJXn

Problem
------------------------------------------
The function is given a string consisting from "0", "1" characters.
The string represents a parking area:

"1" - the slot is occupied,
"0" - the slot is vacant.

Find a vacant slot such that it has the maximum distance from an occupied one.
It can be at the ends of the area or between two "1"s. Return the maximum
distance as integer.

Inputs: 1 string of ones and zeroes
Outputs: 1 integer, the max distance a zero and the closest one.

Rules, Requirements, Definitions
-


Clarifying Questions
-

Edge Cases
- If all ones or all zeroes, return 0.
- If 0 is equidistance from two 1's, return either distance since they are the
  same.


Examples, Test Cases
------------------------------------------
maxDistance("01") ➞ 1
// Only the first slot is vacant. Take it. The distance is 1.

maxDistance("100") ➞ 2
// Take the last slot on the right. The distance is 2.

maxDistance("100000101") ➞ 3
// Take the slot at index 3. The distance is 3.

maxDistance("000010000001001") ➞ 4
// Take the slot at index 0. The distance is 4.
// The other possible slots at indices 7, 8 have distance 3.

Data Structure
------------------------------------------


Algorithm
------------------------------------------
Guard clause
- If string length is 0, return 0
- If all ones or zeroes, return 0

Brute force
Time: Traverse N elements, expand up to N-1 steps => O(N^2)
Space: O(1)
Steps
- Initialize a variable maxDistance
- Iterate over all characters.
- If 0:
  - Keep a distance
  - Expand outward, stopping when the first 1 is encoutered.
  - Compare distance and maxDistance; save larger to maxDistance
- Return maxDistance

Approach 2
Time: O(3N) -> O(N)
- Traverse twice to build distanceToLeftOne and distanceToRightone
- Last traversal to determine max distance.
Steps
- Initialize counter representing distance to closest 1 on the left, to 0.
- Initialize array distanceToLeftOne
  - If string starts with 0, push Infinity to the array since there is no 1 to
    the left.
  - If starts with 1, push 0.
- Traverse array LtR, starting from index 1
  - If current element is 1
    - Reset distance to 0
    - Push distance to array
  - If current element is 0:
    - Increment distance by 1
    - Push distance to array
- Repeat traversal, RtL. Unshift instead of push.
- Iterate through the index, taking the minimum of both lists. Save in a
  variable maxDistance.

100000101
012345010 (from left)
054321010 (from right; reverse of previous array)
012321010 (take minimum)

000010000001001
IIII01234560120
43210654321IIII

*/

'use strict';

function maxDistance(slots) {
  let distance = 0;
  let distanceToLeftOne = [];
  let distanceToRightOne = [];
  let maxDistance = -Infinity;

  distanceToLeftOne.push(slots[0] === '0' ? Infinity : 0);
  distanceToRightOne.push(slots[slots.length - 1] === '0' ? Infinity : 0);

  // Traverse LtR
  for (let i = 1; i < slots.length; i += 1) {
    if (slots[i] === '1') distance = 0;
    if (slots[i] === '0') distance += 1;
    distanceToLeftOne.push(distance);
  }

  // Traverse RtL
  distance = 0;
  for (let i = slots.length - 2; i >= 0; i -= 1) {
    if (slots[i] === '1') distance = 0;
    if (slots[i] === '0') distance += 1;
    distanceToRightOne.unshift(distance);
  }

  // console.log(distanceToLeftOne);
  // console.log(distanceToRightOne);

  // Take min value from both arrays.
  for (let i = 0; i < distanceToLeftOne.length; i += 1) {
    let minDistance = Math.min(distanceToLeftOne[i], distanceToRightOne[i]);
    maxDistance = Math.max(maxDistance, minDistance);
  }

  return maxDistance;
}

console.log(maxDistance('01')); // 1
console.log(maxDistance('100')); // 2
console.log(maxDistance('100000101')); // 3
console.log(maxDistance('000010000001001')); // 4
console.log(maxDistance('000011101000011')); // 4
