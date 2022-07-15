/*
Majority Element
https://leetcode.com/problems/majority-element/

Problem
------------------------------------------
Given an array nums of size n, return the majority element.

The majority element is the element that appears more than ⌊n / 2⌋ times.
You may assume that the majority element always exists in the array.

Inputs: Array of numbers
- Will contain at least 1 element.
Outputs: 1 numbers, the element that appears more than n/2 (integer division)
times

Rules, Requirements, Definitions
- Will always be one majority element.
- There can only be 1 majority element.


Clarifying Questions
- Data types? Could be any primitive.

Edge Cases
- Empty array? No.
- Array length 1? Majority element is the single element.
- Array length 2? Both must be the same value, if a majority element is
  guaranteed to be present.


Examples, Test Cases
------------------------------------------
[3,2,3]
n = 3
n/2 = 1 => Majority element must appear more than 1 time, so at least 2 times.
Majority element is the number 3.

Data Structure
------------------------------------------
Array
Possible hash table to store counts

Algorithm
------------------------------------------
Approach 1: Frequency Map
Time: O(N) for 2 traversals
- 1 traversal to create frequency map
- 1 traversal to find desired element in frequency map
Space: O(N) for hash table
Create frequency map. Select the key that has a count > n/2.

Further exploration: How to get O(N) time and O(1) space?
Time: O(N)
- Can't sort: O(N log N)
Space: O(1)
- 2 pointers takes up O(1) space.
- Set takes up O(N) space.
- Hash of counts takes up O(N) space.
We know the minimum number of occurrences we need. We need to track element
count until we hit this number.
Can we store max count and overwrite it? No, we don't know in advance which
element occurs the most.

Approach 2: Boyer-Moore Voting Algorithm
If we count the majority element as +1, and any other element as -1, the total
sum will be positive. However, we don't know in advance what the majority
element is.

Time: O(N) for 1 iteration.
Space: O(1) for storing candidate element and count.

Steps
- Initialize a count variable.
- Choose the first element as the candidate element.
- Iterate over elements:
  - If the score is 0, choose the current element as the candidate.
  - If the current element is the candidate, increment score by 1.
  - If the current element is NOT the candidate, decrement score by 1.
- At the end of iteration, the candidate will be the majority element.

*/

'use strict';

// Approach 1: Frequency Map
function frequencyMap(array) {
  let freqMap = {};
  array.forEach(elem => {
    freqMap[elem] = (freqMap[elem] || 0) + 1;
  })
  return freqMap;
}

function majorityElement(nums) {
  let freqMap = frequencyMap(nums);
  for (let [num, count] of Object.entries(freqMap)) {
    if (count > Math.floor(nums.length / 2)) return num;
  }
}

console.log(majorityElement([3,2,3])); // 3
console.log(majorityElement([2,2,1,1,1,2,2])); // 2
console.log(majorityElement([1,2,3,4,5,5,5,5,5])); // 5
console.log(majorityElement([1,3,5,5,5,5,5,4,2])); // 5

// Approach 2: Boyer-Moore Voting Algorithm
function majorityElement2(nums) {
  let count = 0;
  let candidate;
  nums.forEach(elem => {
    if (count === 0) candidate = elem;
    if (elem === candidate) {
      count += 1;
    } else {
      count -= 1;
    }
  })
  return candidate;
}


console.log(majorityElement2([3,2,3])); // 3
console.log(majorityElement2([2,2,1,1,1,2,2])); // 2
console.log(majorityElement2([1,2,3,4,5,5,5,5,5])); // 5
console.log(majorityElement2([1,3,5,5,5,5,5,4,2])); // 5