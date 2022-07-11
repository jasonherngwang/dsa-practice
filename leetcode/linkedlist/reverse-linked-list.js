/*
Definition for singly-linked list.
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

@param {ListNode} head
@return {ListNode}
*/

/*
Problem
------------------------------------------
Given the head of a singly linked list, reverse the list, and return the
reversed list.

Inputs: The head, a pointer to the first node of a linked list
Outputs: A pointer to the first node of the reversed linked list

Rules, Requirements, Definitions
- Reverse the list in-place


Clarifying Questions
-

Edge Cases
- Empty list (head points to null)? Return pointer to null.


Examples, Test Cases
------------------------------------------
Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]

Input: head = []
Output: []

Data Structure
------------------------------------------
Linked list

Algorithm
------------------------------------------

Approach 1: Iterative
Time: O(N) for 1 traversal
Space: O(1). Only using a few variables.
Steps:
- Initialize variable `current` to head.
- Initialize variable `prev` to null.

- While current node does not reference null (traveled past end of list):
  - Initialize temporary variable `next` to current node's next.
  - Reassign current node's next to prev.
  - Reassign prev to current.
  - Reassign current to `next`.

- Return prev (the new head).

Approach 2: Recursive
Time: O(N) since we visit each node once
Space: O(N) since we have a call stack N levels deep

Since we are reversing the list, the return value is a pointer to the new list's
head, which is the last node in the input list.

Call stack
Bottom: head is first
Middle: head is somewhere in the middle
Top: head is last. Base case. Return current node. This will be returned all the
way back to the top and serve as the head for the reversed list.

Steps
- Base case: Return current node if
  - head is null (length 0), OR
  - head.next is null (length 1 or reached end of list)
  - Note: head is null until we reach the last node and trigger the base case.

- Recursively call the function, passing head.next as an argument
  - Store the result in variable `newHead`, which represents the last element,
    the head of the new reversed list.

On the way back, we perform the reversing. We have a reference to the next node,
as returned in the base case. That next node still points to null. We need to
reassigned that next node's next link to the current node.
- Reassign head.next.next to head.
Since we need the end of the list to point to null, reassign current node's
next to null.
- Reassign head.next to null

- Return `newHead`
*/

'use strict';

class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

class LinkedList {
  constructor(head = null) {
    this.head = head;
  }

  read(index) {
    let currentNode = this.head;
    let currentIndex = 0;

    while (currentIndex < index) {
      currentNode = currentNode.next;
      currentIndex += 1;
      if (!currentNode) return null;
    }

    return currentNode.val;
  }
}

// Approach 1: Iterative
const reverseList = function (head) {
  let prevNode = null;
  let currentNode = head;

  while (currentNode) {
    let nextNode = currentNode.next;
    currentNode.next = prevNode;
    prevNode = currentNode;
    currentNode = nextNode;
  }

  return prevNode;
};

let node1 = new ListNode('once');
let node2 = new ListNode('upon');
let node3 = new ListNode('a');
let node4 = new ListNode('time');

node1.next = node2;
node2.next = node3;
node3.next = node4;

let list = new LinkedList(node1);

// [0, 1, 2, 3].forEach((index) => console.log(list.read(index)));
// // once upon a time
// list.head = reverseList(list.head);
// [0, 1, 2, 3].forEach((index) => console.log(list.read(index)));
// // time a upon once

// Approach 2: Recursive
const reverseListRecursive = function (head) {
  if (!head || !head.next) return head;

  let newHead = reverseListRecursive(head.next);

  head.next.next = head;
  head.next = null;
  return newHead;
};

[0, 1, 2, 3].forEach((index) => console.log(list.read(index)));
// once upon a time
list.head = reverseListRecursive(list.head);
[0, 1, 2, 3].forEach((index) => console.log(list.read(index)));
// time a upon once
