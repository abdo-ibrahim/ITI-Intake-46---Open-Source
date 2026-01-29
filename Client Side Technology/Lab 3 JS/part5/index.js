// ### Task 5.1: Odd/Even Check
function parityCheck(num) {
  if (num & 1) {
    return "odd";
  } else {
    return "even";
  }
}
console.log(parityCheck(5)); // odd
console.log(parityCheck(10)); // even

// ### Task 5.2: Loop (1–10) : Print numbers 1 to 10 using loops.
for (let i = 1; i <= 10; i++) {
  console.log(i);
}

// ### Task 5.3: Sign Check: Check if a number is negative, positive, or zero.
function signCheck(num) {
  if (num > 0) {
    return "positive";
  } else if (num < 0) {
    return "negative";
  } else {
    return "zero";
  }
}

console.log(signCheck(5)); // positive
console.log(signCheck(-3)); // negative
console.log(signCheck(0)); // zero

// ### Task 5.4: Multiplication Table: Print multiplication table for any number in the console.
function multiplicationTable(num) {
  for (let i = 1; i <= 12; i++) {
    console.log(`${num} x ${i} = ${num * i}`);
  }
}
multiplicationTable(5);

// ### Task 5.5: Day of Week: Write a program that takes a number from 1 to 7 and prints the corresponding day of the week (e.g., 1 -> "Sunday", 2 -> "Monday", etc.).

function dayOfWeek(dayNum) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[dayNum - 1];
}
console.log(dayOfWeek(4)); // Thursday

// ### Task 5.6: Weekend/Weekday: Write a program that takes a day number and prints whether it's a weekend or a weekday.
function weekendOrWeekday(dayNum) {
  if (dayNum % 6 === 0) {
    return "Weekend";
  } else {
    return "Weekday";
  }
}
console.log(weekendOrWeekday(6)); // Weekend
console.log(weekendOrWeekday(7)); // Weekday

// toString
var number = 30;
console.log(number.toString(16));
