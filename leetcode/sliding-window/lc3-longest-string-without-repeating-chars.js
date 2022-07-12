/*
Longest Substring Without Repeating Characters
https://leetcode.com/problems/longest-substring-without-repeating-characters/

Problem
------------------------------------------
Given a string s, find the length of the longest substring without repeating
characters.

Inputs: 1 string
- Can be empty string
Outputs: 1 string, the longest substring w/o repeating chars

Rules, Requirements, Definitions
- Substring means chars must be contiguous. Cannot skip chars in between.


Clarifying Questions
-

Edge Cases
- Empty string => Return 0


Examples, Test Cases
------------------------------------------
Input: 'abcabcbb'
Longest substring w/o repeating chars: 'abc'
Output: 3

Input: 'pwwkew'
Longest: 'wke'
Output: 3

Data Structure
------------------------------------------
Use hash to track char counts.

Algorithm
------------------------------------------
Sliding window: Expand until duplicate is found (char count is 2), then start
over at the index of the last char examined.

Time: O(N)
- Up to 2N since both left and right pointers may traverse the entire string.
Space: O(N) for size of set.

Steps
- Initialize maxLength to 0.
- Initialize empty hash map, charCounts.
- Initialize windowStart to index 0.

- Iterate windowEnd from index 0 to end of string:
  - Retrieve char at index windowEnd.
  - Check if windowEndChar is a key in the hash map.
    - If not, add windowEndChar to hash map with count 1.
  - If so, retrieve its count. If count > 1 (or any other number K), need to
    shrink window until the count is < K.
    - While the map has windowEndChar with a count > K:
      - Retrieve the char at windowStart
      - Retrieve the count of that char from the hash map
      - Decrement the count by 1. If already 1, delete it so it won't show up
        when we check if it is a key.
      - Increment windowStart by 1.
  - Set maxLength to larger of itself and the window end - start + 1.
- Return maxLength
*/

'use strict';

function lengthOfLongestSubstring(s) {
  let maxLength = 0;
  let freqMap = new Map();
  let windowStart = 0;

  for (let windowEnd = 0; windowEnd < s.length; windowEnd += 1) {
    let windowEndChar = s[windowEnd];

    if (!freqMap.has(windowEndChar)) freqMap.set(windowEndChar, 0);
    freqMap.set(windowEndChar, freqMap.get(windowEndChar) + 1);

    while (freqMap.get(windowEndChar) > 1) {
      let windowStartChar = s[windowStart];
      freqMap.set(windowStartChar, freqMap.get(windowStartChar) - 1);
      if (freqMap.get(windowStartChar) === 0) freqMap.delete(windowStartChar);
      windowStart += 1;
    }

    const windowLength = windowEnd - windowStart + 1;
    maxLength = Math.max(maxLength, windowLength);
  }

  return maxLength;
}

console.log(lengthOfLongestSubstring('abcabcbb')); // 3
console.log(lengthOfLongestSubstring('bbbbb')); // 1
console.log(lengthOfLongestSubstring('pwwkew')); // 3
console.log(lengthOfLongestSubstring('dvdf')); // 3
console.log(lengthOfLongestSubstring('a')); // 1
console.log(lengthOfLongestSubstring('')); // 0
