/*
Strip Comments
https://www.codewars.com/kata/51c8e37cee245da6b40000bd/train/javascript

Problem
------------------------------------------
Complete the solution so that it strips all text that follows any of a set of
comment markers passed in. Any whitespace at the end of the line should also be
stripped out.

Inputs:
- String of text, possibly separated by newline character
- Array of comment marker characters
Outputs: A new string, without any text and whitespace after any comment marker

Rules, Requirements, Definitions
- "\n" newline character may be present in string. Treat each line separately.
- Trim any whitespace at the END of each line.


Clarifying Questions
-

Edge Cases
-


Examples, Test Cases
------------------------------------------
"apples, plums % and bananas\npears\noranges !applesauce"
["%", "!"]

Representation with line breaks:
apples, pears # and bananas
grapes
bananas !apples

Output:
apples, pears
grapes
bananas

Data Structure
------------------------------------------
Arrays

Algorithm
------------------------------------------
- Split string by newline, into an array of lines.
- Transform this array of lines:
  - For each of the markers:
    - Use regex to select the marker and all characters after it, and replace
      with empty string.
    - Trim the right side of the string. If there were no markers, and there
      were spaces at the end.
- Join strings with '\n'
*/

'use strict';

function checkComments(input, markers) {
  let lines = input.split('\n');
  return lines
    .map((line) => {
      markers.forEach((marker) => {
        let markerRegex = new RegExp('\\' + marker + '.*');
        line = line.replace(markerRegex, '').trimEnd();
      });
      return line;
    })
    .join('\n');
}

console.log(
  checkComments('apples, plums % and bananas\npears\noranges !applesauce', [
    '%',
    '!',
  ])
); //'apples, plums\npears\noranges'
console.log(checkComments('Q @b\nu\ne -e f g', ['@', '-'])); // 'Q\nu\ne'
