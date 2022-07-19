/*
Single Letter Swaps
https://edabit.com/challenge/xukQmQoGopXbQMdZj

Problem
------------------------------------------
Given an array of strings and an original string, write a function to output an
array of boolean values - true if the word can be formed from the original word
by swapping two letters only once and false otherwise.

Inputs:
- Array of strings
- 1 target string
  - Will consist of unique characters.
Outputs: Array of booleans
- true if a pair of letters in string can be swapped to form the target string.
- false otherwise

Rules, Requirements, Definitions
- If word has different length than target, return false.
- If word has different characters than target, return false.
- If word takes more than 1 swap to become target, return false.
- Must swap letters at two different indices.
- Must perform 1 swap. Cannot leave input word alone.


Edge Cases
- Empty string for word in array: Only true if target is also empty string.
- Empty string for target word: Only true if word in array is also empty.
- Characters can be letters (either case), numbers, space, punctuation, special
characters, etc.


Examples, Test Cases
------------------------------------------
validateSwaps(["BACDE", "EBCDA", "BCDEA", "ACBED"], "ABCDE")
➞ [true, true, false, false]

// Swap "A" and "B" from "ABCDE" to get "BACDE".
// Swap "A" and "E" from "ABCDE" to get "EBCDA".
// Both "BCDEA" and "ACBED" cannot be formed from "ABCDE" using only a single
// swap.

validateSwaps(["32145", "12354", "15342", "12543"], "12345")
➞ [true, true, true, true]

validateSwaps(["9786", "9788", "97865", "7689"], "9768")
➞ [true, false, false, false]

// Different chars
validateSwaps(["124"], "123")
// [false]

// A swap is required.
validateSwaps(["123"], "123")
// [false]

// Empty strings return false
validateSwaps([""], "")
// [false]

// Different lengths
validateSwaps(["1234", "12"], "123")
// [false, false]

// Case sensitivity
validateSwaps(["bac", "BAC"], "ABC")
// [false, true]

Data Structure
------------------------------------------
Use hash table or array to track character positions.

Algorithm
------------------------------------------
Helper function: Check if 1 input word can become a target word, using 1 swap.
Use two pointers iterating over 2 strings at the same index.
- A mismatch is if the char at index in str1 is not the same as the char at
  index in str2.
- Initialize a counter
  - For every mismatch found, increment counter by 1.
- Return true if number of mismatches is 2, otherwise false.

Guard clause
- If strings are different lengths, return false.
- If strings don't have same chars, return false.

Main function
- Transform input array from strings to booleans, using the helper function.

*/

'use strict';

function charCount(str) {
  return [...str].reduce((counts, char) => {
    counts[char] = (counts[char] || 0) + 1;
    return counts;
  }, {});
}

// console.log(charCount('ABCDE'));
// console.log(charCount('ABCCC'));

function sameChars(str1, str2) {
  // Same length
  if (str1.length !== str2.length) return false;

  // Same chars
  let counts1 = charCount(str1);
  let counts2 = charCount(str2);

  let matches = Object.entries(counts1).map(
    ([char, count]) => count === counts2[char]
  );

  return matches.every((bool) => bool === true);
}

// console.log(sameChars('abcde', 'abcde')); // true
// console.log(sameChars('abcde', 'abcdf')); // false
// console.log(sameChars('abcde', 'abcdef')); // false

function swappableToWord(word, target) {
  if (!sameChars(word, target)) return false;
  let counter = 0;
  for (let i = 0; i < word.length; i += 1) {
    if (word[i] !== target[i]) counter += 1;
  }
  return counter === 2;
}

// console.log(swappableToWord('ABCDE', 'ABCDE'));
// console.log(swappableToWord('BACDE', 'ABCDE'));
// console.log(swappableToWord('CAEBD', 'ABCDE'));

function validateSwaps(arr, str) {
  return arr.map((word) => swappableToWord(word, str));
}

console.log(validateSwaps(['BACDE', 'EBCDA', 'BCDEA', 'ACBED'], 'ABCDE'));
// [true, true, false, false]

console.log(validateSwaps(['32145', '12354', '15342', '12543'], '12345'));
// [true, true, true, true]

console.log(validateSwaps(['9786', '9788', '97865', '7689'], '9768'));
// [true, false, false, false]

// Different chars
console.log(validateSwaps(['124'], '123'));
// [false]

// A swap is required.
console.log(validateSwaps(['123'], '123'));
// [false]

// Empty strings return false
console.log(validateSwaps([''], ''));
// [false]

// Different lengths
console.log(validateSwaps(['1234', '12'], '123'));
// [false, false]

// Case sensitivity
console.log(validateSwaps(['bac', 'BAC'], 'ABC'));
// [false, true]
