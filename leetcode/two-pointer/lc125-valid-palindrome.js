/*
Valid Palindrome
https://leetcode.com/problems/valid-palindrome/

Problem
------------------------------------------
Given a string s, return true if it is a palindrome, or false otherwise.

Inputs: 1 string
- Min length is 1.
- Letters (a-z, A-Z) and numbers (0-9) only.
Outputs: true if palindrome, else false

Rules, Requirements, Definitions
"Palindrome": A phrase is a palindrome if, after converting all uppercase
letters into lowercase letters and removing all non-alphanumeric characters,
it reads the same forward and backward. Alphanumeric characters include
letters and numbers.

Clarifying Questions
-

Edge Cases
- Empty string? Yes, considered a palindrome.
- 1 character? Yes, palindrome.
- 2 of the same character? Yes, palindrome.
- String with spaces? All spaces get trimmed.


Examples, Test Cases
------------------------------------------
Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome.

Data Structure
------------------------------------------
String

Algorithm
------------------------------------------
A palindrome is a mirror image across a single character or a pair of identical
characters. We can start from the ends and move to the center, checking if the
characters are the same at each step. We stop when we reach the same character,
or if we cross-over our pointers.

Time: O(N)
- Single traversal outside-in.
- Time complexity of regex global replace?
Space: O(N) since we reassigned the local variable to a string with non
alphanumerics stripped out.

Guard clause
- If length <= 1, return true;

Steps
- Downcase string.
- Remove non alphanumeric chars using regex: /[^a-z0-9]/gi
- Initialize two pointers, left and right, to first and last index.
- While `left` < `right`:
  - If the character at `left` equals the character at `right`:
    - Increment `left`.
    - Decrement `right`.
  - If not, return false.
- Return true.

Approach 2: Not using global regex
Time: O(N)
Space: O(1); we only use a few variables.
Steps
- Iterate outside-in.
- While left pointer < right
  - Increment `left` until it references an alphanumeric char.
    - Regex: /[^a-z0-9]/i
    - Must check if left is still < right, after each increment. Avoid meeting
      and crossover.
  - Decrement `right` until it references an alphanumeric char.
    - Must check if left is still < right, after each decrement.
  - If left and right char (both downcased) equal, increment left, and
    decrement right.
  - Else, return false.
- Return true.
*/

'use strict';

function isPalindrome(str) {
  str = str.toLowerCase().replace(/[^a-z0-9]/gi, '');
  if (str.length <= 1) return true;

  let left = 0;
  let right = str.length - 1;

  while (left < right) {
    if (str[left] === str[right]) {
      left += 1;
      right -= 1;
    } else {
      return false;
    }
  }
  return true;
}

// console.log(isPalindrome('A man, a plan, a canal: Panama')); // true
// console.log(isPalindrome('race a car')); // false
// console.log(isPalindrome('a')); // true
// console.log(isPalindrome('bb')); // true
// console.log(isPalindrome('abba')); // true
// console.log(isPalindrome('abba         ')); // true
// console.log(isPalindrome('ab')); // false
// console.log(isPalindrome('')); // true
// console.log(isPalindrome(' ')); // true

function isPalindrome2(str) {
  if (str.length <= 1) return true;

  let left = 0;
  let right = str.length - 1;

  while (left < right) {
    while (left < right && /[^a-z0-9]/i.test(str[left])) {
      left += 1;
    }
    while (left < right && /[^a-z0-9]/i.test(str[right])) {
      right -= 1;
    }

    if (str[left].toLowerCase() === str[right].toLowerCase()) {
      left += 1;
      right -= 1;
    } else {
      return false;
    }
  }

  return true;
}

console.log(isPalindrome2('A man, a plan, a canal: Panama')); // true
console.log(isPalindrome2('race a car')); // false
console.log(isPalindrome2('a')); // true
console.log(isPalindrome2('bb')); // true
console.log(isPalindrome2('abba')); // true
console.log(isPalindrome2('abba         ')); // true
console.log(isPalindrome2('ab')); // false
console.log(isPalindrome2('')); // true
console.log(isPalindrome2(' ')); // true
