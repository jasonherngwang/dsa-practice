/*
Squishing an Array
https://edabit.com/challenge/8p7apuCwgSzWkaTC8

Problem
------------------------------------------
Write a function that squishes an array from the left or the right.

Inputs:
- Array of numbers (integers)
- String "left" or "right"
Outputs: Array of arrays.
- Starting with the original array, each successive array is the result of
  each squish.

Rules, Requirements, Definitions
- Squishing from the left is to successively sum the first two elements of an
  array (shortening the array in the process).
- Squishing from the right is to successively sum the last two elements of an
  array.
- Include the original array as the first element in either squish.
- Return an empty array if the input is an empty array.


Clarifying Questions
- Neg, pos, zero integers? Yes, all valid input.

Edge Cases
- Empty array input => Return empty array
- 1 elem => Return input array inside array
- 2nd argument is not "true" or "false" => Return empty array.

Examples, Test Cases
------------------------------------------
squish([1, 2, 3, 4, 5], "left")
➞ [[1, 2, 3, 4, 5], [3, 3, 4, 5], [6, 4, 5], [10, 5], [15]]

squish([1, 2, 3, 4, 5], "right")
➞ [[1, 2, 3, 4, 5], [1, 2, 3, 9], [1, 2, 12], [1, 14], [15]]

squish([1, 0, 2, -3], "left")
➞ [[1, 0, 2, -3], [1, 2, -3], [3, -3], [0]]

squish([1, 0, 2, -3], "right")
➞ [[1, 0, 2, -3], [1, 0, -1], [1, -1], [0]]

Data Structure
------------------------------------------
Input: Array, string
Intermediate: Array
Output: Array

Algorithm
------------------------------------------
Guard clauses
- If input array length <= 1, return itself.

Helper function (non-mutating) `squishArray(array, direction)`
- Left: Calculate sum of first 2 elements, and return an array of it
  concatenated with the input array from index 2 onward.
- Right: Calculate sum of last 2 elements. Slice the input array from index 0 to
  index array.length - 2. Concatenate the sum to this array, and return it.


Main steps (recursive)
- Base case: Array of length 1
  - Return the array itself.
- Recursive call:
  - Return concatenation of the input array itself, with the recursive call on
  the return value of the squishArray helper function.
  - Direction string does not change.

Main steps (iterative)
- Shallow copy array so we can mutate it.
- Initialize result array, and append shallow copy to it.
- While array length > 1:
  - Squish it and append to result.
- Return result.
*/

'use strict';

function invalidDirection(direction) {
  return !(direction === 'left' || direction === 'right');
}

function squishArray(array, direction) {
  if (direction === 'left') {
    let sum = array[0] + array[1];
    return [sum, ...array.slice(2)];
  }
  if (direction === 'right') {
    let sum = array[array.length - 1] + array[array.length - 2];
    return [...array.slice(0, array.length - 2), sum];
  }
  return array;
}

// console.log(squishArray([1, 2, 3, 4, 5], 'left')); // [3, 3, 4, 5]
// console.log(squishArray([1, 2], 'left')); // [3]
// console.log(squishArray([1, 2, 3, 4, 5], 'right')); // [1, 2, 3, 9]
// console.log(squishArray([4, 5], 'right')); // [9]
// console.log(squishArray([1, 2, 3, 4, 5], 'center')); // [1, 2, 3, 4, 5]

function squishRecursive(array, direction) {
  if (invalidDirection(direction)) return array;
  if (array.length === 0) return array;
  if (array.length === 1) return [array];
  let squishedArray = squishArray(array, direction);
  return [array].concat(squishRecursive(squishedArray, direction));
}

// Empty Input
console.log(squishRecursive([], 'left')); // []

// 1 Element Input
console.log(squishRecursive([1], 'left')); // [[1]]

// Multiple Elements
console.log(squishRecursive([1, 2, 3, 4, 5], 'left'));
// [[1, 2, 3, 4, 5], [3, 3, 4, 5], [6, 4, 5], [10, 5], [15]]

console.log(squishRecursive([1, 2, 3, 4, 5], 'right'));
// [[1, 2, 3, 4, 5], [1, 2, 3, 9], [1, 2, 12], [1, 14], [15]]

console.log(squishRecursive([1, 0, 2, -3], 'left'));
// [[1, 0, 2, -3], [1, 2, -3], [3, -3], [0]]

console.log(squishRecursive([1, 0, 2, -3], 'right'));
// [[1, 0, 2, -3], [1, 0, -1], [1, -1], [0]]

// Invalid direction string
console.log(squishRecursive([1, 2, 3, 4, 5], 'center')); // [1, 2, 3, 4, 5]

function squishIterative(array, direction) {
  if (invalidDirection(direction)) return array;
  if (array.length === 0) return array;

  let arrCopy = [...array];
  let result = [arrCopy];

  while (arrCopy.length > 1) {
    arrCopy = squishArray(arrCopy, direction);
    result.push(arrCopy);
  }

  return result;
}

// Empty Input
console.log(squishIterative([], 'left')); // []

// 1 Element Input
console.log(squishIterative([1], 'left')); // [[1]]

// Multiple Elements
console.log(squishIterative([1, 2, 3, 4, 5], 'left'));
// [[1, 2, 3, 4, 5], [3, 3, 4, 5], [6, 4, 5], [10, 5], [15]]

console.log(squishIterative([1, 2, 3, 4, 5], 'right'));
// [[1, 2, 3, 4, 5], [1, 2, 3, 9], [1, 2, 12], [1, 14], [15]]

console.log(squishIterative([1, 0, 2, -3], 'left'));
// [[1, 0, 2, -3], [1, 2, -3], [3, -3], [0]]

console.log(squishIterative([1, 0, 2, -3], 'right'));
// [[1, 0, 2, -3], [1, 0, -1], [1, -1], [0]]

// Invalid direction string
console.log(squishIterative([1, 2, 3, 4, 5], 'center')); // [1, 2, 3, 4, 5]
