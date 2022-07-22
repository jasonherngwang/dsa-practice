/*
Duplicates. Duplicates Everywhere.
https://www.codewars.com/kata/5e8dd197c122f6001a8637ca

Problem
You are given a table, in which every key is a stringified number, and each 
corresponding value is an array of characters, e.g.

{
  "1": ["A", "B", "C"],
  "2": ["A", "B", "D", "A"],
}
Create a function that returns a table with the same keys, but each 
character should appear only once among the value-arrays, e.g.

{
  "1": ["C"],
  "2": ["A", "B", "D"],
}

Rules
Whenever two keys share the same character, they should be compared numerically, 
and the larger key will keep that character. That's why in the example above the 
array under the key "2" contains "A" and "B", as 2 > 1.
If duplicate characters are found in the same array, the first occurrance should be kept.

Example 1
input = {
  "1": ["C", "F", "G"],
  "2": ["A", "B", "C"],
  "3": ["A", "B", "D"],
}

output = {
  "1": ["F", "G"],
  "2": ["C"],
  "3": ["A", "B", "D"],
}

Example 2
input = {
  "1": ["A"],
  "2": ["A"],
  "3": ["A"],
}

output = {
  "1": [],
  "2": [],
  "3": ["A"],
}

Example 3
input = {
  "432": ["A", "A", "B", "D"],
  "53": ["L", "G", "B", "C"],
  "236": ["L", "A", "X", "G", "H", "X"],
  "11": ["P", "R", "S", "D"],
}

output = {
  "11": ["P", "R", "S"],
  "53": ["C"],
  "236": ["L", "X", "G", "H"],
  "432": ["A", "B", "D"],
}

Inputs: 1 object
- Keys: Stringified characters
- Values: Arrays of characters
Outputs: 1 object
- Keys are same as input object.
- None of the array-values share any characters.

Rules, Requirements, Definitions


Examples, Test Cases


Edge Cases
- Keys are not number strings?
console.log(removeDuplicateIds({
  "1": ["A", "B", "C"],
  "x": ["A", "D", "E"],
}));

- Array elements are:
  - Empty array?
  - Not letters?
  - Not uppercase letters?
  - Empty string?
  - Not strings?
  - Single chars of length 1?
- Missing or too many arguments?
- Incorrect data type for argument?

Data Structure
Input: Object
Intermediate: Nested arrays
Output: Object

Algorithm
- Convert object to nested array.
- Sort descending by key (first elem).
- Initialize empty Set.
- Iterate over entries:
  - Initialize empty array to hold filtered values.
  - Iterate over values (2nd elem):
    - If value in set, continue to next iteration.
    - Else, add to set. Add value to holding array
  - Reassign value to holding array.
- Convert nested array back to object. Return it

Helper function: Filter an array to values not in a given Set.
Helper function: Filter an array to unique values only.
*/

function filterArrayUsingSet(array, set) {
  return array.filter((elem) => !set.has(elem));
}

// let set = new Set([1, 3, 5]);
// console.log(filterArrayUsingSet([1, 2, 3, 4, 5], set));

function unique(array) {
  return [...new Set(array)];
}

function removeDuplicateIds(obj) {
  if (
    Object.values(obj)
      .flat()
      .some((e) => typeof e !== 'string')
  )
    return undefined;

  let entries = Object.entries(obj);
  entries.sort((a, b) => (Number(a[0]) > Number(b[0]) ? -1 : 1));

  entries[0][1] = unique(entries[0][1]);
  let set = new Set(entries[0][1]);

  for (let i = 1; i < entries.length; i += 1) {
    entries[i][1] = filterArrayUsingSet(unique(entries[i][1]), set);
    entries[i][1].forEach((char) => set.add(char));
  }

  return Object.fromEntries(entries);
}

console.log(
  removeDuplicateIds({
    1: ['C', 'F', 'G'],
    2: ['A', 'B', 'C'],
    3: ['A', 'B', 'D'],
  })
);
// output = {
//   "1": ["F", "G"],
//   "2": ["C"],
//   "3": ["A", "B", "D"],
// }

console.log(
  removeDuplicateIds({
    1: ['A'],
    2: ['A'],
    3: ['A'],
  })
);
// output = {
//   "1": [],
//   "2": [],
//   "3": ["A"],
// }

console.log(
  removeDuplicateIds({
    432: ['A', 'A', 'B', 'D'],
    53: ['L', 'G', 'B', 'C'],
    236: ['L', 'A', 'X', 'G', 'H', 'X'],
    11: ['P', 'R', 'S', 'D'],
  })
);
// output = {
//   "11": ["P", "R", "S"],
//   "53": ["C"],
//   "236": ["L", "X", "G", "H"],
//   "432": ["A", "B", "D"],
// }

// Empty arrays
console.log(
  removeDuplicateIds({
    1: [],
    2: ['A'],
  })
);
// output = {
//   "1": [],
//   "2": ["A"],
// }

console.log(
  removeDuplicateIds({
    1: [],
    2: [],
  })
);
// output = {
//   "1": [],
//   "2": [],
// }

// 1 entry
console.log(
  removeDuplicateIds({
    1: ['A'],
  })
);
// output = {
//   "1": ["A"],
// }

// Lowercase letter => Upcase
console.log(
  removeDuplicateIds({
    1: ['a'],
    2: ['A'],
  })
);
// output = {
//   "1": ["A"],
// }

// Non-string data type
console.log(
  removeDuplicateIds({
    1: [1, '1', false, undefined, null, NaN, [], {}, function () {}],
  })
);
// undefined
