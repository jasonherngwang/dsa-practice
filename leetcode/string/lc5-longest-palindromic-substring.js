/*
Longest Palindromic Substring
https://leetcode.com/problems/longest-palindromic-substring/

Problem
------------------------------------------
Given a string s, return the longest palindromic substring in s.

Inputs: 1 string
- Min length 1 char.
- Chars can be digits and English letters.
Outputs: 1 string, the longest palindromic substring

Rules, Requirements, Definitions
- "Palindrome" is a string that is equal to its reverse.
- Can have even or odd num of chars.
  - If odd, mirrors around 1 char.
  - If even, mirrors around 2 chars (which are the same).
- Substring can be located anywhere in the string, not necessarily its center.


Clarifying Questions
-

Edge Cases
- 1 char -> Itself is the palindrome.


Examples, Test Cases
------------------------------------------
babad => bab, aba
cbbd => bb

Data Structure
------------------------------------------
String

Algorithm
------------------------------------------
Time: O(N^2)
- 1 traversal O(N)
- At each index, expand up to the entire width of the string.
  Do this twice: odd and even.

Guard clauses
- If length 1 return itself.

Expand around center
- Given the location of a single character, or pair of characters, since a
  palindrome mirrors around the center, expand until the edges are no longer
  the same character
Steps
- Initialize variable to hold longest palindromic substring.
Mirror across 1 char
- Iterate over indices of input string:
  - Assign left and right pointers to this index.
  - Use helper function to find longest palindrome expanding around this center.
Mirror across 2 chars
- Iterate over indices 0 to input string length - 2:
  - Assign left pointers to index, right pointer to index + 1.
  - Use helper function to find longest palindrome expanding around this center.
- Replace result substring with either of these two substrings if larger.
- Return max length

Helper function: Expand around center
Arguments: string, left, right
- While left >= 0 and right <= string length - 1:
  - While left char === right char:
    - Decrement left by 1. Increment right by 1.
- We've gone 1 index past the ends. Return substring from left+1 to right-1,
  inclusive.
*/

'use strict';

function palindromeAt(str, left, right) {
  while (left >= 0 && right < str.length && str[left] === str[right]) {
    left -= 1;
    right += 1;
  }
  return str.slice(left + 1, right);
}

// console.log(palindromeAt('abcba', 2, 2)); // 'abcba'
// console.log(palindromeAt('abcba', 1, 1)); // 'b'
// console.log(palindromeAt('abcba', 2, 3)); // ''

function longestPalindrome(str) {
  let result = '';

  for (let i = 0; i < str.length; i += 1) {
    let oddResult = palindromeAt(str, i, i);
    let evenResult = palindromeAt(str, i, i + 1);
    result = oddResult.length > result.length ? oddResult : result;
    result = evenResult.length > result.length ? evenResult : result;
  }

  return result;
}

console.log(longestPalindrome('babad')); // 'bab'
console.log(longestPalindrome('cbbd')); // 'bb'
