const fs = require("fs");

const studentData = [
  {
    id: 1,
    name: "Alice Johnson",
    age: 20,
    course: "Computer Science",
    grades: {
      math: 90,
      programming: 95,
    },
  },
  {
    id: 2,
    name: "Bob Smith",
    age: 22,
    course: "Data Science",
    grades: {
      statistics: 88,
      machine_learning: 92,
    },
  },
  {
    id: 3,
    name: "Carol Williams",
    age: 21,
    course: "Web Development",
    grades: {
      html: 95,
      javascript: 89,
    },
  },
];

const filePath = "students.json";

function writeDataToFile(data) {
  fs.writeFileSync(filePath, JSON.stringify(data), "utf-8", (err) => {
    if (err) {
      console.error("Error writing file:", err);
    } else {
      console.log("Student data written file.");
    }
  });
}
writeDataToFile(studentData);

function readDataFromFile(filePath) {
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
    } else {
      console.log("File content:", JSON.parse(data));
    }
  });
}
readDataFromFile(filePath);

function addStudent(newStudent) {
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  data.push(newStudent);
  writeDataToFile(data);
}
const newStudent = {
  id: 4,
  name: "David Brown",
  age: 23,
  course: "Cybersecurity",
  grades: {
    networking: 91,
    cryptography: 89,
  },
};
addStudent(newStudent);

function updateStudentCourse(studentId, newCourse) {
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const student = data.find((s) => s.id === studentId);
  if (student) {
    student.course = newCourse;
    writeDataToFile(data);
    console.log(`Updated course for student ID ${studentId} done`);
  } else {
    console.log(`Student with ID ${studentId} not found.`);
  }
}
updateStudentCourse(2, "AI");

function deleteStudent(studentId) {
  let data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  data = data.filter((s) => s.id !== studentId);
  writeDataToFile(data);
  console.log(`Deleted student with ID ${studentId} done`);
}
deleteStudent(3);


