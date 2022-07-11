/*
Strings Mix
https://www.codewars.com/kata/5629db57620258aa9d000014

Problem
------------------------------------------
Write a function to visualize differences in strings, with regards to counts of
lowercase letters (a-z).

Differences are represented in the format:
"1:aaaa/2:bbb/=:c"
Where:
- "1" indicates that string 1 has more occurrences of "a"
- ":" is a separator
- "aaaa" indicates that string 1 had 4 occurrences
- "/" is a separator
- "=" indicates that both strings had the same count, which is 1

Inputs: 2 strings, s1 and s1
- Can contain any type of character.
Outputs: 1 string, the visualized differences in lowercase letter counts
between the two input strings

Rules, Requirements, Definitions
- Sorting Order:
  - By count
  - If counts are the same, sort lexicographically ascending (a-z)
- Only counts > 1 are considered when creating the output string.


Clarifying Questions
-

Edge Cases
- No lowercase letters in one string? All the counts will be for the other
  string.
- No lowercase letters at all? Return empty string.
- Empty input strings? Return empty string.


Examples, Test Cases
------------------------------------------
s1="Are the kids at home? aaaaa fffff"
s2="Yes they are here! aaaaa fffff"
mix(s1, s2) --> "=:aaaaaa/2:eeeee/=:fffff/1:tt/2:rr/=:hh"


Data Structure
------------------------------------------
Use object to track counts.

Algorithm
------------------------------------------
- Create empty result array.
- Create two objects (frequency maps) to track the lowercase letter counts.
  (helper function)
  { 'a': 5, ... }
- Creating frequency maps for both strings.
- Iterate over the two frequency maps, comparing letter by letter.
  - If one count is higher, append this array to the result array:
    [7, 'a', "7:aaaaa"]
  - If both counts are the same:
    [42, 'a', "=:aaaaa"]
- Sort array
  - If count of a > count of b, return -1
  - If count of a < count of b, return 1
  - Sort starts starting with "=" after strings starting with numbers.
  - If counts equal:
    - If a < b letter lexicographically (number and string), return -1
    - If a > b letter lexicographically (number and string), return 1
- Join array into string, using separator "/".
- Return result string.
*/

'use strict';

function lowercaseCharCount(string) {
  let counts = {};
  for (const char of string) {
    if (/[a-z]/.test(char)) {
      counts[char] = (counts[char] || 0) + 1;
    }
  }
  return counts;
}

// console.log(lowercaseCharCount('yes, they are here'));

function mix(string1, string2) {
  let result = [];
  let charCounts1 = lowercaseCharCount(string1);
  let charCounts2 = lowercaseCharCount(string2);
  for (let [char, count] of Object.entries(charCounts1)) {
    if (count > 1) {
      if (char in charCounts2) {
        if (count > charCounts2[char]) {
          result.push('1:' + char.repeat(count));
        } else if (count < charCounts2[char]) {
          result.push('2:' + char.repeat(charCounts2[char]));
        } else {
          result.push('=:' + char.repeat(count));
        }
      } else {
        result.push('1:' + char.repeat(count));
      }
    }
  }
  for (let [char, count] of Object.entries(charCounts2)) {
    if (count > 1) {
      if (!(char in charCounts1) || charCounts1[char] <= 1) {
        result.push('2:' + char.repeat(count));
      }
    }
  }
  result.sort((a, b) => b.length - a.length || (a > b ? 1 : -1));
  return result.join('/');
}

console.log(mix('Are they here', 'yes, they are here')); // '2:eeeee/2:yy/=:hh/=:rr'
console.log(mix('looping is fun but dangerous', 'less dangerous than coding'));
// '1:ooo/1:uuu/2:sss/=:nnn/1:ii/2:aa/2:dd/2:ee/=:gg'
console.log(mix(' In many languages', " there's a pair of functions"));
// '1:aaa/1:nnn/1:gg/2:ee/2:ff/2:ii/2:oo/2:rr/2:ss/2:tt'
console.log(mix('Lords of the Fallen', 'gamekult')); // '1:ee/1:ll/1:oo'
console.log(mix('codewars', 'codewars')); // ''
console.log(mix('A generation must confront the looming ', 'codewarrs'));
// '1:nnnnn/1:ooooo/1:tttt/1:eee/1:gg/1:ii/1:mm/=:rr'
