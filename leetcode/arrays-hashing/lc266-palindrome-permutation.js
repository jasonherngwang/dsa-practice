/*
Palindrome Permutation
https://leetcode.com/problems/palindrome-permutation/

Problem
------------------------------------------
Given a string s, return true if a permutation of the string could form a
palindrome.

Inputs: 1 string of at least 1 character
- Lowercase English letters only. No space, punctuation, special chars, etc.
Outputs: true or false

Rules, Requirements, Definitions
- A "palindrome" is the same as its reverse.
- When we tally up character counts, at most 1 character can have an odd count.

Clarifying Questions
-

Edge Cases
- Empty string? Not valid input.
- 1-character string? Is palindrome.
- 2-character string? Is palindrome if both are the same character.


Examples, Test Cases
------------------------------------------
Example 1:
Input: s = "code"
Output: false

Example 2:
Input: s = "aab"
Output: true

Example 3:
Input: s = "carerac"
Output: true

Data Structure
------------------------------------------
Use hash table to store char counts.

Algorithm
------------------------------------------
Approach 1: Using hash table
Time: O(N) for creating the hash table and iterating over it.
Space: O(N) for hash table.

Steps
- Create a frequency map of the characters. O(N)
- Iterate over the values of the freq map. O(N)
  - Keep track of the number of odd counts. If > 1, return false.
- Return true.

Approach 2: Using set
Time: O(N) for 1 traversal.
Space: O(N) for set

Steps
- Create empty set.
- Iterate over chars
  - If char in set, delete it.
  - If char not in set, add it.
  - Result is:
    - Odd count: Char stays in set
    - Even count: Char is deleted
- If set size is <= 1, return true. Otherwise false.
*/

'use strict';

// Approach 1: Using hash table
function frequencyMap(str) {
  let freqMap = {};
  [...str].forEach((char) => (freqMap[char] = (freqMap[char] || 0) + 1));
  return freqMap;
}

function canPermutePalindrome(s) {
  let charCounts = frequencyMap(s);
  let oddCount = 0;
  for (let count of Object.values(charCounts)) {
    if (count % 2 === 1) oddCount += 1;
    if (oddCount > 1) return false;
  }
  return true;
}

console.log(canPermutePalindrome('a')); // true
console.log(canPermutePalindrome('code')); // false
console.log(canPermutePalindrome('aab')); // true
console.log(canPermutePalindrome('carerac')); // true

// Approach 2: Using set
function canPermutePalindrome2(s) {
  let set = new Set();

  [...s].forEach((char) => {
    if (set.has(char)) {
      set.delete(char);
    } else {
      set.add(char);
    }
  });

  return set.size <= 1;
}

console.log(canPermutePalindrome2('a')); // true
console.log(canPermutePalindrome2('code')); // false
console.log(canPermutePalindrome2('aab')); // true
console.log(canPermutePalindrome2('carerac')); // true
