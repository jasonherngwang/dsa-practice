/*
Maximum and Minimum Product Triplets
https://edabit.com/challenge/zEFP5c8ZshTXRfgYb

Problem
------------------------------------------
Write two functions:
- One that returns the maximum product of three numbers in an array.
- One that returns the minimum product of three numbers in an array.

Inputs: Array of integers (neg, zero, pos)
Outputs: Smallest or largest product of ANY 3 numbers.

Rules, Requirements, Definitions
- Can't use same number multiple times.

Clarifying Questions
-

Edge Cases
- Array has <3 elements? Return null.
- NaN? No.
- Non-number data types? No.

Examples, Test Cases
------------------------------------------
[-8, -9, 1, 2, 7]
Max: 504 (-8 * -9 * 7)

Data Structure
------------------------------------------


Algorithm
------------------------------------------
- Initialize variable maxProduct or minProduct.
- Three nested interation O(N^3).
- Replace max or min with new value if it is larger/smaller.

*/

'use strict';

function maxProduct(arr) {
  if (arr.length < 3) return;
  let max = -Infinity;
  for (let i = 0; i < arr.length; i += 1) {
    for (let j = 0; j < arr.length; j += 1) {
      for (let k = 0; k < arr.length; k += 1) {
        if (new Set([i, j, k]).size === 3) {
          max = Math.max(max, arr[i] * arr[j] * arr[k]);
        }
      }
    }
  }
  return max;
}
function minProduct(arr) {
  if (arr.length < 3) return;
  let min = Infinity;
  for (let i = 0; i < arr.length; i += 1) {
    for (let j = 0; j < arr.length; j += 1) {
      for (let k = 0; k < arr.length; k += 1) {
        if (new Set([i, j, k]).size === 3) {
          min = Math.min(min, arr[i] * arr[j] * arr[k]);
        }
      }
    }
  }
  return min;
}

console.log(maxProduct([-8, -9, 1, 2, 7])); //504
console.log(maxProduct([-8, 1, 2, 7, 9])); //126
console.log(minProduct([1, -1, 1, 1])); //-1
console.log(minProduct([-5, -3, -1, 0, 4])); //-15
