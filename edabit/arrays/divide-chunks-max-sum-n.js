/*
5:11pm - 5:35pm
https://edabit.com/challenge/RaxaX4wmKKCsrzKwJ
Problem
Write a function that divides an array into chunks such that the sum of each chunk is <= n. Start from the left side of the array and move to the right.

Inputs:
- 1 array with integers
  - Can be neg, 0, or pos
  - No fractions, special number (NaN, Infinity, etc.)
- 1 integer `n`, the max sum of each group
Outputs:
1 nested array, where the subarrays are groups of element and have a sum of <= n

Rules, Requirements, Definitions
- The max element of the array will always be smaller than or equal to n.
- Use the greedy approach when solving the problem (e.g. fit as many elements you can into a chunk as long as you satisfy the sum constraint).
  - If zero is an element, its' consumed by the previous group.
- The elements cannot be rearranged when forming groups.
  - Reading left to right in the output, should read the same as in the input.
- Minimum group size is 1 element
- Max is the entire array

General edge cases
- Non-integer element? No
- Non-number data type element? No.
- Missing argument? No.
- Too many arguments? Only consider the first.


Examples, Test Cases

// Generic cases
console.log(divide([1, 2, 3, 4, 1, 0, 2, 2], 5));
// [[1, 2], [3], [4, 1, 0], [2, 2]]

console.log(divide([1, 0, 1, 1, -1, 0, 0], 1));
// [[1, 0], [1], [1, -1, 0, 0]]

console.log(divide([2, 1, 0, -1, 0, 0, 2, 1, 3], 3));
// [[2, 1, 0, -1, 0, 0], [2, 1], [3]]

console.log(divide([7, 7, 7], 7));
// [[7], [7], [7]]

console.log(divide([1], 3));
// [[1]]

console.log(divide([1], 999999));
// [[1]]

Edge Cases
// Empty input array
console.log(divide([], 3));
// [[]]

// The entire array can form 1 group
console.log(divide([1, 1, 1], 3));
// [[1]]

console.log(divide([1, -1, 1, -1, 1, -1, 1], 3));
// [[1, -1, 1, -1, 1, -1, 1]]

console.log(divide([-1, -2, -3], 1));
// [[-1, -2, -3]]


Data Structure
Input: array
Intermediate: Pushing arrays into other arrays
Output: Nested array

Algorithm
Iterate over elements, accumulating numbers in a holding array until they are > n, and pushing them into the result array.

Steps
- Initialize empty result array.
- Initialize empty holding array.
- Iterate over elements in input array:
  - Push element into holding array.
  - Check if holding array sum + next element in the input array > n.
    - When retrieving next element, use logical OR to default to 0, if `undefined` is returned
    - If so
      - Push holding array into result array.
      - Clear holding array by reassigning to [].
    - If not
      - Continue iterating.
- If holding array is NOT empty, push to result array.
- Return result array.

console.log(divide([1, 2, 3, 4, 1, 0, 2, 2], 5));
// [[1, 2], [3], [4, 1, 0], [2, 2]]

Input: [1, 2, 3, 4, 1, 0, 2, 2]
n = 5
Holding: [2, 2] 
Result: [1, 2, 3, 4, 1, 0, 2, 2]
*/

function divide(nums, n) {
  let result = [];
  let holding = [];

  nums.forEach((num, idx) => {
    holding.push(num);

    let sum = holding.reduce((sum, number) => sum + number);
    let nextNum = nums[idx + 1] === undefined ? 0 : nums[idx + 1];

    if (sum + nextNum > n) {
      result.push(holding);
      holding = [];
    }
  });

  if (holding.length > 0) result.push(holding);

  return result;
}

// Generic cases
console.log(divide([1, 2, 3, 4, 1, 0, 2, 2], 5));
// [[1, 2], [3], [4, 1, 0], [2, 2]]

console.log(divide([1, 0, 1, 1, -1, 0, 0], 1));
// [[1, 0], [1], [1, -1, 0, 0]]

console.log(divide([2, 1, 0, -1, 0, 0, 2, 1, 3], 3));
// [[2, 1, 0, -1, 0, 0], [2, 1], [3]]

console.log(divide([7, 7, 7], 7));
// [[7], [7], [7]]

console.log(divide([1], 3));
// [[1]]

console.log(divide([1], 999999));
// [[1]]

// Edge Cases
// Empty input array
console.log(divide([], 3));
// [[]]

// The entire array can form 1 group
console.log(divide([1, 1, 1], 3));
// [[1, 1, 1]]

console.log(divide([1, -1, 1, -1, 1, -1, 1], 3));
// [[1, -1, 1, -1, 1, -1, 1]]

console.log(divide([-1, -2, -3], 1));
// [[-1, -2, -3]]
