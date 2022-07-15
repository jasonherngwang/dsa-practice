/*
Three Sum
https://leetcode.com/problems/3sum/

Problem
------------------------------------------
Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]]
such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.

Inputs: 1 array of integers (neg, 0, pos)
- Will contain at least 3 elements.
Outputs: 1 nested array.
- Subarray are triplets. Triplets must:
  - Contain numbers located at different indices. If there are duplicates in the
    array, we can use one instance of each, if needed.
  - Contain numbers that sum to 0.
- Cannot have triplets that are the same when sorted.
- Return empty array if no triplets meet the requirements.

Rules, Requirements, Definitions
- Order of subarrays doesn't matter.
- Order of numbers within a subarray doesn't matter. As long as no two triplets
  are the same after sorting.
- If an input array has 3 elements, then those three constitute the only
  possible triplet. Reordering them does not contitute a different triplet.

Clarifying Questions
-

Edge Cases
-


Examples, Test Cases
------------------------------------------
Input:
[-1,0,1,2,-1,-4]
Triplets
[-1,0,1], [-1,-1,2]
Output:
[[-1,-1,2],[-1,0,1]]

Input: [1,1,-2]
Output: [1,1,-2]


Data Structure
------------------------------------------


Algorithm
------------------------------------------
Brute Force
Time: O(N^3) to create combinations

Steps
- Find all possible triplets with 3 different elements.
- Remove those that use the same index multiple times.
- Keep only unique combinations of indices.
- Remove duplicates after sorting the triplets.
- Filter to those for which the numbers sum to 0.

Approach 1: Two Pointer (like Two Sum II)
Time: O(N^2)
- Iterate over all elements
- For each element, perform outside-in iteration of the remaining elements.
Space: O(1)?
- Only using a few pointers.
- Sort input in-place.
- Ignore space required for result array.

Guard clauses
- Array must be length 3 or greater.

Steps
- Initialize result array.
- Declare left and right pointers.
- Sort array ascending.
- Iterate through array:
  - If value > 0, break. Since array is sorted, everything to the right is
    positive and cannot sum to 0. No need to iterate any more.
  - If value is the same as the previous, skip it because we only need to
    consider the first instance of each unique number.
  - Each element serves as a pivot. For elements to the right of it, perform
    Two Sum II (outside-in traversal).
    - Set left to i + 1, and right to last index.
    - While pointers have not crossed (left < right):
      - Sum the pivot, left and right.
      - If sum > 0, decrement right.
      - If sum < 0, increment left.
      - If sum === 0, a triplet is found. Add a triplet array containing the
        numbers associated with pivot, left, and right to the result array.
        - Increment left and decrement right at the same time.
        - Continue advancing left to the right (and right to the left) if they
          are the same as the previous number. This prevents considering
          duplicates.
- Return result array.

Approach 2: Using a Set (like Two Sum I)
Similar to Two Pointer approach, but instead of iterating outside-in, we use a
hash table to store complemeents.
Time: O(N^2)
Space: O(N) for set

Steps
- Initialize result array.
- Sort array ascending.
- Iterate over array:
  - If value > 0, break.
  - If value is same as prev elem, continue to next iteration.
  - Use Two Sum I:
  - Initialize empty set to store unique complements.
  - Iterate over elements to the right of current pivot, using pointer `j`:
    - Compute complement as -pivot - value at `j`.
      pivot + nums[j] + nums[?] === 0, so nums[?] = -pivot - nums[i]
    - If complement in set:
      - Add triplet of the three values to result array.
      - Advance pointer until `j` reaches a new value (avoid duplicates). Also
        check if the next index is the end of the array.
    - Add nums[j] to set, since we have now "seen" it.
*/

'use strict';

// Brute Force
function threeSum(nums) {
  let allTriplets = [];

  // All possible triplets of indices (no repeated indices in the same triplet)
  for (let i = 0; i < nums.length; i += 1) {
    for (let j = 0; j < nums.length; j += 1) {
      for (let k = 0; k < nums.length; k += 1) {
        if (i !== j && i !== k && j !== k) {
          allTriplets.push([nums[i], nums[j], nums[k]]);
        }
      }
    }
  }

  // Remove duplicates (when sorted)
  let uniqueTriplets = {};

  allTriplets.forEach((triplet) => {
    triplet = triplet.sort((a, b) => a - b);
    let key = triplet.join(',');
    // console.log(key);
    if (!(key in uniqueTriplets)) {
      uniqueTriplets[key] = triplet;
    }
  });

  uniqueTriplets = Object.values(uniqueTriplets);

  // Triplets that sum to 0
  return uniqueTriplets.filter((triplet) => {
    return triplet.reduce((sum, num) => sum + num, 0) === 0;
  });
}

// // General test case
// console.log(threeSum([-1, 0, 1, 2, -1, -4])); // [[-1,0,1], [-1,-1,2]]
// console.log(threeSum([0, 0, 0, 0])); // [0,0,0]

// // Only 1 triplet can be created
// console.log(threeSum([0, 0, 0])); // [[0,0,0]]

// // No triplets
// console.log(threeSum([1, 0, 0])); // []

// Approach 1: Two Pointer (like Two Sum II)
function threeSum2(nums) {
  if (nums.length < 3) return [];

  let result = [];
  let left;
  let right;

  nums.sort((a, b) => a - b);

  for (let pivot = 0; pivot < nums.length; pivot += 1) {
    let pivotVal = nums[pivot];

    if (pivotVal > 0) break;
    if (pivotVal === nums[pivot - 1]) continue;

    left = pivot + 1;
    right = nums.length - 1;

    while (left < right) {
      let sum = pivotVal + nums[left] + nums[right];
      if (sum > 0) right -= 1;
      if (sum < 0) left += 1;
      if (sum === 0) {
        result.push([pivotVal, nums[left], nums[right]]);
        left += 1;
        while (nums[left] === nums[left - 1]) left += 1;
        right -= 1;
        while (nums[right] === nums[right + 1]) right -= 1;
      }
    }
  }

  return result;
}

// General test case
// console.log(threeSum2([-1, 0, 1, 2, -1, -4])); // [[-1,0,1], [-1,-1,2]]
// console.log(threeSum2([0, 0, 0, 0])); // [0,0,0]

// Only 1 triplet can be created
// console.log(threeSum2([0, 0, 0])); // [[0,0,0]]

// No triplets
// console.log(threeSum2([1, 0, 0])); // []

// Approach 2: Using a Set (like Two Sum I)
function threeSum3(nums) {
  let result = [];
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length; i += 1) {
    let num = nums[i];
    if (num > 0) break;
    if (num === nums[i - 1]) continue;

    let seen = new Set();
    let j = i + 1;
    while (j < nums.length) {
      let complement = -num - nums[j];
      if (seen.has(complement)) {
        result.push([num, nums[j], complement]);
        while (nums[j] === nums[j + 1] && j + 1 < nums.length) j += 1;
      }
      seen.add(nums[j]);
      j += 1;
    }
  }
  return result;
}

// General test case
console.log(threeSum3([-1, 0, 1, 2, -1, -4])); // [[-1,0,1], [-1,-1,2]]
console.log(threeSum3([0, 0, 0, 0])); // [0,0,0]

// Only 1 triplet can be created
console.log(threeSum3([0, 0, 0])); // [[0,0,0]]

// No triplets
console.log(threeSum3([1, 0, 0])); // []
