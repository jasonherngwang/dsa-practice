/*
Contains Duplicate
https://leetcode.com/problems/contains-duplicate/

Problem
------------------------------------------
Given an integer array nums, return true if any value appears at least twice in
the array, and return false if every element is distinct.

Inputs: Array of integers
Outputs: Boolean
- true if array contains a duplicate
- false if all elements distinct

Rules, Requirements, Definitions
- Integers can be negative, 0, positive
- No other data types

Clarifying Questions
-

Edge Cases
- Arguments missing? No.
- Empty array? Yes. Returns false since no elements means no duplicates.


Examples, Test Cases
------------------------------------------
Example 1:
Input: nums = [1,2,3,1]
- Integer 1 is duplicated
Output: true

Example 2:
Input: nums = [1,2,3,4]
- All integers unique
Output: false

Example 3:
Input: nums = [1,1,1,3,3,4,3,2,4,2]
- Multiple duplicates: 1, 2, 3, 4
Output: true

Data Structure
------------------------------------------
Use an object to record the counts of characters seen as we iterate over the
array.

Algorithm
------------------------------------------
Approach 1: Tracking number occurrence counts in an Object
- Time: O(N). 1 traveral.
- Space: O(N). Object can have as many properties as the input array.
- Iterate over the numbers in the array.
  - Track the count of occurrences of that number
  - If a count ever reaches 2, a duplicate exists. Return true.
- If iteration completes, there are no duplicates. Return false.

Approach 2: Tracking numbers seen, using a Set
- Time: O(N). 1 traversal.
- Space: O(N). Set can have as many elements as the input array.
- Convert the input array into a unique Set.
- Iterate through the numbers in the input array
  - Check if the set already contains the current number. If so, we've
    encountered a duplicate. Return true.
  - If the set DOES NOT contain the number, add the number to the set.
- If iteration completes, there are no duplicates. Return false.

Approach 3: Using the uniqueness of a Set
- Time: ??? Unsure of JS implementation details.
- Space: O(N). Set can have as many elements as the input array.
- Convert the input array into a unique Set.
- If the size of the set is smaller than the length of the input array, then one
  or more duplicates were removed during the creation of the set. Return true.
- If the sizes are equal, return false.
*/

'use strict';

// Approach 1: Tracking number occurrence counts in an Object
function containsDuplicate(nums) {
  let counts = {};

  for (let num of nums) {
    if (!counts[num]) counts[num] = 0;
    counts[num] += 1;

    if (counts[num] > 1) return true;
  }

  return false;
}

console.log(containsDuplicate([]) === false);
console.log(containsDuplicate([1]) === false);
console.log(containsDuplicate([1, 2, 3, 1]) === true);
console.log(containsDuplicate([1, 2, 3, 4]) === false);
console.log(containsDuplicate([1, 1, 1, 3, 3, 4, 3, 2, 4, 2]) === true);

// Approach 2: Tracking numbers seen, using a Set
function containsDuplicate3(nums) {
  const numsSeen = new Set();

  for (const num of nums) {
    if (numsSeen.has(num)) return true;
    numsSeen.add(num);
  }

  return false;
}

console.log(containsDuplicate3([]) === false);
console.log(containsDuplicate3([1]) === false);
console.log(containsDuplicate3([1, 2, 3, 1]) === true);
console.log(containsDuplicate3([1, 2, 3, 4]) === false);
console.log(containsDuplicate3([1, 1, 1, 3, 3, 4, 3, 2, 4, 2]) === true);

// Approach 3: Using the uniqueness of a Set
function containsDuplicate2(nums) {
  const set = new Set(nums);
  return set.size < nums.length;
}

console.log(containsDuplicate2([]) === false);
console.log(containsDuplicate2([1]) === false);
console.log(containsDuplicate2([1, 2, 3, 1]) === true);
console.log(containsDuplicate2([1, 2, 3, 4]) === false);
console.log(containsDuplicate2([1, 1, 1, 3, 3, 4, 3, 2, 4, 2]) === true);
