/*
Does the cargo fit?
A ship has to transport cargo from one place to another, while picking up cargo along the way. Given the total amount of cargo and the types of cargo holds in the ship as arrays, create a function that returns true if each weight of cargo can fit in one hold, and false if it can't.

"S" means 50 cargo space.
"M" means 100 cargo space.
"L" means 200 cargo space.

Problem

Inputs: 2 arrays
- Array of strings, each representing the capacity of a cargo hold
  - For an array of length N, the ship has N holds.
- Array of numbers, representing the weights of cargo to be loaded.
  - Assume weights are positive integers.
Outputs: Boolean
- true if cargo can be distributed among the holds.
- false if not

Rules, Requirements, Definitions
- More than 1 cargo item can be placed in one hold.
- When we can no longer fit any of the available cargos in a hold, we move to the next cargo and start trying to fill it.

Examples, Test Cases


Edge Cases
- Number of holds is not equal to the number of cargo items. => Try to fit multiple cargo items inside a single hold.
- More hold space than cargo.
- 

Data Structure
Input: Arrays
Intermediate:
- Temporary arrays
- Hash table to convert hold type to weight capacity
Output: Boolean

Algorithm
Sort hold capacities and cargo weights ascending. Insert cargo into the smallest hold until it no longer fits; then move to next hold. If no more holds available, return false.

Steps
- Create hash table to convert hold type to weight capacity
  - Keys: 'S', 'M', 'L'
  - Values: 50, 100, 200
- Convert holds array to weight capacities.
- Shallow copy array of cargo weights.
- Sort both arrays ascending
- Iterate over indices of hold capacities array, `holds`. Need the option of exiting early.
  - If cargo array empty, return true.
  - Retrieve hold capacity, using index iterator variable.
  - Retrieve first cargo weight.
  - If cargo weight > hold capacity, continue to next iteration.
  - If cargo weight <= hold capacity,
    - Shift that cargo item out of its array.
    - Decrement hold capacity by that amount.
- If cargo array empty, return true. Else return false.

*/

function willFit(holds, cargo) {
  if (cargo.length === 0) return true;
  if (holds.length === 0) return false;

  const CAPACITIES = {
    S: 50,
    M: 100,
    L: 200,
  };

  let holdCapacities = holds.map((label) => CAPACITIES[label]).sort();
  let cargoWeights = cargo.slice().sort();

  for (let i = 0; i < holdCapacities.length; i += 1) {
    if (cargoWeights.length === 0) return true;

    while (holdCapacities[i] >= cargoWeights[0]) {
      holdCapacities[i] -= cargoWeights.shift();
    }
  }

  return cargoWeights.length === 0;
}

console.log(willFit(['M', 'L', 'L', 'M'], [56, 62, 84, 90])); // true

console.log(willFit(['S', 'S', 'S', 'S', 'L'], [40, 50, 60, 70, 80, 90, 200]));
// false

console.log(willFit(['L', 'L', 'M'], [56, 62, 84, 90])); // true

// Edge cases
// No holds, no cargo
console.log(willFit([], [])); // true

// No holds
console.log(willFit([], [1])); // false

// No cargo
console.log(willFit(['L', 'M', 'S'], [])); // true

// Small cargo
console.log(willFit(['L', 'M', 'S'], [1])); // true

// Small cargo, more cargo items than holds
console.log(willFit(['L', 'M', 'S'], [1, 1, 1, 1, 1, 1, 1])); // true

// Too-large cargo
console.log(willFit(['L', 'M', 'S'], [10000])); // false

// Multiple too-large cargo
console.log(willFit(['L', 'M', 'S'], [10000, 10000, 10000])); // false

// Too-large cargo mixed with small cargo
console.log(willFit(['L', 'M', 'S'], [1, 2, 10000])); // false

// Exact-fit cargo
console.log(willFit(['L', 'M', 'S'], [50, 100, 200])); // true
console.log(willFit(['M', 'M', 'M'], [100, 100, 100])); // true
