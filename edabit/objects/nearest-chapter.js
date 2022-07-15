/*
Nearest Chapter
https://edabit.com/challenge/E5kxeJA782rNX2bch

Problem
------------------------------------------
Create a function that returns which chapter is nearest to the page you're on.
If two chapters are equidistant, return the chapter with the higher page number.

Inputs:
- 1 object. Key: chapter name, Value: page num
- 1 number, the page we are on
Outputs: String, the chapter nearest to the page we are on.

Rules, Requirements, Definitions
- If equidistance (same distance from) two chapters, return chapter with higher
  page number.


Clarifying Questions
- Multiple chapter start on same page? No.
- Current page smaller than first chapter, or larger than last chapter? Yes.
- Order of input object? Objects should not be relied upon to preserve order,
  but assume that chapters DO NOT need to be provided in numerical order, either
  ascending or descending.

Edge Cases
- Missing argument? No.
- Negative page numbers? Zero? Possible.
- Non-numeric page numbers? No.


Examples, Test Cases
------------------------------------------
nearestChapter({
  "Chapter 1" : 1,
  "Chapter 2" : 15,
  "Chapter 3" : 37
}, 10) ➞ "Chapter 2"

Current page 10 is 5 pages away from Chapter 2, and farther from other chapters.

nearestChapter({
  "New Beginnings" : 1,
  "Strange Developments" : 62,
  "The End?" : 194,
  "The True Ending" : 460
}, 200) ➞ "The End?"

Current page 10 is 5 pages away from "The End?", and farther from others.

nearestChapter({
  "Chapter 1a" : 1,
  "Chapter 1b" : 5
}, 3) ➞ "Chapter 1b"

Current page is equidistant from both chapters, so choose Chapter 1b which has
the higher page number.

Data Structure
------------------------------------------
Convert object to array so we can use abstraction methods for iteration.

Algorithm
------------------------------------------
- Convert object to nested array of object properties, in the form:
  [["Chapter 1", 1], ["Chapter 2", 15], ...]
- Initialize variable minDistance to Infinity, the minimum number of pages
  between the current page and any page we've seen before.
- Declare variables chapterName and chapterPage, the data associated with the
  minDistance.
- Iterate over nested array:
  - Calculate distance between current page and current chapter page
    (absolute value).
  - If distance < minDistance, replace minDistance, chapterName, and chapterPage
    with values from the current element.
  - If distance === minDistance:
    - If the chapter page of the current element is greater than chapterPage,
      replace.
- Return chapterName.

*/

'use strict';

function nearestChapter(chapters, currentPage) {
  let chapterArray = Object.entries(chapters);
  let minDistance = Infinity;
  let chapterName, chapterPage;

  chapterArray.forEach(([name, page]) => {
    let distance = Math.abs(currentPage - page);
    if (distance < minDistance) {
      [minDistance, chapterName, chapterPage] = [distance, name, page];
    }
    if (distance === minDistance && page > chapterPage) chapterName = name;
  });

  return chapterName;
}

console.log(
  nearestChapter(
    {
      'Chapter 1': 1,
      'Chapter 2': 15,
      'Chapter 3': 37,
    },
    10
  )
); // "Chapter 2"

console.log(
  nearestChapter(
    {
      'New Beginnings': 1,
      'Strange Developments': 62,
      'The End?': 194,
      'The True Ending': 460,
    },
    200
  )
); // "The End?"

console.log(
  nearestChapter(
    {
      'Chapter 1a': 1,
      'Chapter 1b': 5,
    },
    3
  )
); // "Chapter 1b"
