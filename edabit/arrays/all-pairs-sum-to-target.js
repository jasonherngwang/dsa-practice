/*
All Pairs that Sum to Target
https://edabit.com/challenge/KYeCAfYxsvomapQg2

Problem
Create a function that returns all pairs of numbers in an array that sum to a target. Sort the pairs in ascending order with respect to the smaller number, then order each pair in this order: [smaller, larger].

Inputs:
- 1 array of numbers
  - Integers: negative, 0, or positive
  - No special numbers, e.g. NaN, Infinity, -Infinity, -0
  - No fractions
- 1 number, the target
  - Integer: negative, 0, positive
Outputs: 1 array
- If no pairs are found, return an empty array [].
- If 1+ pairs found, return nested array
  - Each subarray has two numbers that sum to the target.
  - Each subarray is ordered from smaller to larger.
- Ordered in ascending order, based on on first (smaller) number.

Rules, Requirements, Definitions
- You are only allowed to use each number once in a pair.

Questions
- Duplicate numbers in array? Yes
- Unique answer? E.g. [1, 2, 2, 1], target = 3 where either of the 1's can be paired with either of the 2's
- Missing or too many arguments? No.
- Incorrect data type? No.

Examples, Test Cases

// Generic cases
console.log(allPairs([2, 4, 5, 3], 7)); // [[2, 5], [3, 4]]
// 2 + 5 = 7, 3 + 4 = 7

console.log(allPairs([5, 3, 9, 2, 1], 3)); // [[1, 2]]

console.log(allPairs([4, 5, 1, 3, 6, 8], 9)); // [[1, 8], [3, 6], [4, 5]]
// Sorted: 1 < 3 < 4; each pair is ordered [smaller, larger]

// Zero
console.log(allPairs([0, 4, 5, -1], -1)); // [[-1, 0]]

// Negative numbers
console.log(allPairs([2, -2, 5, -5], 0)); // [[-5, 5], [-2, 2]]

// Edge Cases
// No pairs found
console.log(allPairs([4, 5, 1, 3, 6, 8], 999)); // []

// Duplicates
console.log(allPairs([4, 4, 3, 5], 8)); // [[3, 5], [4, 4]]

// Multiple combinations and duplicates
console.log(allPairs([1, 2, 2, 1], 3)); // [[1, 2], [1, 2]]

// Empty input array
console.log(allPairs([], 3)); // []


Data Structure
Input: Array
Intermediate: Array to hold pairs
Output: Nested array

Algorithm
- Shallow copy input array
- While array length > 1:
  - Pop last number.
  - Search through remaining array for its complement. Find its index.
  - If exists, splice that element, join it with the current number, and append to result array.
  - If not, continue to next iteration.
- Sort result array.
*/

function allPairs(array, target) {
  let result = [];
  let arrCopy = array.slice();

  while (arrCopy.length > 1) {
    let num = arrCopy.pop();
    let complement = target - num;
    let complementIndex = arrCopy.indexOf(complement);

    if (complementIndex !== -1) {
      let pair = num <= complement ? [num, complement] : [complement, num];
      result.push(pair);
      arrCopy.splice(complementIndex, 1);
    }
  }

  return result.sort((a, b) => a[0] - b[0]);
}

// Generic cases
console.log(allPairs([2, 4, 5, 3], 7)); // [[2, 5], [3, 4]]
// 2 + 5 = 7, 3 + 4 = 7

console.log(allPairs([5, 3, 9, 2, 1], 3)); // [[1, 2]]

console.log(allPairs([4, 5, 1, 3, 6, 8], 9)); // [[1, 8], [3, 6], [4, 5]]
// Sorted: 1 < 3 < 4; each pair is ordered [smaller, larger]

console.log(allPairs([8, 7, 2, 4, 6], 14)); // [[6, 8]]
console.log(allPairs([1, 3, 5, 4, 0, 2, 2], 4)); // [[0, 4], [1, 3], [2, 2]]

// Zero
console.log(allPairs([0, 4, 5, -1], -1)); // [[-1, 0]]

// Negative numbers
console.log(allPairs([2, -2, 5, -5], 0)); // [[-5, 5], [-2, 2]]

// Edge Cases
// No pairs found
console.log(allPairs([4, 5, 1, 3, 6, 8], 999)); // []

// Duplicates
console.log(allPairs([4, 4, 3, 5], 8)); // [[3, 5], [4, 4]]

// Multiple combinations and duplicates
console.log(allPairs([1, 2, 2, 1], 3)); // [[1, 2], [1, 2]]

// Empty input array
console.log(allPairs([], 3)); // []
