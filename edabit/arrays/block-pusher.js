/*
Block Pusher
https://edabit.com/challenge/sQ6KnsgJjiniZ32yd

Problem
------------------------------------------
Create a function which returns the state of a board after `n` moves.

'>' is a pusher which moves right every turn, and pushes a block to the right if it occupies the same space as it.

'#' is a block which can be pushed by the pusher. If a block is pushed onto another block, then the other block also joins the push chain!

'-' is an empty space, which a block can be pushed into.
Note that the pusher can push any number of blocks at a time, but is always stopped if the push chain hits the end of the list.

Inputs:
- 1 array of strings, representing the board.
- 1 non-negative integer `n`, representing a number of moves to play.
Outputs: 1 array of strings, representing the board after `n` moves.

Rules, Requirements, Definitions
- There may be more than one pusher at a time on the board.
- Pushers are solid blocks, so a push chain of pushers should also stop when hitting the end of the list.
- Pushers do not merge. When they come in contact, they form a push chain that pushes together.

- When blocks are contiguous, they stick together and never separate.
- The only time an individual block moves is if a pusher is on its left, and
  there is a blank space to its right.
- A pusher or pusher chain moves if:
  - There is a blank space to its right
  - It is to the left of a block group that has space to advance.

Clarifying Questions
-

Edge Cases
- More steps than possible moves, i.e. `n` is a large number. Stop pushing when
  there is no more room to push.
- Invalid strings that are not '-', '>', '#'? Not possible.
- Empty array => Return an empty array.
- Only 1 element => Return the array.
- No pushers => Nothing moves.
-

Examples, Test Cases
------------------------------------------
blockPushing(['-', '>', '#', '-', '#', '-', '-', '-'], 1) ➞ ['-', '-', '>', '#', '#', '-', '-', '-']

blockPushing(['>', '#', '-', '#', '-', '-', '#'], 10) ➞ ['-', '-', '-', '>', '#', '#', '#']

blockPushing(['>', '-', '>', '#', '-', '-', '#', '-'], 2) ➞ ['-', '-', '>', '-', '>', '#', '#', '-']

blockPushing(['>', '>', '>', '-'], 3) ➞ ['-', '>', '>', '>']

// No pushers; nothing moves
console.log(blockPushing(['-', '#', '-', '-'], 3)); // ['-', '#', '-', '-']

// Pusher moving on its own
console.log(blockPushing(['>', '-', '-', '-'], 3)); // ['-', '-', '-', '>']

// Pushers moving together.
console.log(blockPushing(['>', '>', '-', '-'], 2)); // ['-', '-', '>', '>']

// Pusher pushing a block
console.log(blockPushing(['>', '#', '-', '-'], 2)); // ['-', '-', '>', '#']

// Pusher pushing a block group
console.log(blockPushing(['>', '#', '#', '-'], 1)); // ['-', '>', '#', '#']

// Push chain moving a block
console.log(blockPushing(['>', '>', '#', '-'], 1)); // ['-', '>', '>', '#']

// Pusher pushing a block into another block, and moving the entire group
console.log(blockPushing(['>', '#', '-', '#', '-'], 2));
// ['-', '-', '>', '#', '#']

Data Structure
------------------------------------------
Input: array
Intermediate: may use additional arrays to collect elements.
Output: array

Algorithm
------------------------------------------
- Join array into single string.
- Repeat `n` times:
  - Use regex to find shortest sequences that start with '>' and end with '-'.
    - Replace by moving the sequence to the right, and putting the '-' on the
      left.
- Split string into an array of chars, which is the desired output format.
*/

'use strict';

function blockPushing(arr, n) {
  let str = arr.join('');
  while (n >= 1) {
    str = str.replace(/(>(>|#)*?)-/g, '-$1');
    n -= 1;
  }
  return [...str];
}

console.log(blockPushing(['-', '>', '#', '-', '#', '-', '-', '-'], 1));
// ['-', '-', '>', '#', '#', '-', '-', '-']

console.log(blockPushing(['>', '#', '-', '#', '-', '-', '#'], 10));
// ['-', '-', '-', '>', '#', '#', '#']

console.log(blockPushing(['>', '-', '>', '#', '-', '-', '#', '-'], 2));
// ['-', '-', '>', '-', '>', '#', '#', '-']

console.log(blockPushing(['>', '>', '>', '-'], 3));
// ['-', '>', '>', '>']

console.log(blockPushing(['-', '>', '#', '-', '#', '-', '-', '-'], 1));
// ['-', '-', '>', '#', '#', '-', '-', '-'])
console.log(blockPushing(['>', '#', '-', '#', '-', '-', '#'], 10));
// ['-', '-', '-', '>', '#', '#', '#'])
console.log(blockPushing(['>', '-', '>', '#', '-', '-', '#', '-'], 2));
// ['-', '-', '>', '-', '>', '#', '#', '-'])
console.log(blockPushing(['>', '>', '>'], 3));
// ['>', '>', '>'])
console.log(blockPushing(['>'], 4));
// ['>'])
console.log(blockPushing(['-'], 2));
// ['-'])
console.log(blockPushing(['#'], 10));
// ['#'])
console.log(blockPushing(['#', '-', '#', '#'], 53));
// ['#', '-', '#', '#'])
console.log(blockPushing(['#', '-', '-', '>', '-', '-'], 3));
// ['#', '-', '-', '-', '-', '>'])
console.log(
  blockPushing(['#', '>', '#', '-', '-', '>', '>', '-', '#', '-', '-'], 2)
);
// ['#', '-', '-', '>', '#', '-', '-', '>', '>', '#', '-'])

// No pushers; nothing moves
console.log(blockPushing(['-', '#', '-', '-'], 3)); // ['-', '#', '-', '-']

// Pusher moving on its own
console.log(blockPushing(['>', '-', '-', '-'], 3)); // ['-', '-', '-', '>']

// Pushers moving together.
console.log(blockPushing(['>', '>', '-', '-'], 2)); // ['-', '-', '>', '>']

// Pusher pushing a block
console.log(blockPushing(['>', '#', '-', '-'], 2)); // ['-', '-', '>', '#']

// Pusher pushing a block group
console.log(blockPushing(['>', '#', '#', '-'], 1)); // ['-', '>', '#', '#']

// Push chain moving a block
console.log(blockPushing(['>', '>', '#', '-'], 1)); // ['-', '>', '>', '#']

// Pusher pushing a block into another block, and moving the entire group
console.log(blockPushing(['>', '#', '-', '#', '-'], 2));
// ['-', '-', '>', '#', '#']
