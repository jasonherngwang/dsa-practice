/*
Longest Consecutive Sequence
https://leetcode.com/problems/longest-consecutive-sequence/

Problem
------------------------------------------
Given an unsorted array of integers nums, return the length of the longest 
consecutive elements sequence.

You must write an algorithm that runs in O(n) time.

Inputs: 1 unsorted array of integers
- Neg, 0, pos integers OK
Outputs:1 integer, the length of the longest consecutive sequence.

Rules, Requirements, Definitions
- We determine consecutive sequence as if we were sorting the array first. The
  numbers do not have to be located at adjacent indices in the input array.
  - We cannot use built-in sort function because that is O(N log N).

Clarifying Questions
- Can there be duplicates? Yes.
  - If so, does the presence of the duplicate affect the length? No, by
    "longest" we mean numerically, not the number of elements. Duplicates are
    essentially ignored.

Edge Cases
- Input can be empty? Yes. Return 0.
- Is [-1,0,1] a consecutive sequence? Yes.
- What if we have multiple sequences of the same length? Return a number
  representing their common length.


Examples, Test Cases
------------------------------------------
Input: [100,4,200,1,3,2]
Sorted: [1,2,3,4,100,200]
Sequences: [1,2,3,4], [100,200]
Output: 4

Data Structure
------------------------------------------
Using a Set would remove duplicates

Algorithm
------------------------------------------
How can we immediately associate a single element with a set, whether it's a
member of the set, or adjacent to either end by 1?

O(N) means we can only make a few traversals over the data set.

Approach 1: Use a set. Find starts of sequences, and capture sequence.
Time: O(N)
- O(N) to create the set.
- O(N) to traverse the array
- O(N) because we traverse a TOTAL of N elements while traversing through each
  of the individual sequences.

Steps
- Convert array to set.
- Initialize variable longestSeq to 0, to track longest sequence
- Iterate over set.
  - Find sequence start by checking if current number - 1 is NOT in the set.
    - Keep incrementing by 1 until the next number is NOT in the set. This marks
      the end of the set.
      - Calculate the length of the set using the start and end.
      - Keep whichever is greater of this new length, and the previous best.
- Return longestSeq
*/

'use strict';

const longestConsecutive = function(nums) {
  if (nums.length === 0) return 0;
  
  let set = new Set(nums);
  let longestSeq = 0;
  
  for (let num of nums) {
    if (!set.has(num - 1)) {
      let nextNum = num + 1;
      while (set.has(nextNum)) {
        nextNum += 1;
      }
      longestSeq = Math.max(longestSeq, nextNum - num); 
    }
  }
  
  return longestSeq;
}

console.log(longestConsecutive([100,4,200,1,3,2])); // 4
console.log(longestConsecutive([0,3,7,2,5,8,4,6,0,1])); // 9