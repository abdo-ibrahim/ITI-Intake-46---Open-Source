// Task 1: Array Operations

let repeat = true;
let arr = getArrayFromUser();

while (repeat) {
  let choice = displayMenu();

  performOperation(arr, choice);

  let repeatChoice = confirm("Do you want to repeat the program?");
  repeat = repeatChoice;
}

function getArrayFromUser() {
  let size = parseInt(prompt("Enter the size of the array:"));

  let arr = [];

  for (let i = 0; i < size; i++) {
    let value = prompt(`Enter value ${i + 1} of ${size}:`);

    while (isNaN(Number(value)) || value === null || value.trim() === "") {
      value = prompt(`Invalid number please enter a valid number for value ${i + 1}:`);
    }

    arr.push(Number(value));
  }

  return arr;
}

function displayMenu() {
  return prompt(
    `Enter a letter from a to h:
a - Display the array in the same order it was entered
b - Display the array in ascending order
c - Display the array in descending order
d - Display the reversed version of the original array
e - Display only even numbers from the array
f - Display elements divisible by a number you choose
g - Display array with 30% discount applied
h - Display numbers concatenated with ***`
  );
}

function performOperation(arr, choice) {
  switch (choice.toLowerCase()) {
    case "a":
      alert("arr in original order:\n" + arr.join(", "));
      break;

    case "b":
      let asc = [...arr].sort((a, b) => a - b);
      alert("arr in asc order:\n" + asc.join(", "));
      break;

    case "c":
      let desc = [...arr].sort((a, b) => b - a);
      alert("arr in desc order:\n" + desc.join(", "));
      break;

    case "d":
      let reversed = [...arr].reverse();
      alert("reversed arr:\n" + reversed.join(", "));
      break;

    case "e":
      let evenNumbers = arr.filter((num) => num % 2 === 0);
      if (evenNumbers.length === 0) {
        alert("No even numbers found in array");
      } else {
        alert("Even numbers:\n" + evenNumbers.join(", "));
      }
      break;

    case "f":
      let divisor = parseInt(prompt("Enter a number to that u want to check divisibility:"));

      while (divisor === 0) {
        divisor = parseInt(prompt("Invalid input please enter a valid number:"));
      }

      let divisible = arr.filter((num) => num % divisor === 0);
      if (divisible.length === 0) {
        alert(`No numbers in array divisible by ${divisor}!`);
      } else {
        alert(`Numbers divisible by ${divisor}:\n` + divisible.join(", "));
      }
      break;

    case "g":
      let discounted = arr.map((num) => num * 0.7);
      alert("Array with 30% discount applied:\n" + discounted.join(", "));
      break;

    case "h":
      let concatenated = arr.join("***");
      alert("Numbers concatenated with ***:\n" + concatenated);
      break;

    default:
      alert("invalid choice please select a valid option (a-h)");
      return false;
  }
  return true;
}
