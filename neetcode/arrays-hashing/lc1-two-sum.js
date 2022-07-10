/*
Two Sum
https://leetcode.com/problems/two-sum/

Problem
------------------------------------------
Given an array of integers nums and an integer target, return indices of the
two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not
use the same element twice.

You can return the answer in any order.

Inputs:
- 1 array of integers
- 1 target number
Outputs: 1 array with two elements, the indices of two numbers that add up to
the target

Rules, Requirements, Definitions
- There is always a solution
- There is only 1 possible solution
- The order of the indices doesn't matter
- Can only use each number once. Therefore the returned indices are different
  values.

Clarifying Questions
- Can array have negative and 0? Yes.

Edge Cases
-


Examples, Test Cases
------------------------------------------
Example 1:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Example 2:
Input: nums = [3,2,4], target = 6
Output: [1,2]

Example 3:
Input: nums = [3,3], target = 6
Output: [0,1]

Data Structure
------------------------------------------
May use object to keep track of matching pairs

Algorithm
------------------------------------------
Time: O(N). 1 traversal.
Space: O(N). Object can be size N.
- Initialize empty object.
- Iterate over array:
  - Find the "complement" of the current number, i.e. the number we need to add
    to it to sum to the target value
  - Check if the complement is already a key in the object.
    - If so, then the current number and that complement are the solution.
      - The property value of that complement is its index.
      - Return the array [complementIndex, currentNumIndex]
    - If not, create a new property in the object
      - Key: current value
      - Value: current index
- Since there is always a solution, don't need to return anything after the
  iteration.
*/

function twoSum(nums, target) {
  let complements = {};

  for (let i = 0; i < nums.length; i += 1) {
    let complement = target - nums[i];
    if (complement in complements) {
      return [complements[complement], i];
    } else {
      complements[nums[i]] = i;
    }
  }
}

console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
console.log(twoSum([3, 2, 4], 6)); // [1, 2]
console.log(twoSum([3, 3], 6)); // [0, 1]

// Negative numbers
console.log(twoSum([-3, 7, -9, -3], -6)); // [0, 3]
console.log(twoSum([-4, 7, 1], -3)); // [0, 2]

// Zero
console.log(twoSum([0, 0], 0)); // [0, 1]
console.log(twoSum([0, 7], 7)); // [0, 1]
