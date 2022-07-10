/*
Ungroup Data in an Object
https://edabit.com/challenge/NcRsSwrJbMm4dRbCk

Problem
------------------------------------------
Given an array of student data, group by teacher, write a function to ungroup
every student.

Inputs: 1 array of teacher-grouped objects
- Each teacher object has:
  - teacher property
  - data property containing an array of student objects
Outputs: 1 array of individual student objects
- Each student object has:
  - teacher
  - name
  - (other properties)
  - MUST BE IN THIS ORDER


Rules, Requirements, Definitions
- Not all student have the same properties


Clarifying Questions
- Can a teacher have 0 students, i.e. empty data array? Yes.
- Can students be teacherless, i.e. empty string for teacher property, or
  missing teacher property? No.
- Can multiple teachers share the same name? Yes.
- Can multiple students share the same data?
- Does the order of the output array matter?
  - Example indicates Yes.

Edge Cases
-


Examples, Test Cases
------------------------------------------
Input
[{
  teacher: "Ms. Car",
  data: [{
     name: "James",
     emergenceNumber: "617-771-1082",
  }, {
     name: "Alice",
     alergies: ["nuts", "carrots"],
  }],
}, {
  teacher: "Mr. Lamb",
  data: [{
    name: "Aaron",
    age: 3
  }]
}]

Output:
[{
  teacher: "Ms. Car",
  name: "James",
  emergencyNumber: "617-771-1082",
}, {
  teacher: "Ms. Car",
  name: "Alice",
  alergies: ["nuts", "carrots"],
}, {
  teacher: "Mr. Lamb",
  name: "Aaron",
  age: 3,
}]

Data Structure
------------------------------------------
Iterate over arrays. Perform operations on objects, and create new objects.
Assemble results in new array.

Algorithm
------------------------------------------
- Create result array.
- Iterate over array of teacher objects.
  - Extract the teacher name.
  - Iterate over the `data` property containing the student objects.
    - Create a new object containing all the data in the object.
    - Add to that object a `teacher` property, with the teacher name.
    - Append the new student object to the result array.
- Return the result array.

*/

'use strict';

function ungroupStudents(students) {
  let result = [];

  students.forEach((teacherObj) => {
    let teacherName = teacherObj.teacher;
    teacherObj.data.forEach((studentObj) => {
      let newStudentObj = { teacher: teacherName };
      Object.assign(newStudentObj, studentObj);
      result.push(newStudentObj);
    });
  });

  return result;
}

console.log(
  ungroupStudents([
    {
      teacher: 'Ms. Car',
      data: [
        {
          name: 'James',
          emergenceNumber: '617-771-1082',
        },
        {
          name: 'Alice',
          alergies: ['nuts', 'carrots'],
        },
      ],
    },
    {
      teacher: 'Mr. Lamb',
      data: [
        {
          name: 'Aaron',
          age: 3,
        },
      ],
    },
  ])
);

/*
[
  {
    teacher: 'Ms. Car',
    name: 'James',
    emergencyNumber: '617-771-1082',
  },
  {
    teacher: 'Ms. Car',
    name: 'Alice',
    alergies: ['nuts', 'carrots'],
  },
  {
    teacher: 'Mr. Lamb',
    name: 'Aaron',
    age: 3,
  },
];
*/
