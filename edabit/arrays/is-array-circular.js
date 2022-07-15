/*
Is the Array Circular?
https://edabit.com/challenge/TfL5ffvWoEgsoRhuP

Problem
------------------------------------------
Write a function that determines if an array is circular. An array is circular
if its subarrays can be reordered such that each subarray's last element is
equal to the next subarray's first element.

For example, the array

[[1, 1, 1], [9, 2, 3, 4], [4, 1], [1, 2, 5, 7, 9]]
is circular because we can re-arrange the elements to create the following
array:

[[9, 2, 3, 4], [4, 1], [1, 1, 1], [1, 2, 5, 7, 9]]

Inputs: Array of subarrays
Outputs: true or false

Rules, Requirements, Definitions
- In a circular re-ordering, the last subarray's last element must be identical
  to the first subarray's first element.
- Subarrays will contain at least one element.
  - For a 1-element subarray, that element serves as both the first and last
    element

Clarifying Questions
-

Edge Cases
- Duplicates in subarrays? Possible, but doesn't matter since we can't reorder
  the subarrays.
  - Essentially the middle elements don't matter.


Examples, Test Cases
------------------------------------------
Input: [[1, 1, 1], [9, 2, 3, 4], [4, 1], [1, 2, 5, 7, 9]]

First elements: 1, 9, 4, 1
Last elements: 1, 4, 1, 9

Circular form: [[9, 2, 3, 4], [4, 1], [1, 1, 1], [1, 2, 5, 7, 9]]

The arrays formed by first and last elements have the same elements.

Data Structure
------------------------------------------
Hash to keep track of first and last elements.

Algorithm
------------------------------------------
- Initialize empty hash table to store counts.
- Iterate over subarrays in input arrays.
  - Retrieve first and last element.
    - For first element:
      - If not in hash table, create entry and initialize count to 1
      - If in hash table, increment its count. If 0, delete the entry.
    - For last element:
      - If not in hash table, create entry and initialize count to -1.
      - If in hash table, decrement its count. If 0, delete the entry.
- Check if each first element was paired with a corresponding last element.
  If so, the hash table will be empty.

*/

'use strict';

function isCircular(arr) {
  let counts = {};
  arr.forEach((subarr) => {
    let first = subarr[0];
    let last = subarr[subarr.length - 1];
    counts[first] = (counts[first] || 0) + 1;
    if (counts[first] === 0) delete counts[first];
    counts[last] = (counts[last] || 0) - 1;
    if (counts[last] === 0) delete counts[last];
  });
  return Object.keys(counts).length === 0;
}

console.log(
  isCircular([
    [9, 8],
    [6, 9, 1],
    [8, 4, 2],
    [1, 9],
    [2, 1, 6],
  ])
); //true
console.log(isCircular([[1, 2, 7], [7, 9, 3], [3], [3, 4], [4, 2, 1]])); // true
console.log(
  isCircular([
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
  ])
); //false
console.log(
  isCircular([
    [9, 9],
    [9, 2],
    [2, 9],
    [9, 5],
    [5, 9],
    [9, 6],
    [6, 9],
  ])
); //true
console.log(
  isCircular([
    [1, 2],
    [4, 1],
    [3, 4],
    [2, 3],
  ])
); //true
console.log(
  isCircular([
    [1, 1],
    [1, 2],
  ])
); //false
console.log(
  isCircular([
    [6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6],
    [6, 6, 9],
    [9, 0, 1],
  ])
); //false
console.log(
  isCircular([
    [2, 1],
    [1, 2],
  ])
); //true
console.log(
  isCircular([
    [2, 1],
    [1, 2],
    [2, 1],
    [1, 3, 1],
    [1, 4, 4],
  ])
); //false
