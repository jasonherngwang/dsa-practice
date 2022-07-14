/*
Playing with Nested Objects
https://edabit.com/challenge/eARWGdpymGeNQiHBi

Problem
------------------------------------------
Create a function that takes an object and returns an object of all entries
having unique marks. If the marks are the same, take who is eldest.

Inputs: 1 object
- Key: Non-negative integer
- Value: An object with several properties. Of relevance are the marks and age
  properties.
Outputs: 1 object with the same or fewer entries as the input
- Same format as the input.
- All entries have unique value for marks property.

Rules, Requirements, Definitions
- Multiple person objects can have the same value for the name property.
- The marks property value is a string. Need to convert to number for
  comparison.
- In output object, the key for a particular person is not necessarily the same
  as for that person in the input object.
  - Keys in the output object are consecutive, starting with 0
- Output order matters. Must be in the same order as the input.


Clarifying Questions
- Minimum number of entries? 0
- Minimum values for age and marks: 0
- Any missing argments or properties? No.
- Will people with the same marks be adjacent in the input array?
  - Not necessarily


Edge Cases
- 2+ people with same age, same marks? Include the first one? Does it matter?


Examples, Test Cases
------------------------------------------


Data Structure
------------------------------------------
Input: Object
Intermediate: Store data in array so we can sort.
Output: Convert back to object for output.

Algorithm
------------------------------------------
- Convert input object into nested array of entries
  - First element: original key
  - Second element Data object
- Sort by marks, descending
- Create new array to contain filtered list of people
- Iterate over original array, keeping track of elem, index, and array
  - If index is 0, append element to the new array.
  - If marks of current person is the same as the marks of the previous person,
    compare age.
    - If previous age is greater, skip the current iteration.
    - If current age is greater, slice out the previous person, and add the
      current person.
- Sort new array by integer key, ascending
- Transform array, keeping track of index
  - Replace integer key with index
- Convert nested array back into object, and return.

*/

'use strict';

function getObject(args) {
  let people = Object.entries(args);
  people.sort((a, b) => parseInt(b[1].marks, 10) - parseInt(a[1].marks, 10));

  let filteredArr = [];

  for (let [index, person] of people.entries()) {
    let age = person[1].age;
    let marks = person[1].marks;

    if (index > 0 && marks === people[index - 1][1].marks) {
      if (age > people[index - 1][1].age) {
        array.pop();
      } else {
        continue;
      }
    }
    filteredArr.push(person);
  }

  filteredArr.sort((a, b) => {
    if (a[0] > b[0]) return 1;
    if (a[0] < b[0]) return -1;
  });

  filteredArr = filteredArr.map((person, index) => {
    person[0] = String(index);
    return person;
  });

  return Object.fromEntries(filteredArr);
}

console.log(
  getObject({
    0: { age: 18, name: 'john', marks: '400' },
    1: { age: 17, name: 'julie', marks: '400' },
    2: { age: 16, name: 'Robin', marks: '200' },
    3: { age: 16, name: 'Bella', marks: '300' },
  })
);
// {
//   "0": { age: 18, name: "john", marks: "400" },
//   "1": { age: 16, name: "Robin", marks: "200" },
//   "2": { age: 16, name: "Bella", marks: "300" }
// }

console.log(
  getObject({
    0: { age: 18, name: 'john', marks: '400' },
    1: { age: 17, name: 'julie', marks: '400' },
    2: { age: 16, name: 'Robin', marks: '200' },
    3: { age: 16, name: 'Bella', marks: '300' },
    4: { age: 16, name: 'john', marks: '250' },
    5: { age: 15, name: 'julie', marks: '250' },
  })
);
// {
//   0: {age: 18, name: 'john', marks: '400'},
//   1: {age: 16, name: 'Robin', marks: '200'},
//   2: {age: 16, name: 'Bella', marks: '300'},
//   3: {age: 16, name: 'john', marks: '250'}
// }
