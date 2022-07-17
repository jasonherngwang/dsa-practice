/*
Vending Machine
https://edabit.com/challenge/PYXbvQh9W3c9i72xx

Problem
------------------------------------------

Vending machine object
Array of product objects:
- number: product ID
- price: price in cents
- name: product name

Array of available coins (as positive integers)

Inputs:
- 1 number, the amount of money given
- 1 number, the product-identifying number
Outputs:
- Error message (string) if:
  - Invalid product number: "Enter a valid product number"
  - Invalid funds to buy product: "Not enough money for this product"
- If no error, return object:
  - product: product name
  - change: Array of coins
    - Ordered largest to smallest coin
    - Can be empty.
    - Can have multiples of the same coin.

Rules, Requirements, Definitions
-


Clarifying Questions
- Since we don't have a 1-cent coin, is there a scenario where we can't provide
  exact change? No, all multiples of 10.

Edge Cases
- Exact change given: Coin array empty.
- Duplicate product numbers? Not possible.
- Products with same price? Possible.

Examples, Test Cases
------------------------------------------
vendingMachine(products, 200, 7)
➞ { product: "Crackers", change: [ 50, 20, 10 ] }

vendingMachine(products, 500, 0) ➞ "Enter a valid product number"

vendingMachine(products, 90, 1) ➞ "Not enough money for this product"

Data Structure
------------------------------------------
Product: Array of product objects
Coins: Array of coin values
Output: New object

Algorithm
------------------------------------------
- Create array of product numbers by extracting from products array.
- Check if input product number is in the array of available product numbers.
  - If not, return error message.
- Check if money input is sufficient.
  - If not, return error message.
- Calculate change (helper function)
  - Inputs: product price and money provided.
  - Subtract product price from money input. This is the change amount. If 0
    return empty array since no change is needed.
  - Initialize result array.
  - Iterate over coins array.
    - While current coin value <= change amount:
      - Push current coin value to result array.
      - Subtract value from change amount
- Create new object
  - product name
  - change array
*/

'use strict';

function calculateChange(price, money) {
  const COINS = [500, 200, 100, 50, 20, 10];
  let changeCoins = [];

  let change = money - price;
  if (change === 0) return changeCoins;

  for (let coinValue of COINS) {
    while (change >= coinValue) {
      changeCoins.push(coinValue);
      change -= coinValue;
    }
  }

  return changeCoins;
}

function vendingMachine(products, money, productNumber) {
  const availableProductNums = products.map(({ number }) => number);

  if (!availableProductNums.includes(productNumber)) {
    return 'Enter a valid product number';
  }

  let product = products.find((p) => p.number === productNumber);
  if (money < product.price) return 'Not enough money for this product';

  let changeCoins = calculateChange(product.price, money);

  return {
    product: product.name,
    change: changeCoins,
  };
}

const products = [
  { number: 1, price: 100, name: 'Orange juice' },
  { number: 2, price: 200, name: 'Soda' },
  { number: 3, price: 150, name: 'Chocolate snack' },
  { number: 4, price: 250, name: 'Cookies' },
  { number: 5, price: 180, name: 'Gummy bears' },
  { number: 6, price: 500, name: 'Condoms' },
  { number: 7, price: 120, name: 'Crackers' },
  { number: 8, price: 220, name: 'Potato chips' },
  { number: 9, price: 80, name: 'Small snack' },
];

console.log(vendingMachine(products, 500, 8)); // { product: 'Potato chips', change: [ 200, 50, 20, 10 ] });
console.log(vendingMachine(products, 500, 1)); // { product: 'Orange juice', change: [ 200, 200 ] });
console.log(vendingMachine(products, 200, 7)); // { product: 'Crackers', change: [ 50, 20, 10 ] });
console.log(vendingMachine(products, 100, 9)); // { product: 'Small snack', change: [ 20 ] });
console.log(vendingMachine(products, 1000, 6)); // { product: 'Condoms', change: [ 500 ] });
console.log(vendingMachine(products, 250, 4)); // { product: 'Cookies', change: [] });
console.log(vendingMachine(products, 500, 0)); // 'Enter a valid product number');
console.log(vendingMachine(products, 90, 1)); // 'Not enough money for this product');
console.log(vendingMachine(products, 0, 0)); // 'Enter a valid product number');
