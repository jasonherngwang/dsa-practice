/*
Valid Anagram
https://leetcode.com/problems/valid-anagram/

Problem
------------------------------------------
Given two strings s and t, return true if t is an anagram of s, and false
otherwise.

An Anagram is a word or phrase formed by rearranging the letters of a different
word or phrase, typically using all the original letters exactly once.

Inputs: 2 strings, `s` and `t`
- All lowercase English letters
Outputs: Boolean
- true if letters of `s` can be rearranged to form `t`
- false if not

Rules, Requirements, Definitions
- All original letters must be used once. Cannot add or remove letters from the
  set.
- Strings lengths are the same.


Clarifying Questions
-

Edge Cases
- Empty string input? Possible.
- Missing arguments? No.
- Non-string data type? No.


Examples, Test Cases
------------------------------------------
Example 1:
Input: s = "anagram", t = "nagaram"
Output: true

Example 2:
Input: s = "rat", t = "car"
- Did not use 't'
- Added 'c' to the letter set
Output: false

Data Structure
------------------------------------------
Use object to track character counts.

Algorithm
------------------------------------------
Let `s` have M letters. Let `t` have N letters.

Guard clause: If lengths are not equal, return false.

Approach 1: Keeping track of letter counts
Time: O(M + N). Single traversal of `s` and `t`.
Space: O(M). Only storing chars of `s` in the object.
- Iterate through chars of `s`, tracking character count in an object.
- Iterate through chars of `t`:
  - Access property using char as key.
    - If undefined, this char does not exists in `s`. Return false.
      - WARNING: Number 0 is falsey. Explicity check for undefined.
    - If not undefined:
      - If current count is 1, delete the property.
      - If current count > 1, decrement it by 1.
- If `s` and `t` use the same chars, the object should be empty.
  - Retrieve an array of the object's keys. If its length is 0, return true,
    else false.

Approach 2: Sort both strings and check if equal
Time: O(N log N) for quicksort and/or insertion sort, depending on V8.
Space: O(M + N). Two new arrays with lengths M and N, respectively.
- Split each string into array of chars.
- Sort and join back into string.
- Check if equal.

Approach 3: Counting characters. For 26 letter alphabet only.
- Create an alphabet array of size 26, with all initialized to 0.
- Iterate over the chars in `s`.
  - Find the character code, e.g 98 for 'b'.
  - Subtract 97 from the code. This returns the array index for the letter.
  - Increment the count at the array position.
- Join all values of the array into a string, using an arbitrary separator such
  as ','. This is the key for all anagrams containing the same character
  counts.
  - The separator is needed since if we have adjacent letters with the same
    digits, e.g. 1+11 vs 11+1, the keys will not be distinct.
- Perform the same operation for `t`.
- Compare the keys for the two strings.

*/

'use strict';

// Approach 1: Keeping track of letter counts
function isAnagram(s, t) {
  if (s.length !== t.length) return false;

  let counts = {};

  for (let char of s) {
    if (!counts[char]) counts[char] = 0;
    counts[char] += 1;
  }

  for (let char of t) {
    if (counts[char] === undefined) return false;
    if (counts[char] === 1) {
      delete counts[char];
    } else {
      counts[char] -= 1;
    }
  }

  return Object.keys(counts).length === 0;
}

console.log(isAnagram('', '') === true);
console.log(isAnagram('', 'a') === false);
console.log(isAnagram('a', '') === false);
console.log(isAnagram('anagram', 'nagaram') === true);
console.log(isAnagram('rat', 'cat') === false);
console.log(isAnagram('aaabb', 'aabbb') === false);

// Approach 2: Sort both strings and check if equal
function isAnagram2(s, t) {
  if (s.length !== t.length) return false;
  return [...s].sort().join('') === [...t].sort().join('');
}

console.log(isAnagram2('', '') === true);
console.log(isAnagram2('', 'a') === false);
console.log(isAnagram2('a', '') === false);
console.log(isAnagram2('anagram', 'nagaram') === true);
console.log(isAnagram2('rat', 'cat') === false);
console.log(isAnagram2('aaabb', 'aabbb') === false);
console.log(isAnagram2('aaabb', 'aabbbccccd') === false);

// Approach 3: Counting characters.
function charCountKey(str) {
  const LOWERCASE_A = 'a'.charCodeAt();
  let counts = Array(26).fill(0);
  for (let char of str) {
    let alphabetIndex = char.charCodeAt() - LOWERCASE_A;
    counts[alphabetIndex] += 1;
  }
  return counts.join(',');
}

console.log(charCountKey(''));
console.log(charCountKey('a'));
console.log(charCountKey('abc'));
console.log(charCountKey('abcdefghijklmnopqrstuvwxyz'));

function isAnagram3(s, t) {
  return charCountKey(s) === charCountKey(t);
}

console.log(isAnagram3('', '') === true);
console.log(isAnagram3('', 'a') === false);
console.log(isAnagram3('a', '') === false);
console.log(isAnagram3('anagram', 'nagaram') === true);
console.log(isAnagram3('rat', 'cat') === false);
console.log(isAnagram3('aaabb', 'aabbb') === false);
console.log(isAnagram3('aaabb', 'aabbbccccd') === false);
