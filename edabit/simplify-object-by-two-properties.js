/*
Simplify an Object by Two Properties
https://edabit.com/challenge/9ZZ2zGwgPfbAxQa86

Problem
------------------------------------------
Given an array of objects with 2 properties, combine identical objects into a
single object with a `count` properties.

Inputs: 1 array of objects with properties `brand` and `name`.
Outputs: 1 array of objects without duplicate objects
- Each object must have a `count` property.

Rules, Requirements, Definitions
- Array will always have 1 element.
- Each element will have the `brand` and `name` properties.
- All duplicates will be contiguous.


Clarifying Questions
-

Edge Cases
- All elements are the same, or none are the same? Possible.


Examples, Test Cases
------------------------------------------


Data Structure
------------------------------------------
Use an array to store new objects with a `count` property.

Algorithm
------------------------------------------
- Create an empty result array to store objects.
- Iterate over input array:
  - If the index is 0:
    - Shallow copy the current item object and add a count property initialized
      to 1.
    - Append this item to the result array.
  - If items's brand and name are the same as the previous item in the array:
    - Retrieve the last element in the result array, and increment its count
      by 1.
  - Else
    - Shallow copy the current item object and add a count property initialized
      to 1.
    - Append this item to the result array.
- Return the result array.

Helper method: Check if 2 objects equal
- Compare brand and name
*/

'use strict';

function objectsEqual(obj1, obj2) {
  return obj1.brand === obj2.brand && obj1.name === obj2.name;
}

// console.log(
//   objectsEqual(
//     { brand: 'NARS', name: 'Cosmetics Voyageur Pallete' },
//     { brand: 'NARS', name: 'Cosmetics Voyageur Pallete' }
//   )
// ); // true
// console.log(
//   objectsEqual(
//     { brand: 'NARS', name: 'Cosmetics Voyageur Pallete' },
//     { brand: 'Urban Decay', name: 'Naked Honey Pallete' }
//   )
// ); // false

function simplifyList(list) {
  let result = [];

  list.forEach((item, index) => {
    if (index > 0 && objectsEqual(item, list[index - 1])) {
      result[result.length - 1].count += 1;
    } else {
      let newObj = Object.assign({}, item);
      newObj.count = 1;
      result.push(newObj);
    }
  });

  return result;
}

console.log(
  simplifyList([
    { brand: 'NARS', name: 'Cosmetics Voyageur Pallete' },
    { brand: 'NARS', name: 'Cosmetics Voyageur Pallete' },
    { brand: 'Urban Decay', name: 'Naked Honey Pallete' },
    { brand: 'Stila', name: 'Stay All Day Liquid Lipstick' },
    { brand: 'Stila', name: 'Stay All Day Liquid Lipstick' },
    { brand: 'Stila', name: 'Stay All Day Liquid Lipstick' },
  ])
);
// [
//   { brand: "NARS", name: "Cosmetics Voyageur Pallete", count: 2 },
//   { brand: "Urban Decay", name: "Naked Honey Pallete", count: 1 },
//   { brand: "Stila", name: "Stay All Day Liquid Lipstick", count: 3 }
// ]

console.log(
  simplifyList([
    { brand: 'ABC', name: 'DEF' },
    { brand: 'ABC', name: 'DEF' },
    { brand: 'AB', name: 'CDEF' },
    { brand: 'AB', name: 'CDEF' },
  ])
);
// [
//   { brand: "ABC", name: "DEF", count: 2 },
//   { brand: "AB", name: "CDEF", count: 2 },
// ]

console.log(
  simplifyList([
    { brand: 'A', name: 'A' },
    { brand: 'B', name: 'B' },
    { brand: 'C', name: 'C' },
    { brand: 'D', name: 'D' },
  ])
);
// [
//   { brand: 'A', name: 'A', count: 1 },
//   { brand: 'B', name: 'B', count: 1 },
//   { brand: 'C', name: 'C', count: 1 },
//   { brand: 'D', name: 'D', count: 1 },
// ];

console.log(simplifyList([{ brand: 'ABC', name: 'DEF' }]));
// [ { brand: 'ABC', name: 'DEF', count: 1 } ]
