/*
Two Sum II
https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/

Problem
------------------------------------------
Given a 1-indexed array of integers, sorted in ascending order,
find two numbers that add up to a target value.
Return the 1-indexed indices of the two numbers.

Inputs: Array of integers, 1-indexed
Outputs: 2-element array containing indices of two numbers summing to the target

Rules, Requirements, Definitions
- There is exactly one solution.
- Can't use the same element twice.
- Space complexity O(1).
- Input array will have at least 2 elements.
  - No empty array

Clarifying Questions
-

Edge Cases
- No invalid input data type
- No missing arguments
- No sparse array
- No non-element properties in the array
- 1D array only


Examples, Test Cases
------------------------------------------
[2,7,11,15], target = 9
Index 1: 2
Index 2: 7
Output: [1,2]


Data Structure
------------------------------------------
Cannot use hash map of size N

Algorithm
------------------------------------------
Time: O(N) traversing outside to middle.
Space: O(1) for a couple of pointers.
Steps
- Two pointers initialized to start and end.
- While pointers have not crossed (left < right):
  - Sum left and right
  - If sum > target, decrement right pointer
  - If sum < target, increment right pointer
  - If sum === target, return indices (+1)

*/

'use strict';

function twoSum(numbers, target) {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    console.log(left, right);
    let sum = numbers[left] + numbers[right];
    if (sum > target) {
      right -= 1;
    } else if (sum < target) {
      left += 1;
    } else if (sum === target) {
      break;
    }
  }

  return [left + 1, right + 1];
}

console.log(twoSum([2, 7, 11, 15], 9)); // [1, 2]
console.log(twoSum([2, 3, 4], 6)); // [1, 3]
console.log(twoSum([-1, 0], -1)); // [1, 2]
