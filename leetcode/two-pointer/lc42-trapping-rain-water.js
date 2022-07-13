/*
Trapping Rain Water
https://leetcode.com/problems/trapping-rain-water/

Problem
------------------------------------------
Given n non-negative integers representing an elevation map where the width of
each bar is 1, compute how much water it can trap after raining.

Inputs: 1 array of non-negative integers, representing heights of an elevation
profile.
- Array has at least 1 element.
- Heights are 0 or greater.
Outputs: 1 integer, the total units of water trapped after raining on this
terrain.

Rules, Requirements, Definitions
- Water is not trapped at the edges.
- Water is trapped at an index when there exists an index to the left with a
  higher height, and vice versa to the right.

Clarifying Questions
-

Edge Cases
-


Examples, Test Cases
------------------------------------------
See visual on leetcode.

Data Structure
------------------------------------------
Arrays

Algorithm
------------------------------------------
Approach 1: Precomputation, DP
Time: O(N)
- 1 traversal LtR, 1 traversal RtL, 1 traversal comparing the 2 arrays.
Space: O(N) for 2 arrays

Steps
- Traverse left to right.
  - For index i, find the maximum height ever seen to its left.
    - For index 0, use 0 because the terrain is flat there.
- Repeat for right to left.
- For each index, take the min of the LtR and RtL array values. Subtract the
  current height from it. This is the number of units of water stored at that
  index.
    - If the subtraction yields a negative; use 0.
- Sum the units.

Approach 2: 2 Pointer
Time: O(N)
Space: O(1)

Iterate from both sides to middle

*/

'use strict';

function trap(height) {
  if (height.length <= 1) return 0;
  let maxLeft = [0];
  let maxRight = [0];
  let totalTrapped = 0;

  for (let i = 1; i < height.length; i += 1) {
    let leftHeight = height[i - 1];
    let maxSeen = maxLeft[maxLeft.length - 1];
    maxLeft.push(Math.max(maxSeen, leftHeight));
  }

  for (let i = height.length - 2; i >= 0; i -= 1) {
    let rightHeight = height[i + 1];
    let maxSeen = maxRight[0];
    maxRight.unshift(Math.max(maxSeen, rightHeight));
  }

  for (let i = 0; i < height.length; i += 1) {
    let trapped = Math.max(0, Math.min(maxLeft[i], maxRight[i]) - height[i]);
    totalTrapped += trapped;
  }

  return totalTrapped;
}

console.log(trap([4, 2, 0, 3, 2, 5])); // 9
console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])); // 6
