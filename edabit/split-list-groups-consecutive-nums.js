/*


Problem
------------------------------------------
Given an array of integers and a specified length, write a function to determine
if we can even partition the array into groups of the specific length, such that
the numbers in each group are consecutive.

Inputs: 1 array of integers, 1 integer `n` which is the group length
- Can be neg, zero, pos
Outputs: true or false

Rules, Requirements, Definitions
- The input array must be evenly divided into 1 or more groups of size `n`,
  without any remaining elements.
  - E.g. a group of 5 elements and n = 3 will not divide evenly.
- All elements within a group must be consecutive.
- There may be duplicate numbers. They will belong in different groups.

Clarifying Questions
- Is it possible to have more than 1 possible grouping? Yes.

Edge Cases
- No argument? No.
- Empty array? Possible.
- n > array length? Possible.


Examples, Test Cases
------------------------------------------
[1,3,4,5], 2
[3, 4] and leftover 4, 5
[4, 5] and leftover 1, 3
=> false

Data Structure
------------------------------------------


Algorithm
------------------------------------------
Guard clauses
Return false if:
- n === 0
- n > array length
- array length % n !== 0
- array is empty
Return true if:
- n === 1

Steps
- Shallow copy the input array.
- Sort the numbers, ascending, O(N log N).
- While true:
  - Initialize a group array to hold the n elements of a single group.
  - While the input array still has elements left:
    - Iterate over the indices of the input array.
      - If group array empty or current value is group array's last element + 1,
        Add that index to the group array.
      - If array size === n, group is complete. Exit loop early.
    - If group size < n return false.
    - If group size === n, group is complete.
      - Delete the elements at those n indices from the input array (last to
        first).
      - Reset group array to empty array.
- Return true
*/

'use strict';

function consecutiveNums(arr, groupLen) {
  if (
    groupLen > arr.length ||
    arr.length % groupLen !== 0 ||
    arr.length === 0
  ) {
    return false;
  }
  if (groupLen === 1) return true;

  let nums = arr.slice().sort((a, b) => a - b);
  let group = [];

  while (nums.length > 0) {
    for (let i = 0; i < nums.length; i += 1) {
      if (group.length === 0 || nums[group[group.length - 1]] + 1 === nums[i]) {
        group.push(i);
      }
      if (group.length === groupLen) break;
    }
    if (group.length < groupLen) return false;
    if (group.length === groupLen) {
      for (let j = group.length - 1; j >= 0; j -= 1) {
        nums.splice(group[j], 1);
      }
      group = [];
    }
  }
  return true;
}

console.log(consecutiveNums([1, 3, 5], 1)); // true
console.log(consecutiveNums([5, 6, 3, 4], 2)); // true
console.log(consecutiveNums([1, 3, 4, 5], 2)); // false
console.log(consecutiveNums([1, 2, 3, 6, 2, 3, 4, 7, 8], 3)); // true
console.log(consecutiveNums([1, 2, 3, 4, 5], 4)); // false
