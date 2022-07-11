/*
Best Time to Buy and Sell Stock
https://leetcode.com/problems/best-time-to-buy-and-sell-stock/

Problem
------------------------------------------
You are given an array prices where prices[i] is the price of a given stock on 
the ith day.

You want to maximize your profit by choosing a single day to buy one stock and 
choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot 
achieve any profit, return 0.

Inputs: 1 array of non-negative integers, the stock prices on different days,
ordered chronologically
Outputs: 1 number, the maximum profit.
- Calculated as the difference between two numbers, where the second number
  comes after the first. Buy on one day and sell on a later day.

Rules, Requirements, Definitions
- Cannot buy and sell on the same day.
- Cannot sell on a day that comes before the buy day.


Clarifying Questions
- Always possible to make profit, e.g. if the prices are in descending order?
  - No; if no profit possible, return 0.

Edge Cases
- Empty array? No.
- 1-element array? Yes. Since there is no future day to sell, return 0 profit.


Examples, Test Cases
------------------------------------------
[7,1,5,3,6,4]
Buy day 2 (price: 1), Sell day 5 (price: 6)
Profit: 5

Data Structure
------------------------------------------
Array with 2 pointers

Algorithm
------------------------------------------
Approach 1: Sliding Window
Find the highest peak following the lowest valley. Traverse over the array.
For each lowest valley experienced thus far, calculate the profit for all days
after that. When we find a new lower valley, restart the process.
- There is no scenario in which we should not restart from the new, lower
  valley, because all historical possibilities have already been considered, and
  we cannot go backward.

Time: O(N) for 1 traversal
Space: O(1) for a few variables

Steps
- Initialize two pointers, `buy` and `sell` to index 0.
- Initialize variable `maxProfit` to 0.
- Initialize variable `minPrice` to first element
- Iterate over array.
  - If price < minPrice, set buy to current price
  - If profit (sell - buy) > maxProfit
    - Move sell pointer to current price
    - Update maxProfit if it is higher.
*/

'use strict';

function maxProfit(prices) {
  if (prices.length <= 1) return 0;
  
  let minPrice = Infinity;
  let maxProfit = 0;
  
  for (let i = 0; i < prices.length; i += 1) {
    if (prices[i] < minPrice) {
      minPrice = prices[i];
    } else {
      maxProfit = Math.max(maxProfit, prices[i] - minPrice);
    }
  }
  
  return maxProfit;
}

console.log(maxProfit([1,2,3,4,5])); // 4
console.log(maxProfit([7,1,5,3,6,4])); // 5
console.log(maxProfit([7,6,4,3,1])); // 0
console.log(maxProfit([7])); // 0
console.log(maxProfit([])); // 0