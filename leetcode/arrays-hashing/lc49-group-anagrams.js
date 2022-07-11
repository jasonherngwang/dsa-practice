/*
Group Anagrams
https://leetcode.com/problems/group-anagrams/

Problem
------------------------------------------
Given an array of strings strs, group the anagrams together. You can return the
answer in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different
word or phrase, typically using all the original letters exactly once.

Inputs: Array of strings
- Lowercase English letters only.
Outputs: Nested array, where each subarray contains anagrams grouped from the
input array

Rules, Requirements, Definitions
- Strings can be empty
- Array will not be empty

"Anagrams" are words with the same letters
- Identical words are anagrams

Clarifying Questions
-

Edge Cases
-


Examples, Test Cases
------------------------------------------
Example 1:
Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]

Example 2:
Input: strs = [""]
Output: [[""]]

Example 3:
Input: strs = ["a"]
Output: [["a"]]

Data Structure
------------------------------------------


Algorithm
------------------------------------------
Approach 1: Sort each string and add to appropriate group in hash table as we
traverse the array of strings.
Time: Assume N elements, and longest string has length K
- Sorting the longest string takes O(K log K).
- Sorting all strings takes O(N * K * log K)
Space: Hash table (object) stores N strings of up to length K. O(N*K).
Steps
- Initialize empty object to store the result.
- Iterate through array of strings:
  - Sort the characters in the string.
  - If this sorted string is a key in the result object, append the string
    (unsorted) to the array that is the property value associated with that
    object.
  - If not, create a new property:
    - Key: sorted string
    - Value: Array containing the current (unsorted) string
- Convert object into array by extracting all the values

Approach 2: Similar to Approach 1, but using char count to generate key, instead
of the sorted form of the string
Time: O(N*K). For each of N strings, we iterate over up to K chars to create the
char count key.
Space: O(N*K). Similar hash table as Approach 1.

Helper function
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
- Return the key

Steps
- Initialize empty result object
- Iterate through array of strings
  - Generate char count key using helper method.
  - If char count key is a key in the result object, add current string to the
    array that is the property value.
  - If char count key not a key in the result object
    - Create a new property
      - Key: char count key
      - Value: Array containing the current string
- Convert object into array by extracting all the values

Approach 3 (TOO SLOW; FAILS LEETCODE)
Create helper function to check if 2 words are anagrams.

Time: O(N^2). Comparing each string with potentially every other string. Worst
case is if each string belongs to its own group.
Space: O(N)
- Initialize result array
- Iterate through strings in input array.
  - Iterate through subarrays of result array
    - Take one string from the subarray, and check if it and the current string
      are anagrams. If so, add the current string to that subarray, and exit
      the iteration.
  - If the current string did not belong to any of the existing anagram groups,
    create a new group (new array) with the current string, and push this array
    on the result array.
    - Use a flag to determine if a group was found or not.


*/

'use strict';

// Approach 1: Use sorted string as key
function groupAnagrams(strs) {
  let groups = {};
  strs.forEach((string) => {
    let sortedString = [...string].sort().join('');
    if (sortedString in groups) {
      groups[sortedString].push(string);
    } else {
      groups[sortedString] = [string];
    }
  });
  return Object.values(groups);
}

console.log(groupAnagrams([''])); // [['']]
console.log(groupAnagrams(['a'])); // [['a']]
console.log(groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']));
// [["bat"],["nat","tan"],["ate","eat","tea"]]

// Approach 2: Use char count as key
function charCountKey(str) {
  const LOWERCASE_A = 'a'.charCodeAt();
  let counts = Array(26).fill(0);
  for (let char of str) {
    let alphabetIndex = char.charCodeAt() - LOWERCASE_A;
    counts[alphabetIndex] += 1;
  }
  return counts.join(',');
}

function groupAnagrams2(strs) {
  let groups = {};
  strs.forEach((string) => {
    let countKey = charCountKey(string);
    if (countKey in groups) {
      groups[countKey].push(string);
    } else {
      groups[countKey] = [string];
    }
  });
  return Object.values(groups);
}

console.log(groupAnagrams2([''])); // [['']]
console.log(groupAnagrams2(['a'])); // [['a']]
console.log(groupAnagrams2(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']));
// [["bat"],["nat","tan"],["ate","eat","tea"]]

// Approach 3
function groupAnagrams3(strs) {
  let result = [];

  strs.forEach((str) => {
    let foundGroup = false;

    for (let group of result) {
      if (isAnagram(group[0], str)) {
        group.push(str);
        foundGroup = true;
        break;
      }
    }
    if (!foundGroup) result.push([str]);
  });

  return result;
}

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

console.log(groupAnagrams3([''])); // [['']]
console.log(groupAnagrams3(['a'])); // [['a']]
console.log(groupAnagrams3(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']));
// [["bat"],["nat","tan"],["ate","eat","tea"]]
