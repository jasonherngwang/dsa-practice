/*
Rotate String
https://leetcode.com/problems/rotate-string/

Problem
------------------------------------------
Given two strings s and goal, return true if and only if s can become goal after
some number of shifts on s.

A shift on s consists of moving the leftmost character of s to the rightmost
position.

For example, if s = "abcde", then it will be "bcdea" after one shift.

Inputs:
- 1 string, the starting string
- 1 string, the goal
- Both string min length 1
- Lowercase English letters only. No spaces, punctuation, special characters.
Outputs: true or false

Rules, Requirements, Definitions
- "Shift" means rotating the first character to the last position.


Clarifying Questions
-

Edge Cases
- Both string have length 1 => Return true
- Different string lengths => Return false
- Both strings null => Return false


Examples, Test Cases
------------------------------------------
'abcde', 'cdeab'
Shift twice

Data Structure
------------------------------------------
Use array to store string chars.

Algorithm
------------------------------------------
Approach 1: Keep rotating until equal (or not)
Time: Up to O(N^2).
- Iterate up to N times, performing an O(N) slice operation on each iteration.
Space: O(1)

Helper function: Rotate string
Time: O(N) for slice()
- Concat index 1 onward, with first char.

Main algorithm
- Perform as many times as the length of the string.
  - If s === goal, return true
  - Else, rotate string.
- Return false

Approach 2: Check if goal in s + s
s + s includes all rotations of s.
'abc' has rotations 'abc', 'bca', 'cab'
'abcabc' contains all of these.

*/

'use strict';

function rotate(str) {
  return str.slice(1) + str[0];
}

// console.log(rotate('abcde')); // 'bcdea'

function rotateString(s, goal) {
  let counter = s.length;
  while (counter > 0) {
    if (s === goal) {
      return true;
    } else {
      s = rotate(s);
    }
    counter -= 1;
  }
  return false;
}

console.log(rotateString('abcde', 'cdeab')); // true
console.log(rotateString('abcde', 'abced')); // false
console.log(rotateString('a', 'a')); // true
console.log(rotateString('ab', 'ab')); // true
console.log(rotateString('ab', 'ba')); // true
console.log(rotateString('aaaaa', 'aaaaa')); // true
console.log(rotateString('aaabbb', 'bbbaaa')); // true
console.log(rotateString('aaacbbb', 'bbbcaaa')); // false

// Approach 2: Check if goal in s + s
function rotateString2(s, goal) {
  return (s + s).includes(goal);
}

console.log(rotateString2('abcde', 'cdeab')); // true
console.log(rotateString2('abcde', 'abced')); // false
console.log(rotateString2('a', 'a')); // true
console.log(rotateString2('ab', 'ab')); // true
console.log(rotateString2('ab', 'ba')); // true
console.log(rotateString2('aaaaa', 'aaaaa')); // true
console.log(rotateString2('aaabbb', 'bbbaaa')); // true
console.log(rotateString2('aaacbbb', 'bbbcaaa')); // false
