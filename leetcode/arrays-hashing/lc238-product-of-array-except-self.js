/*
Product of Array Except Self
https://leetcode.com/problems/product-of-array-except-self/

Problem
------------------------------------------
Given an integer array nums, return an array answer such that answer[i] is
equal to the product of all the elements of nums except nums[i].

The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit
integer.

You must write an algorithm that runs in O(n) time and without using the
division operation.

Inputs: Array of integers
- Can be negative, zero, positive
- At least 2 elements
Outputs: Array where each element is the product of all numbers in the input
array, except the element at that index location.

Rules, Requirements, Definitions
- Cannot use division
- Must be O(N)

Clarifying Questions
-

Edge Cases
-


Examples, Test Cases
------------------------------------------
Input: [1,2,3,4]
Index 0: 2 * 3 * 4 = 24
Index 1: 1 * 3 * 4 = 12
Index 2: 1 * 2 * 4 =  8
Index 3: 1 * 2 * 3 =  6
Output: [24,12,8,6]

Data Structure
------------------------------------------
Arrays

Observations
------------------------------------------
Prohibiting divison means we cannot find the product of all integers, and
divide by the number at each index.

Requirement of O(N) means we cannot use nested iteration. We can likely solve
this in 1 or 2 passes

The result for index i is the product of all elements 0 < i and the product of
all elements > i.

Algorithm
------------------------------------------
Time: O(N) for right and left traversal
Space: O(N) for array and 1 variable
- O(1) if the result array DOES NOT count toward space usage.

First pass, left to right:
- Initialize a new array to store "running product". Each element will be the
  product of all elements to its left, NOT including itself.
  - The first element is initialized to 1 since there are no elements to its
    left.

Example:
Input: [1, 2, 3, 4]
First pass; [1, 1, 2, 6]

Second pass, right to left:
- Initialize a variable to store the product of all variables to the right of
  an index, NOT including the current index.
  - The initial value of this variable is 1 because there are no elements
    beyond the end of the array.
- Assemble the result array by directly modifying the array from the first pass.
  - From index arr.length - 1 down to 0:
    - The resulting value at index i is the product of the elements to the left
      and the variable tracking the product of elements to the right.

- Return the result array.
*/

'use strict';

function productExceptSelf(nums) {
  let leftProduct = [1];
  for (let i = 1; i < nums.length; i += 1) {
    leftProduct[i] = leftProduct[i - 1] * nums[i - 1];
  }

  let rightProduct = 1;

  for (let i = nums.length - 2; i >= 0; i -= 1) {
    rightProduct *= nums[i + 1];
    leftProduct[i] *= rightProduct;
  }
  return leftProduct;
}

console.log(productExceptSelf([1, 2, 3, 4])); // [24,12,8,6]
console.log(productExceptSelf([-1, -1, 0, -3, 3])); // [0,0,9,0,0]
