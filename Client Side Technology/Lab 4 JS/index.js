// Question 1

const tips = [
  "Stay hydrated!",
  "Take regular breaks while working.",
  "Keep a positive mindset.",
  "Exercise regularly.",
  "Maintain a balanced diet.",
  "Get enough sleep each night.",
  "Practice mindfulness and meditation.",
  "Set achievable goals.",
  "Stay organized with a to-do list.",
  "Learn something new every day.",
];

const randomIndex = Math.floor(Math.random() * tips.length);
document.write(`Tip of the day: ${tips[randomIndex]}`);

// Question 2
let grades = [60, 100, 10, 15, 85];
grades.sort((a, b) => b - a);
console.log(grades);

let sum = grades.reduce((acc, grade) => {
  return acc + grade;
}, 0);

console.log(sum);
// B
let highestGrade = grades.find((grade) => {
  return grade <= 100;
});
console.log(highestGrade);

// C
let gradesBellow60 = grades.filter((grade) => grade < 60);
console.log(gradesBellow60);

// Question 3

let students = [
  {
    name: "abdulrahman",
    degree: 95,
  },
  {
    name: "ahmed",
    degree: 100,
  },
  {
    name: "mohamed",
    degree: 90,
  },
  {
    name: "ali",
    degree: 65,
  },
  {
    name: "ibrahim",
    degree: 75,
  },
  {
    name: "yehia",
    degree: 50,
  },
  {
    name: "sara",
    degree: 40,
  },
];

let studentmax = {};
let mx = 0;
students.forEach((student) => {
  if (student.degree > mx) {
    mx = student.degree;
    studentmax = student;
  }
});
console.log(studentmax);

// a
let studentBetween90And100 = students.find((student) => student.degree >= 90 && student.degree <= 100).name;

console.log(studentBetween90And100);

// b
students.forEach((student) => {
  if (student.degree < 60) {
    console.log(student.name);
  }
});

// c
students[students.length] = {
  name: "yassin",
  degree: 30,
};
students.forEach((student) => console.log(student));

// d
students.pop();
console.log("remaining after remove last");
students.forEach((student) => console.log(student));

// e
students.sort((a, b) => a.name.localeCompare(b.name));
console.log(students);

// f
students.splice(
  2,
  0,
  {
    name: "sara",
    degree: 30,
  },
  {
    name: "abdo",
    degree: 20,
  }
);
console.log(students);

// g
students.splice(3, 1);
console.log(students);
