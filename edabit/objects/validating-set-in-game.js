/*
Validating a Set in the Set Game
https://edabit.com/challenge/278bzxEFeTKNiKXfM

Problem
------------------------------------------
In the game Set, three cards form a set if each of the cards are identical or
completely different for each of the four properties. All three cards must:

Have the same color or different colors.
Have the same number or different numbers.
Have the same shades or different shades.
Have the same shape or different shapes.
The four properties are:

Colors: red, purple, green
Numbers: 1, 2, 3
Shades: empty, lined, full
Shapes: squiggle, oval, diamond
Here, a set is represented by an array containing three cards. Each card is
represented by an object of properties and values.

Write a function that determines whether three cards constitute a valid set.

Here is an example of a set:

[
  { color: "red", number: 1, shade: "empty", shape: "squiggle" },
  { color: "red", number: 2, shade: "lined", shape: "diamond" },
  { color: "red", number: 3, shade: "full", shape: "oval" }
]

// "Same" properties: color
// "Different" properties: numbers, shading and shapes

The following is not a set:

[
  { color: "red", number: 1, shade: "empty", shape: "squiggle" },
  { color: "red", number: 2, shade: "lined", shape: "diamond" },
  { color: "purple", number: 3, shade: "full", shape: "oval" }
]

// Colors are not all identical, but not all different.


Inputs: Array of card objects with properties
- color
- number
- shade
- shape
Outputs: Boolean
- true if Set
- false if not

Rules, Requirements, Definitions
- A set cannot have 2/3 cards having the same property. Either all must share
that property, or none will share that particular property.
- Will always have 3 cards
- No missing properties
- No properties with invalid data types

Clarifying Questions
-

Edge Cases
-


Examples, Test Cases
------------------------------------------


Data Structure
------------------------------------------


Algorithm
------------------------------------------
Count how many duplicates there are for each property. If any of the counts is
2, return false
- Initialize a propertySets object with 4 Sets, one for each property.
{
  color: new Set(),
  number: new Set(),
  shade: new Set(),
  shape: new Set(),
}

- Iterate over the array of cards
  - Add each of the 4 properties to the corresponding Set in propertySets
- Iterate over the values of propertySets
  - If the size of any of them is 2, return false
- Return true

*/

'use strict';

function isSet(cards) {
  let propertySets = {
    color: new Set(),
    number: new Set(),
    shade: new Set(),
    shape: new Set(),
  };

  cards.forEach((card) => {
    propertySets['color'].add(card.color);
    propertySets['number'].add(card.number);
    propertySets['shade'].add(card.shade);
    propertySets['shape'].add(card.shape);
  });

  for (let set of Object.values(propertySets)) {
    if (set.size === 2) return false;
  }

  return true;
}

// Either all same or all different
console.log(
  isSet([
    { color: 'green', number: 1, shade: 'empty', shape: 'squiggle' },
    { color: 'green', number: 2, shade: 'empty', shape: 'diamond' },
    { color: 'green', number: 3, shade: 'empty', shape: 'oval' },
  ]) === true
);

// Either all same or all different
console.log(
  isSet([
    { color: 'purple', number: 1, shade: 'full', shape: 'oval' },
    { color: 'green', number: 1, shade: 'full', shape: 'oval' },
    { color: 'red', number: 1, shade: 'full', shape: 'oval' },
  ]) === true
);

// number has 2 same, 1 different
console.log(
  isSet([
    { color: 'purple', number: 3, shade: 'full', shape: 'oval' },
    { color: 'green', number: 1, shade: 'full', shape: 'oval' },
    { color: 'red', number: 3, shade: 'full', shape: 'oval' },
  ]) === false
);

console.log(
  isSet([
    { color: 'red', number: 1, shade: 'lined', shape: 'squiggle' },
    { color: 'red', number: 1, shade: 'lined', shape: 'diamond' },
    { color: 'red', number: 1, shade: 'lined', shape: 'squiggle' },
  ]) === false
);

console.log(
  isSet([
    { color: 'red', number: 1, shade: 'lined', shape: 'squiggle' },
    { color: 'red', number: 1, shade: 'lined', shape: 'diamond' },
    { color: 'red', number: 1, shade: 'lined', shape: 'oval' },
  ]) === true
);

console.log(
  isSet([
    { color: 'red', number: 1, shade: 'empty', shape: 'squiggle' },
    { color: 'red', number: 1, shade: 'lined', shape: 'diamond' },
    { color: 'red', number: 1, shade: 'lined', shape: 'oval' },
  ]) === false
);

console.log(
  isSet([
    { color: 'red', number: 1, shade: 'empty', shape: 'squiggle' },
    { color: 'red', number: 2, shade: 'lined', shape: 'diamond' },
    { color: 'red', number: 3, shade: 'full', shape: 'oval' },
  ]) === true
);

console.log(
  isSet([
    { color: 'green', number: 1, shade: 'empty', shape: 'squiggle' },
    { color: 'green', number: 2, shade: 'empty', shape: 'diamond' },
    { color: 'green', number: 3, shade: 'empty', shape: 'oval' },
  ]) === true
);

console.log(
  isSet([
    { color: 'purple', number: 1, shade: 'full', shape: 'oval' },
    { color: 'green', number: 1, shade: 'full', shape: 'oval' },
    { color: 'red', number: 1, shade: 'full', shape: 'oval' },
  ]) === true
);

console.log(
  isSet([
    { color: 'purple', number: 3, shade: 'full', shape: 'oval' },
    { color: 'green', number: 1, shade: 'full', shape: 'oval' },
    { color: 'red', number: 3, shade: 'full', shape: 'oval' },
  ]) === false
);

console.log(
  isSet([
    { color: 'red', number: 1, shade: 'empty', shape: 'squiggle' },
    { color: 'red', number: 2, shade: 'lined', shape: 'diamond' },
    { color: 'purple', number: 3, shade: 'full', shape: 'oval' },
  ]) === false
);
