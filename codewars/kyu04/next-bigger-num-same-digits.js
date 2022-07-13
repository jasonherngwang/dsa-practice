/*
Next bigger number with the same digits
https://www.codewars.com/kata/55983863da40caa2c900004e/train/javascript

Problem
------------------------------------------
Create a function that takes a positive integer and returns the next bigger
number that can be formed by rearranging its digits. For example:

Inputs: 1 positive integer
Outputs: 1 positive integer, larger than the input, which uses the same digits
- If not possible, return -1

Rules, Requirements, Definitions
- Largest possible digit is the digits arranged in descending order.
- "Not possible" means the digits are already in descending order


Clarifying Questions
-

Edge Cases
-


Examples, Test Cases
------------------------------------------
12 => 21
513 => 531
2017 => 2071
414 => 441
144 => 414

Data Structure
------------------------------------------
Could use array to hold digit strings.

Algorithm (INCORRECT)
------------------------------------------
- Guard clause: If < 10 return -1. No digits to be swapped.
- Iterate from 2nd-to-last to first digit.
  - Iterate through all digits to the right of the current digit
    - Find the smallest digit that is larger. If any are found:
      - Swap with the current digit and return the number.
- Return -1.

*/

'use strict';

function nextBigger(num) {
  if (num < 10) return -1;

  let digits = [...String(num)].map(Number);
  for (let i = digits.length - 2; i >= 0; i -= 1) {
    let smallestDigitToRight = Infinity;
    let smallestDigitIndex;
    for (let j = i + 1; j < digits.length; j += 1) {
      if (digits[j] < smallestDigitToRight) {
        smallestDigitToRight = digits[j];
        smallestDigitIndex = j;
      }
    }
    console.log(smallestDigitToRight, smallestDigitIndex);
    console.log(digits);
    if (smallestDigitToRight > digits[i]) {
      [digits[i], digits[smallestDigitIndex]] = [
        digits[smallestDigitIndex],
        digits[i],
      ];
      console.log(digits);
      return Number(digits.join(''));
    }
  }
  return -1;
}

console.log(nextBigger(12)); // 21
console.log(nextBigger(513)); // 531
console.log(nextBigger(2017)); // 2071
console.log(nextBigger(414)); // 441
console.log(nextBigger(144)); // 414
console.log(nextBigger(1234567980)); //
console.log(nextBigger(920886)); //
