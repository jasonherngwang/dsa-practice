/*
Hall Monitor 2
https://edabit.com/challenge/yPa5YwAoqfdJuWK4C

Problem
Rooms are arranged 1-2-H-4-3
Determine if the provided path is valid.

Inputs: Array of numbers and characters
- Possible number: 1, 2, 3, 4
- Possible characters: 'H'
Outputs: Boolean
- true if path valid
- false if not

Rules, Requirements, Definitions
- May only move to adjacent room.
- A route may begin or end in any room (including the hallway).
- All inputs are either numbers 1-4 or the letter "H".
- No rooms will repeat.
  - I.e. the same room will not appear twice in a row

Clarifying Questions
- Any element other than 1, 2, 3, 4, 'H'? No.

Data Structure
Use hash table to store possible moves
- Key: The 5 rooms
- Value: The adjacent room(s) that can be moved to from the room represented by the key

Algorithm
- If input array length <= 1, return true
- Iterate from first element to 2nd to last element:
  - Retrieve value of current element and next element.
  - Check hash table to see if next element is a legal move from the current element (helper function)
    - If illegal, return false.
- Return true

*/

function validMove(currentRoom, nextRoom) {
  const VALID_MOVES = {
    1: [2],
    2: [1, 'H'],
    H: [2, 4],
    4: ['H', 3],
    3: [4],
  };

  return VALID_MOVES[currentRoom].includes(nextRoom);
}

// console.log(validMove(1, 2)); // true
// console.log(validMove(2, 'H')); // true
// console.log(validMove('H', 2)); // true
// console.log(validMove('H', 3)); // false

function possiblePath(moves) {
  if (moves.length <= 1) return true;

  for (let i = 0; i < moves.length - 1; i += 1) {
    if (!validMove(moves[i], moves[i + 1])) return false;
  }

  return true;
}

// Generic cases
console.log(possiblePath([1, 2, 'H', 4, 3])); // true (all moves are to adjacent rooms)
console.log(possiblePath(['H', 1, 2])); // false (can't move H -> 1; not adjacent)
console.log(possiblePath([4, 3, 4, 'H', 4, 'H'])); // true

// Edge cases
// Empty input array
console.log(possiblePath([])); // true
// Single element
console.log(possiblePath(['H'])); // true
// Back-and-forth
console.log(possiblePath([1, 2, 1, 2, 1, 2, 1, 2])); // true
