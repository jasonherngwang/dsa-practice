/*
Free Range
https://edabit.com/challenge/rdK3DgsTrx6jg97Ab

Problem
------------------------------------------
Create a function which converts an ordered number array into a array of ranges
(represented as strings). Note how some arrays have some numbers missing.

Inputs: Array of numbers, ordered.
Outputs: Array of strings, where ranges of consecutive numbers are
represented as a string in the form "firstNum-lastNum"

Rules, Requirements, Definitions
- If there are no numbers consecutive to a number in the array, represent it as
  only the string version of that number (see example #4).
- Return an empty array if the given array is empty.


Clarifying Questions
-

Edge Cases
- Empty array? Return empty array.
- Negative numbers and zero? Yes, these are possible inputs.
- No consecutive numbers? All numbers will be represented in their string
  format. There will be no ranges in the output.
- Entire input array is a single range? Output array will have 1 element, the
  range.
- Numbers out of order? Not possible.
- Infinity and NaN? Invalid input.
- Non-number input? Invalid input.


Examples, Test Cases
------------------------------------------
numbersToRanges([1, 2, 3, 4, 5]) ➞ ["1-5"]

numbersToRanges([3, 4, 5, 10, 11, 12]) ➞ ["3-5", "10-12"]

numbersToRanges([1, 2, 3, 4, 99, 100]) ➞ ["1-4", "99-100"]

numbersToRanges([1, 3, 4, 5, 6, 7, 8]) ➞ ["1", "3-8"]

Data Structure
------------------------------------------
Input: Array of numbers
Intermediate: May use an array to hold elements in a range.
Output: Array of strings

Algorithm
------------------------------------------
Guard clauses:
- If array empty, return [].

Main algorithm:
- Initialize empty result array.
- Initialize empty array to hold numbers while we assemble a range.
- Iterate over numbers in input array.
  - If range array not empty:
    - Retrieve its last number.
    - If current number is not consecutive with this last number, then the range
      is complete.
      - Convert the range array to a string and append it to the result array.
        Join first and last number with a dash ('-').
      - Clear the range array.
  - Append current number to the range array.
- If range array not empty, convert it to a string and append to result array.

*/

'use strict';

function rangeArrToString(arr) {
  if (arr.length === 1) return String(arr[0]);
  return [arr[0], arr[arr.length - 1]].join('-');
}
// console.log(rangeArrToString([1]));
// console.log(rangeArrToString([1, 2, 3]));

function numbersToRanges(arr) {
  if (arr.length === 0) return [];

  let result = [];
  let range = [];

  for (let num of arr) {
    if (!(range.length === 0)) {
      let lastNum = range[range.length - 1];
      if (num !== lastNum + 1) {
        result.push(rangeArrToString(range));
        range = [];
      }
    }
    range.push(num);
  }

  if (range.length > 0) result.push(rangeArrToString(range));

  return result;
}

console.log(numbersToRanges([])); // []
console.log(numbersToRanges([1, 2, 3, 4, 5])); // ["1-5"]
console.log(numbersToRanges([-1, 0, 1, 2, 3, 4, 5])); // ["-1-5"]
console.log(numbersToRanges([3, 4, 5, 10, 11, 12])); // ["3-5", "10-12"]
console.log(numbersToRanges([1, 2, 3, 4, 99, 100])); // ["1-4", "99-100"]
console.log(numbersToRanges([1, 3, 4, 5, 6, 7, 8])); // ["1", "3-8"]
console.log(numbersToRanges([1, 3, 5])); // ["1", "3", "5"]
