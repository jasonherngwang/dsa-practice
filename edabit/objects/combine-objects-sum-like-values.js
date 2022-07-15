/*
Combine Two Objects Into One, Summing Like Values
https://edabit.com/challenge/JyebLWZjCv5jYhrBW

Problem
------------------------------------------
Take two objects with similar key values and combine them into a new object
summing any values that belong to the same category.

Inputs: Two objects with some of the same property names, some different.
- May or may not have the same number of properties.
- May not have any shared property names.
- May have all shared property names.
Outputs: 1 object with all data combined.
- For property names that are the same, the values are combined.
- Properties must be ordered by value lowest to highest.

Rules, Requirements, Definitions
-


Clarifying Questions
- How to order if two values are the same. Either one can come first.

Edge Cases
- 1 object has no properties. The result will only contain data from the other
  object.
- Both object empty? Return empty object.


Examples, Test Cases
------------------------------------------
const user1 = {
  powerPlant: 70000,
  rental: 12000
}

const user2 = {
  teaching: 40000,
  rental: 10000
}

becomes ➞ {
  powerPlant: 70000,
  teaching: 40000,
  rental: 22000   // The rental income is added together.
}

Data Structure
------------------------------------------
Input: Objects
Intermediate: May use array for iteration and sorting
Output: Object

Algorithm
------------------------------------------
- Shallow copy 1st input object.
- Convert 2nd input object to nested array containing object properties.
- Iterate over array:
  - Check if each "key" (1st elem in array) is a key in the object.
    - If so, modify the value in the object to be the sum of itself and the
      "value" (2nd elem) in the array.
    - If not, create a new property in the object using the key and value from
      the array.
- Convert merged data object into nested array.
- Sort by second element (the value), ascending.
- Convert nested array back to object.
- Return resulting object.
*/

'use strict';

function combine(user1Income, user2Income) {
  let result = Object.assign({}, user1Income);
  let user2Arr = Object.entries(user2Income);
  user2Arr.forEach(([key, value]) => {
    result[key] = (result[key] || 0) + value;
  });
  let resultArr = Object.entries(result);
  resultArr.sort((a, b) => a[1] - b[1]);
  return Object.fromEntries(resultArr);
}

const test1User1Income = {
  softwareDeveloping: 70000,
  rental: 10000,
};

const test1User2Income = {
  teaching: 40000,
  rental: 12000,
};

console.log(combine(test1User1Income, test1User2Income));
// const test1Answer = {
//   rental: 22000,
//   teaching: 40000,
//   softwareDeveloping: 70000,
// };

const test2User1Income = {
  softwareDeveloping: 70000,
  pizzaDeliverying: 6000,
  rental: 10000,
};

const test2User2Income = {
  teaching: 40000,
  rental: 12000,
};

console.log(combine(test2User1Income, test2User2Income));
// const test2Answer = {
//   pizzaDeliverying: 6000,
//   rental: 22000,
//   teaching: 40000,
//   softwareDeveloping: 70000,
// };

const test3User1Income = {
  softwareDeveloping: 70000,
  pizzaDeliverying: 6000,
  sellingGarlic: 6000,
  rental: 10000,
};

const test3User2Income = {
  rental: 12000,
  sellingGarlic: 32000,
};

console.log(combine(test3User1Income, test3User2Income));
// const test3Answer = {
//   pizzaDeliverying: 6000,
//   rental: 22000,
//   sellingGarlic: 38000,
//   softwareDeveloping: 70000,
// };
