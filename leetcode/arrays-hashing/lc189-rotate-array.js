/*
Rotate Array
https://leetcode.com/problems/rotate-array/

Problem
------------------------------------------
Given an array, rotate the array to the right by k steps, where k is
 non-negative.

Inputs:
- 1 array of numbers
  - Will contain at least 1 element.
  - Can be neg, 0, pos integer.
- 1 non-negative integer `k`, the num of steps to rotate
Outputs: 1 new array, the input array rotated by `k` steps

Rules, Requirements, Definitions
- "Rotating right" means moving the last element to the first position, and
  shifting all other elements to the right by 1 index.

Clarifying Questions
-

Edge Cases
- Empty array not possible.
- k > array length is the same as rotating k % length.


Examples, Test Cases
------------------------------------------
Input: nums = [-1,-100,3,99], k = 2
Output: [3,99,-1,-100]
Explanation:
rotate 1 steps to the right: [99,-1,-100,3]
rotate 2 steps to the right: [3,99,-1,-100]

Data Structure
------------------------------------------
Use array to hold result.

Algorithm
------------------------------------------
- Take the remainder of k divided by the array length, to avoid unnecessary
  rotation.

Approach 1: Array abstractions
- Slice last k elements, and append first (length - k) elements)

Approach 2: Assign to new index in result array
- Initialize empty result array.
- Iterate over array.
  - Compute each element's position in the new array as:
    (currentIndex + k) % length
  - Insert into new array at that index.

Approach 3: Swap in-place
- Initialize `numSwaps` to 0. We will make as many swaps as the number of
  elements.
- Initialize startIndex to 0. This is used to detect if we compute the next
  swap to be with the starting index, thus creating a loop.
- While swaps < n:
  - Initialize currentIndex variable pointing at startIndex.
  - Initialize holding variable pointing to the value at startIndex.
  - While loop. As long as we haven't created a cycle:
    - Compute element's position in the new array as:
      newIndex = (currentIndex + k) % array length
    - Swap holding variable value with the value at the newIndex.
    - The newIndex now becomes the currentIndex, to be used in the next
      iteration.
    - Increment the number of swaps made.
    - If a loop is detected (arrive at startIndex before all swaps completed),
      break out of the loop.
  - Increment the startIndex and continue looping.
*/

'use strict';

function rotate(nums, k) {
  k %= nums.length;
  return nums.slice(nums.length - k).concat(nums.slice(0, nums.length - k));
}

console.log(rotate([1, 2, 3, 4, 5, 6, 7], 3)); // [5,6,7,1,2,3,4]
console.log(rotate([-1, -100, 3, 99], 2)); // [3,99,-1,-100]
console.log(rotate([-1, '-100', true, NaN, undefined, null], 2));
// [ undefined, null, -1, '-100', true, NaN ]

function rotate2(nums, k) {
  let result = [];

  nums.forEach((elem, index) => {
    let newIndex = (index + k) % nums.length;
    result[newIndex] = elem;
  });

  return result;
}

console.log(rotate2([1, 2, 3, 4, 5, 6, 7], 3)); // [5,6,7,1,2,3,4]
console.log(rotate2([-1, -100, 3, 99], 2)); // [3,99,-1,-100]

function rotate3(nums, k) {
  let n = nums.length;
  k %= n;
  let numSwaps = 0;
  let startIndex = 0;

  while (numSwaps < n) {
    let currentIndex = startIndex;
    let holding = nums[startIndex];
    while (true) {
      let newIndex = (currentIndex + k) % n;
      [holding, nums[newIndex]] = [nums[newIndex], holding];
      currentIndex = newIndex;
      numSwaps += 1;
      if (currentIndex === startIndex) break;
    }
    startIndex += 1;
  }

  return nums;
}

console.log(rotate3([1, 2, 3, 4, 5, 6, 7], 3)); // [5,6,7,1,2,3,4]
console.log(rotate3([-1, -100, 3, 99], 2)); // [3,99,-1,-100]
