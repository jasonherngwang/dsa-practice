/*
Column With Maximum Sum
https://edabit.com/challenge/X47SKhYan6mATPfhA

Problem
------------------------------------------
Given an array of numbers and a value for n, split the numbers into n-sized
groups. If we imagine that these groups are stacked on top of each other
(see below), return the column number that has the greatest sum. If two or
more columns have the same sum, return the one with the smallest column number.

Examples, Test Cases
------------------------------------------
nums = [4, 14, 12, 7, 14, 16, 5, 13, 7, 16, 11, 19]
n = 4

[
  [4, 14, 12,  7],
  [14, 16, 5, 13],
  [7, 16, 11, 19]
]

1, 2, 3, 4 (column)
25, 46, 28, 39 (sum)

You would return 2, as the 2nd column has the greatest sum.

Notes
- Nums will always divide into equal-length groups.
*/
/*

Inputs:
- 1 array of numbers
- 1 integer n, the number of groups
  - Array will always divide into equal-length groups
Outputs: 1 integer, the column number (1-indexed) having the greatest sum

Rules, Requirements, Definitions
- If multiple cols have same sum, return smaller col num.
- When splitting groups, don't perform any reordering.
  - Group number m is the slice of the array between and including indices
   (m - 1) * n to (m * n - 1)

Clarifying Questions
- Negative numbers and zero? Possible.

Edge Cases
- Empty array? No
- All cols have same sum? Return col num 1.


Examples, Test Cases
------------------------------------------
nums = [4, 14, 12, 7, 14, 16, 5, 13, 7, 16, 11, 19]
n = 4

[[4, 14, 12,  7],
[14, 16, 5, 13],
[7, 16, 11, 19]]

// 1, 2, 3, 4 (column)
// 25, 46, 28, 39 (sum)

Data Structure
------------------------------------------
Use arrays to hold groups and result.

Algorithm
------------------------------------------
- Divide input array length by n to determine the number of groups, numGroups.
- Split the input array into numGroups subarrays.
- Convert this array into an array of n subarrays, each representing a column.
- Initialize variables to track max encountered sum and associated col num.
- Iterate through these columns, tracking the index and element
- If element is greater than the stored value, replace it and the index.
  - Do not replace if the element is equal, since we want to keep the lower num.
- Return col num + 1 (1-indexed)
*/

'use strict';

function colWithMaxSum(array, n) {
  const numGroups = array.length / n;
  let groups = [];
  let startIndex = 0;

  let colSums = [];
  let maxSum = -Infinity;
  let maxSumCol;

  for (let groupNum = 0; groupNum < numGroups; groupNum += 1) {
    groups.push(array.slice(startIndex, startIndex + n));
    startIndex += n;
  }

  for (let i = 0; i < n; i += 1) {
    let col = [];
    for (let j = 0; j < groups.length; j += 1) {
      col.push(groups[j][i]);
    }
    colSums.push(col);
  }

  colSums = colSums.map((col) => col.reduce((sum, num) => sum + num));

  colSums.forEach((colSum, index) => {
    if (colSum > maxSum) {
      maxSum = colSum;
      maxSumCol = index;
    }
  });

  return maxSumCol + 1;
}

console.log(colWithMaxSum([14, 9, 19, 6, 13, 13, 3, 2, 12], 3)); // 3
console.log(colWithMaxSum([1, 13, 15, 5, 16, 1, 4, 9, 20], 3)); // 2
console.log(colWithMaxSum([15, 4, 6, 10, 6, 4], 2)); // 1
console.log(
  colWithMaxSum([7, 9, 13, 16, 17, 1, 10, 6, 3, 19, 6, 10, 8, 18, 20, 4], 8)
); // 7
console.log(
  colWithMaxSum([4, 18, 14, 16, 7, 7, 20, 14, 9, 4, 8, 16, 1, 12, 18, 13], 2)
); // 2
console.log(colWithMaxSum([5, 7, 2, 12, 20, 7, 1, 12, 8, 7, 12, 8], 3)); // 2
console.log(colWithMaxSum([18, 16, 6, 4, 18, 20, 9, 8, 1, 14, 20, 16], 4)); // 2
console.log(colWithMaxSum([5, 4, 20, 8, 8, 18], 2)); // 1
console.log(colWithMaxSum([2, 9, 12, 9, 17, 6, 8, 9, 8, 18, 2, 4], 2)); // 2
console.log(colWithMaxSum([15, 2, 16, 19, 3, 1, 15, 13, 19, 16, 2, 16], 3)); // 1
console.log(
  colWithMaxSum([4, 6, 18, 13, 19, 2, 7, 13, 19, 16, 12, 20, 17, 12, 4, 7], 8)
); // 5
console.log(colWithMaxSum([10, 8, 6, 2, 2, 2, 18, 17, 17, 20, 17, 17], 6)); // 1
console.log(
  colWithMaxSum([3, 9, 14, 7, 6, 13, 9, 10, 1, 5, 10, 17, 16, 6, 3, 18], 4)
); // 4
console.log(colWithMaxSum([2, 7, 8, 17, 15, 3], 3)); // 2
console.log(colWithMaxSum([8, 8, 6, 4, 8, 16, 4, 16, 18, 20, 20, 7], 2)); // 2
console.log(colWithMaxSum([19, 15, 1, 10, 2, 8], 6)); // 1
console.log(colWithMaxSum([5, 20, 8, 3, 5, 15], 3)); // 2
console.log(colWithMaxSum([10, 12, 15, 14, 17, 4, 18, 12, 17, 18, 18, 12], 4)); // 3
console.log(colWithMaxSum([5, 9, 12, 12, 7], 5)); // 3
console.log(colWithMaxSum([3, 18, 8, 15, 9, 15, 12, 8, 11, 5, 10, 8], 6)); // 2
