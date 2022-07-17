/*
Almost Palindrome Sieve
https://edabit.com/challenge/xPnZKhYcn5TwK3HFT

Problem
------------------------------------------
Write a function that takes in an array of integers and returns the integers
that are either palindromes or almost-palindromes. An almost-palindrome is any
integer that can be rearranged to form a palindrome.

For example, the numbers 677 and 338 are both almost-palindromes, since they can
be rearranged to form 767 and 383, respectively.

Inputs: 1 array of integers
Outputs: 1 array, the input array filtered to palindromes and almost palindromes

Rules, Requirements, Definitions
- Palindrome: Sequence of digits that is equal to its reverse.
  - Single digits are palindromes.
  - At most 1 digit/character has an odd count. All others must have even count.
- Almost palindrome: Sequence of digits that can be rearranged to form a
  palindrome.


Clarifying Questions
-

Edge Cases
- Negative values? If so, use absolute value.
- Zero? Possible.


Examples, Test Cases
------------------------------------------
palindromeSieve([443, 12, 639, 121, 3232]) ➞ [443, 121, 3232]
// Since 443 => 434; 121 is a palindrome; 3232 => 2332 or 3223

palindromeSieve([5, 55, 6655, 8787]) ➞ [5, 55, 6655, 8787]
// Single-digit numbers are automatically palindromes.

palindromeSieve([897, 89, 23, 54, 6197, 53342]) ➞ []

Data Structure
------------------------------------------
Turn integer into array of digits so we can count them.

Algorithm
------------------------------------------
- Take absolute value of number, to account for negatives.
- Split into array of digits
- Create frequency map.
- Filter frequency map counts to odd values only.
- Check that length is <= 1.

*/

'use strict';
function frequencyMap(array) {
  let freqMap = {};
  array.forEach((elem) => (freqMap[elem] = (freqMap[elem] || 0) + 1));
  return freqMap;
}

function isAlmostPalindrome(string) {
  let freqMap = frequencyMap([...string]);
  return Object.values(freqMap).filter((count) => count % 2 === 1).length <= 1;
}

function palindromeSieve(nums) {
  return nums.filter((num) => isAlmostPalindrome(String(num)));
}

console.log(palindromeSieve([443, 12, 639, 121, 3232])); // [443, 121, 3232]
// Since 443 => 434; 121 is a palindrome; 3232 => 2332 or 3223

console.log(palindromeSieve([5, 55, 6655, 8787])); // [5, 55, 6655, 8787]
// Single-digit numbers are automatically palindromes.

console.log(palindromeSieve([897, 89, 23, 54, 6197, 53342])); // []

console.log(palindromeSieve([112, 334, 555, 656, 665, 444, 443, 7]));
// [112, 334, 555, 656, 665, 444, 443, 7]

console.log(palindromeSieve([1, 2, 123])); // [1, 2]

console.log(palindromeSieve([1, 2, 3])); // [1, 2, 3]

console.log(palindromeSieve([555, 687868877])); // [555, 687868877]

console.log(palindromeSieve([555, 68786887])); // [555, 68786887]

console.log(palindromeSieve([])); // []
