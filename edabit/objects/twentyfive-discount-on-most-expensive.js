/*
25% Discount on the Most Expensive Item
https://edabit.com/challenge/7DiEaqrnap9DDXnSo

Problem
You want to introduce a discount for your online store. Every customer gets a 25% discount on the most expensive item in the shopping cart. The discount will be calculated on just one item, even if the customer buys more than one of the most expensive item.

Create a function that takes an object and returns the total price after discount.

Inputs: Array of items objects
- Keys: name, quantity, price
Outputs: 1 float the total price after discount

Rules, Requirements, Definitions
- The total returned price is calculated upon two decimals.
- Total price is the sum of (quantity * price), across all items.
- Discount is 0.25 * price of highest price item.
- Output is Total Price - Discount

Questions
- Round up, round down or truncate?
- Can quantity be 0? Yes. Need to multiply quantity by price.
  - If quantity 0, do we consider it when applying a discount? No.
- Missing properties? No.

Examples, Test Cases


Edge Cases


Data Structure
Input: Array of objects
Intermediate:
- May use arrays to collect prices.
Output: Float

Algorithm
- Filter out any quantity <= 0.
- Use helper function to calculate total price of cart.
- Use helper function to calculate discount.
- Subtract discount from total price.

Helper function: Calculate total price of cart
- Multiply quantity by price

Helper function: Calculate discount based on highest price
- Search through all prices, find max.
- Multiply by 25%.
*/

function totalPrice(cart) {
  let itemTotalCosts = cart.map((item) => item.quantity * item.price);
  return itemTotalCosts.reduce((sum, cost) => sum + cost);
}

// console.log(totalPrice([
//   { name: "Iphone 20x", quantity: 1, price: 1350 },
//   { name: "Samsung x30", quantity: 1, price: 1225 },
//   { name: "Nokia 9250", quantity: 1, price: 800 },
//   { name: "Tesla Model Y", quantity: 1, price: 72999 }
// ]));

function calcDiscount(cart) {
  let prices = cart.map((item) => item.price);
  return Math.max(...prices) * 0.25;
}

// console.log(calcDiscount([
//   { name: "Iphone 20x", quantity: 1, price: 1350 },
//   { name: "Samsung x30", quantity: 1, price: 1225 },
//   { name: "Nokia 9250", quantity: 1, price: 800 },
//   { name: "Tesla Model Y", quantity: 1, price: 72999 }
// ])); // 18249.75

function twentyFiveOnOne(cart) {
  let filteredCart = cart.filter((item) => item.quantity > 0);
  if (filteredCart.length <= 0) return 0;

  let preDiscountPrice = totalPrice(filteredCart);
  let discount = calcDiscount(filteredCart);

  return Number((preDiscountPrice - discount).toFixed(2));
}

// Generic cases
console.log(
  twentyFiveOnOne([
    { name: 'Iphone 20x', quantity: 1, price: 1350 },
    { name: 'Samsung x30', quantity: 1, price: 1225 },
    { name: 'Nokia 9250', quantity: 1, price: 800 },
    { name: 'Tesla Model Y', quantity: 1, price: 72999 },
  ])
); // 58124.25
// Total price = 1 * 1350 + 1 * 1225, ... = 76374
// Discount = 0.25 * 72999 = 18249.75
// Output: 76374 - 18249.75 = 58124.25

console.log(
  twentyFiveOnOne([
    { name: 'jogging pants', quantity: 1, price: 29.99 },
    { name: 'tennis socks', quantity: 2, price: 5.99 },
    { name: 'sweat shirt', quantity: 1, price: 59.99 },
  ])
); // 86.96
// Output: 29.99 + 2 * 5.99 + 59.99 - (0.25 * 59.99) = 86.96

// Multiple items with same price; multiple items with same highest price
console.log(
  twentyFiveOnOne([
    { name: 'jogging pants', quantity: 1, price: 29.99 },
    { name: 'tennis socks', quantity: 2, price: 29.99 },
    { name: 'sweat shirt', quantity: 1, price: 29.99 },
  ])
);
// Output: 29.99 * 4 - (0.25 * 29.99) = 112.46

// Quantity 0
console.log(
  twentyFiveOnOne([
    { name: 'jogging pants', quantity: 0, price: 29.99 },
    { name: 'tennis socks', quantity: 0, price: 29.99 },
    { name: 'sweat shirt', quantity: 1, price: 29.99 },
  ])
);
// Output: 29.99 - (0.25 * 29.99) = 22.49

// Price 0
console.log(
  twentyFiveOnOne([
    { name: 'jogging pants', quantity: 0, price: 0 },
    { name: 'tennis socks', quantity: 1, price: 0 },
    { name: 'headband', quantity: 0, price: 59.99 },
    { name: 'sweat shirt', quantity: 1, price: 29.99 },
  ])
);
// Output: 29.99 - (0.25 * 29.99) = 22.49

// Result negative (need to take max of 0 and computed result)
console.log(
  twentyFiveOnOne([{ name: 'jogging pants', quantity: 0, price: 12.99 }])
);
// Output: 0 - (0.25 * 29.99) = -3.25 => 0

// Same name => No change; items are independent
console.log(
  twentyFiveOnOne([
    { name: 'jogging pants', quantity: 1, price: 29.99 },
    { name: 'jogging pants', quantity: 2, price: 5.99 },
    { name: 'sweat shirt', quantity: 1, price: 59.99 },
  ])
); // 86.96
