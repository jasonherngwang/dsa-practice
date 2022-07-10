/*
Top K Frequent Elements
https://leetcode.com/problems/top-k-frequent-elements/

Problem
------------------------------------------
Given an integer array nums and an integer k, return the k most frequent
elements. You may return the answer in any order.

Inputs:
- 1 array of integers, `nums`
- 1 integer, `k`
  - 1 <= k <= number of elements in array `nums`
Outputs:

Rules, Requirements, Definitions
"k most frequent elements": Unique elements that appear the most times in the
array


Clarifying Questions
-

Edge Cases
- Empty input array? No.
- Incorrect data type? No.
- Missing arguments? No.

Examples, Test Cases
------------------------------------------
Example 1:
Input: nums = [1,1,1,2,2,3], k = 2
- 1 appears 3x
- 2 appears 2x
- 3 appears 1x
- Most frequent elements are 1 and 2
Output: [1, 2], [2, 1]

Example 2:
Input: nums = [1], k = 1
- 1 appears 1x
- Most frequent element is 1
Output: [1]

Example 3: More than k numbers have the same frequency
Input: nums = [1, 2, 3], k = 2
Valid Outputs: [1, 2], [2, 1], [1, 3], [3, 1], [2, 3], [3, 2]

Data Structure
------------------------------------------
Hash table to track element counts

Algorithm
------------------------------------------
Approach 1: Store counts in hash; sort and slice.
Time: O(N log N)
- O(N) for traversal to create counts hash.
- O(N log N) to sort.
Space: O(N)
- O(N) for counts hash table.
- O(N) for nested array.
Steps:
- Initialize empty object to track element counts.
- Iterate over elements in input array. O(N).
  - Store element counts as entries in object:
    - Key: element
    - Value: count of occurrences
- Convert object to nested array in the form [[element1, count1], ...]
- Sort elements by count, descending. O(N log N).
- Slice first `k` elements.
- Extract element values into an array, and return.


Approach 2: Modified Bucket Sort
Bucket sort, original
Normally we create an array with index 0 to max(inputArray). If the inputArray
values are not consecutive, there will be empty slots in the array.
- Doesn't help with "top K" sorting.
- Array is unbounded if we have large numbers. Space complexity may be > O(N).

Bucket sort, modified
Time: O(N)
- O(N) to create counts hash table (frequency map).
- O(N) to traverse hash table and create bucket sort array.
- O(k) to traverse bucket sort array and select top K.
Space: O(N)
- O(N) for counts hashtable.
- O(N) for bucket sort array.
Steps:
- Create array with size N + 1:
  - Index (0 to N) represents the element count.
  - Value: Array of elements (numbers).
    - Multiple numbers can share the same count. They are stored in the array.
    - Worst case: Input array has N distinct elements. Then index 1 has an array
      containing all the elements.
    - Index 0 is unused since no element will have 0 count.
- Iterate from highest count to lowest count (since we want top K).
  - Add first k values encountered to the result array.


Approach 3: Quickselect
- Iterate over the elements in the array, creating a frequency map.
- Use the quicksort partition algorithm to partition the array, using a pivot
  - The value to use for partitioning is not the number, but the count from the
    frequency map.
  - After partitioning:
    - All elements to the right of the pivot occur more frequently than the
      pivot.
    - All elements to the left of the pivot occur less frequently than the
      pivot.
  - We are interested in the top K elements, so check if the pivot index is
    N - k.
      - If so, then the pivot element and all elements to the right constitute
        the top K most frequent elements.
      - If not, then the pivot is not in the right place. Choose the side with
        > K element,and continue pivoting recursively.


Approach 4: Max heap. Pop k times.
Time: O(K log N)


*/

'use strict';

// Approach 1: Store counts in hash; sort and slice.
function topKFrequent(nums, k) {
  let counts = {};

  nums.forEach((num) => {
    if (num in counts) {
      counts[num] += 1;
    } else {
      counts[num] = 1;
    }
  });

  counts = Object.entries(counts);
  counts.sort((a, b) => b[1] - a[1]);

  let topKElems = counts.slice(0, k);
  return topKElems.map(([num, _]) => parseInt(num, 10));
}

// console.log(topKFrequent([], 1)); // []
// console.log(topKFrequent([1], 1)); // [1]
// console.log(topKFrequent([1, 1, 1, 2, 2, 3], 2)); // [1, 2] (in any order)
// console.log(topKFrequent([1, 1, 1, 2, 2, 3], 3)); // [1, 2, 3] (in any order)
// console.log(topKFrequent([1, 2, 3], 2));
// // [1, 2], [1, 3], [2, 3] (any of these, in any order)
// console.log(topKFrequent2([4, 1, -1, 2, -1, 2, 3], 2)); // [-1, 2]

// Approach 2: Modified Bucket Sort
function frequencyMap(array) {
  let freqMap = new Map();

  array.forEach((elem) => {
    let currentCount = freqMap.get(elem) || 0;
    freqMap.set(elem, currentCount + 1);
  });

  return freqMap;
}

function topKFrequent2(nums, k) {
  let freqMap = frequencyMap(nums);
  let bucketArray = [];
  let result = [];

  for (const [num, freq] of freqMap) {
    let currentSet = bucketArray[freq] || new Set();
    bucketArray[freq] = currentSet.add(num);
  }

  for (let index = bucketArray.length - 1; index >= 0; index -= 1) {
    let elems = bucketArray[index];
    if (elems) {
      for (let elem of elems) {
        result.push(elem);
        if (result.length === k) return result;
      }
    }
  }

  return result; // Needed if input array is empty.
}

console.log(topKFrequent2([], 1)); // []
console.log(topKFrequent2([1], 1)); // [1]
console.log(topKFrequent2([1, 1, 1, 2, 2, 3], 2)); // [1, 2] (in any order)
console.log(topKFrequent2([1, 1, 1, 2, 2, 3], 3)); // [1, 2, 3] (in any order)
console.log(topKFrequent2([1, 2, 3], 2));
// [1, 2], [1, 3], [2, 3] (any of these, in any order)
console.log(topKFrequent2([4, 1, -1, 2, -1, 2, 3], 2)); // [-1, 2]
