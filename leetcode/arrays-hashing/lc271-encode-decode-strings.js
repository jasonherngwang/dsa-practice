/*
Encode and Decode Strings
https://leetcode.com/problems/encode-and-decode-strings/

Problem
------------------------------------------
Design an algorithm to encode and decode a list of strings to a string.


Encode function
Inputs: 1 array of strings
- String characters can be any of the 256 ASCII characters
- Will contain at least 1 element
Outputs: 1 string, encoded

Decode function
Inputs: 1 string, encoded
Outputs: 1 array of strings

Rules, Requirements, Definitions
- Cannot use serialize methods


Clarifying Questions
-

Edge Cases
- Input array has a single blank string? Decodes to a single array with a single
  blank string.
- Input array has multiple blank strings? Must preserve all of them.


Examples, Test Cases
------------------------------------------
Input: dummy_input = ["Hello","World"]
Possible encoded string: "Hello<???>World"
Output: ["Hello","World"]

Data Structure
------------------------------------------
Array -> String -> Array

Algorithm
------------------------------------------

Approach 1: Non-ASCII separator
Time: O(N) to join and split N strings
Space: O(1) for the encoded strings.

Join the strings using a separator, and then split them later using the same
separator.
- Use a character outside the 256-character ASCII set, as the separator

Approach 2: Chunked Transfer Encoding
Advantage over Approach 1: Does not depend on the character set that is used.

Encode:
- For each string, prepend its length and a separator (e.g. '#') when joining
  everything.
  
Decode.
- Initialize a pointer to index 0
- Initialize a result array.
1. Read up to '#' to determine the length.
2. After '#' retrieve the next `length` characters. Add to result array.
  - Update the pointer to right after the last character retrieved
3. Repeat 1. and 2. until the string ends.


*/

'use strict';

// Approach 1: Non-ASCII separator
function encode(strs) {
  return strs.join(String.fromCharCode(256));
}

function decode(s) {
  return s.split(String.fromCharCode(256));
}

// console.log(decode(encode(["Hello","World"])));

// Approach 2: Chunked Transfer Encoding
function encode2(strs) {
  return strs.map(str => `${str.length}#${str}`).join('');
}

function decode2(s) {
  let result = [];
  let index = 0;
  let lengthStr = '';
  
  while (index < s.length) {
    if (s[index] !== '#') {
      lengthStr += s[index];
      index += 1;
    } else {
      let len = parseInt(lengthStr, 10);
      result.push(s.slice(index + 1, index + 1 + len));
      index += (len + 1);
      lengthStr = '';
    }
  }
  
  return result;
}

// console.log(encode2(['Hello', 'World']));
console.log(decode2(encode2(['Hello', 'World'])));
console.log(decode2(encode2(['We', "didn't", 'start', 'the', 'fire'])));
console.log(decode2(encode2([''])));