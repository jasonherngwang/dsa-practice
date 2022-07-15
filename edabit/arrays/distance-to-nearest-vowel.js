/*
Distance to Nearest Vowel
https://edabit.com/challenge/b9FBAhxaijR9fzxgo

Problem
------------------------------------------
Write a function that takes in a string and for each character, returns the
distance to the nearest vowel in the string. If the character is a vowel itself,
return 0.

Inputs: 1 string of lowercase letters
- Contains at least 1 vowel
Outputs: 1 array the same length as the string
- Array elements are non-negative integers, the distance from the character in
  that index to the nearest vowel in the string.
- For vowels the integer will be 0.

Rules, Requirements, Definitions
-


Clarifying Questions
- No punctuation, uppercase letters, special characters.

Edge Cases
- Empty string? No.
- Single character? Possible. Will be a single vowel.


Examples, Test Cases
------------------------------------------
babbb
 v
10123

Data Structure
------------------------------------------
Arrays for abstractions


Algorithm
------------------------------------------
- Split string into array of chars.
- Transform array into booleans: true if vowel, false if not
  - Can use regex /[aeiou]/i
  - Can use helper function
- Initialize empty result array
- Transform boolean array
  - Access value from boolean array, using same index.
  - If true (is vowel), transform element to 0.
  - If false (not vowel):
    - Set 2 pointers (left and right) to current index
    - Initialize variable `distance` to 1
    - While true
      - If left > 0, decrement left by 1
      - If right < string length - 1, increment right by 1
      - Retrieve value of left and right index from boolean array.
        - If either is true, transform element to distance.
      - Increment distance by 1
- Return transformed array of distances
*/

'use strict';

function distanceToNearestVowel(str) {
  let chars = [...str];
  let booleanArr = chars.map((char) => /[aeiou]/i.test(char));

  return booleanArr.map((b, idx, array) => {
    if (b) return 0; // is a vowel

    // search for vowel
    let left = idx;
    let right = idx;
    let distance = 1;

    while (true) {
      if (left > 0) left -= 1;
      if (right < array.length - 1) right += 1;
      if (array[left] || array[right]) return distance;
      distance += 1;
    }
  });
}

console.log(distanceToNearestVowel('a')); // [0]
console.log(distanceToNearestVowel('aaaaa')); // [0, 0, 0, 0, 0])
console.log(distanceToNearestVowel('bba')); // [2, 1, 0])
console.log(distanceToNearestVowel('abbb')); // [0, 1, 2, 3])
console.log(distanceToNearestVowel('abab')); // [0, 1, 0, 1])
console.log(distanceToNearestVowel('babbb')); // [1, 0, 1, 2, 3])
console.log(distanceToNearestVowel('baaab')); // [1, 0, 0, 0, 1])
console.log(distanceToNearestVowel('abcdabcd')); // [0, 1, 2, 1, 0, 1, 2, 3])
console.log(distanceToNearestVowel('abbaaaaba')); // [0, 1, 1, 0, 0, 0, 0, 1, 0])
console.log(distanceToNearestVowel('treesandflowers')); // [2, 1, 0, 0, 1, 0, 1, 2, 2, 1, 0, 1, 0, 1, 2])
console.log(distanceToNearestVowel('pokerface')); // [1, 0, 1, 0, 1, 1, 0, 1, 0])
console.log(distanceToNearestVowel('beautiful')); // [1, 0, 0, 0, 1, 0, 1, 0, 1])
console.log(distanceToNearestVowel('rythmandblues')); // [5, 4, 3, 2, 1, 0, 1, 2, 2, 1, 0, 0, 1])
console.log(distanceToNearestVowel('shopper')); // [2, 1, 0, 1, 1, 0, 1])
console.log(distanceToNearestVowel('singingintherain')); // [1, 0, 1, 1, 0, 1, 1, 0, 1, 2, 1, 0, 1, 0, 0, 1])
console.log(distanceToNearestVowel('sugarandspice')); // [1, 0, 1, 0, 1, 0, 1, 2, 2, 1, 0, 1, 0])
console.log(distanceToNearestVowel('totally')); // [1, 0, 1, 0, 1, 2, 3])
