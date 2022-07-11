/*
Range Extraction
https://www.codewars.com/kata/51ba717bb08c1cd60f00002f/train/javascript

Problem
------------------------------------------
A format for expressing an ordered list of integers is to use a comma separated
list of either
- individual integers
- or a range of integers denoted by the starting integer separated from the end
  integer in the range by a dash, '-'. The range includes all integers in the
  interval including both endpoints. It is not considered a range unless it
  spans at least 3 numbers. For example "12,13,15-17"
  Complete the solution so that it takes a list of integers in increasing order
  and returns a correctly formatted string in the range format.

Inputs: 1 array of integers
Outputs: 1 string, with ranges represented in the specified format

Rules, Requirements, Definitions
- No spaces in the output string
- Ranges are 3+ integers
- Neg, zero, pos integers are valid input

Clarifying Questions
-

Edge Cases
- Empty array? Possible.
- Non-integer? No.
- Missing argument? No.


Examples, Test Cases
------------------------------------------
solution([-10, -9, -8, -6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15,
          17, 18, 19, 20]);
// returns "-10--8,-6,-3-1,3-5,7-11,14,15,17-20"

Data Structure
------------------------------------------
Arrays for holding temporary ranges

Algorithm
------------------------------------------
- Initialize a result array
- Initialize a holding array
- Iterate through the input array, tracking numbers and indices.
  - Add current num to holding array.
  - If num + 1 === next num, continue iterating.
  - Else, the range is over.
    - Use helper function to add string representation of holding array to
      result array.
  - Clear the holding array.

Helper function: Convert range array to string
  - If the holding array length is < 3, return the string representation of
    its elements (comma-separated).
  - If the length > 3, return the string representation of the holding array.
    Format: First and last num, separated by dash.
*/

'use strict';

function formatRangeString(nums) {
  if (nums.length < 3) {
    return nums.join(',');
  } else {
    return `${nums[0]}-${nums[nums.length - 1]}`;
  }
}

// console.log(formatRangeString([1, 2]));
// console.log(formatRangeString([1, 2, 3, 4]));
// console.log(formatRangeString([-3, -2, -1, 0, 1, 2, 3, 4]));

function formatRanges(nums) {
  let result = [];
  let holding = [];

  for (let [idx, num] of nums.entries()) {
    holding.push(num);
    if (nums[idx + 1] === num + 1) {
      continue;
    } else {
      result.push(formatRangeString(holding));
      holding = [];
    }
  }
  return result.join(',');
}

console.log(formatRanges([])); // ''
console.log(formatRanges([1])); // '1'

console.log(
  formatRanges([
    -10, -9, -8, -6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18,
    19, 20,
  ])
);
// "-10--8,-6,-3-1,3-5,7-11,14,15,17-20"
console.log(
  formatRanges([
    -6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18, 19, 20,
  ])
);
// "-6,-3-1,3-5,7-11,14,15,17-20"
