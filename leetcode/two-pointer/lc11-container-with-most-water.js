/*
Container With Most Water
https://leetcode.com/problems/container-with-most-water/

Problem
------------------------------------------
You are given an integer array `height` of length `n`. There are n vertical
lines drawn such that the two endpoints of the ith line are (i, 0) and
(i, height[i]).

Find two lines that together with the x-axis form a container, such that the
container contains the most water.

Return the maximum amount of water a container can store.

Notice that you may not slant the container.

Inputs: Array of integers, representing heights
  - Integers can be 0 or greaters.
  - There will be at least 2 integers in the array.
Outputs: 1 integer, the maximum amount of water a container can store.

Rules, Requirements, Definitions
- Water is stored when it is bounded on both sides by heights > 0.
- For walls at indices i and j, the amount of water contained is calculated as
  (j - i) multiplied by the smaller of the two heights.
- Water will "spill over" if it exceeds the height of either of its bounding
  walls.
- A "container" has two bounding walls. The shorter one limits how much water
  can be stored.
- There can be many possible containers that can be made using the given
  heights. The goal is to find the one with the largest amount.

Edge Cases
- All heights are 0 => Return 0.
- Only 1 height is non-zero => Return 0 because water will spill out of either
  side.


Examples, Test Cases
------------------------------------------
Input: [1,8,6,2,5,4,8,3,7]
Output: 49
The container from index 1 (height 8) to index 7 (height 7) can contain 49
units of water.

[1,1]
1

Data Structure
------------------------------------------
No additional arrays needed.

Algorithm: 2 Pointer
------------------------------------------
Time: O(N) for 1 traversal outside-in
Space: O(1) for 2 pointers

Steps
- Initialize variable to track maxWater, to 0.
- Initializer 2 pointers (left, right) at the first and last element of the
array.
- While left < right (before they cross over):
  - Calculate the water amount and replace maxWater if higher.
  - If left <= right, increment it.
    - We do this because left is the limiting factor, and we want to see if
    there are any higher heights that can trap more water.
  - Else, decrement right.
- Return maxWater.

*/

function maxArea(heights) {
  function waterAmount(left, right) {
    return (right - left) * Math.min(heights[left], heights[right]);
  }

  let maxWater = 0;
  let left = 0;
  let right = heights.length - 1;

  while (left < right) {
    maxWater = Math.max(maxWater, waterAmount(left, right));
    heights[left] <= heights[right] ? (left += 1) : (right -= 1);
  }

  return maxWater;
}

console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]));
