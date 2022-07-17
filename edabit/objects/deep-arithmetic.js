/*
Deep Arithmetic
https://edabit.com/challenge/E8WcotHKRGfYodchW

Problem
------------------------------------------
Write a function that takes an array of strings of arbitrary dimensionality
([], [][], [][][], etc.) and returns the sum of every separate number in each
string in the array.

Inputs: 1 array of potentially multiple data types
- Could be string
- Could be array (possibly nested) of strings.
Outputs: Sum of separate numbers in the strings.
- "Separate" means there is one or more non-chars between numbers.

Rules, Requirements, Definitions
- Numbers in strings can be negative, but will all be base-10 integers.
- Negative numbers may directly follow another number.
- The hyphen or minus character ("-") does not only occur in numbers.
- Arrays may be ragged or empty.


Clarifying Questions
-

Edge Cases
-


Examples, Test Cases
------------------------------------------
sum(["1", "five", "2wenty", "thr33"]) ➞ 36
1 + 2 + 33 = 36

sum([["1X2", "t3n"],["1024", "5", "64"]]) ➞ 1099
1 + 2 + 3 + 1024 + 5 + 64 = 1099

sum([[["1"], "10v3"], ["738h"], [["s0"], ["1mu4ch3"],"-1s0"]]) ➞ 759
1 + 10 + 3 + 738 + 0 + 1 + 4 + 3 + -1 + 0 = 759

[[["0", "0x2", "z3r1"],["1", "55a46"]],[["1", "0b2", "4"],["0x5fp-2", "nine", "09"],["4", "4", "4"]],[["03"]], []]
=> 142

[[[[[[[[[[[[[[[["-1", "1"], ["3"], [""], []]]]]]]]]]]]]]]]
-1 + 1 + 3
=> 3

[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]
=> 0

[[[[[["-32-64", "a-zA-Z"], ["01-1"]]]]]]
-32 + -64 + 01 + -1
=> -96


Data Structure
------------------------------------------
Use arrays to hold individual strings and numbers

Algorithm
------------------------------------------
Helper function: Splitting a string into elements that are numbers.
- Use regex to match (- or nothing)[0-9]
  /(|-)[0-9]+/g

Helper function> Flatten nested array to 1D array.
- Recursion
- Base case: Element is not an Array data type
- Transform input array. For each element:
  - Recursively call function on each element.

Steps
- Flatten all arrays to top level.
- Transform input strings to arrays of number strings.
- Transform each number string to a number.
- Sum all numbers.

*/

'use strict';

function flattenNestedArray(arr) {
  let array = arr.slice();

  while (array.some((elem) => Array.isArray(elem))) {
    // console.log(array);
    for (let index = 0; index < array.length; index += 1) {
      if (Array.isArray(array[index])) {
        array.splice(index, 1, ...array[index].flat());
      }
    }
  }

  return array;
}

function stringToNums(string) {
  let numStrings = string.match(/(|-)[0-9]+/g) || [];
  return numStrings.map(Number);
}

function sum(arr) {
  arr = flattenNestedArray(arr);
  if (arr.length === 0) return 0;
  let nums = arr.map(stringToNums).flat();
  return nums.reduce((sum, num) => sum + num);
}

console.log(sum(['1', 'five', '2wenty', 'thr33'])); // 36

console.log(
  sum([
    ['1X2', 't3n'],
    ['1024', '5', '64'],
  ])
); // 1099

console.log(sum([[['1'], '10v3'], ['738h'], [['s0'], ['1mu4ch3'], '-1s0']]));
// 759

console.log(
  sum([
    [
      ['0', '0x2', 'z3r1'],
      ['1', '55a46'],
    ],
    [
      ['1', '0b2', '4'],
      ['0x5fp-2', 'nine', '09'],
      ['4', '4', '4'],
    ],
    [['03']],
    [],
  ])
);
// 142

console.log(sum([[[[[[[[[[[[[[[['-1', '1'], ['3'], [''], []]]]]]]]]]]]]]]]));
// 3

console.log(sum([[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]));
// 0

console.log(sum([[[[[['-32-64', 'a-zA-Z'], ['01-1']]]]]]));
// -96
