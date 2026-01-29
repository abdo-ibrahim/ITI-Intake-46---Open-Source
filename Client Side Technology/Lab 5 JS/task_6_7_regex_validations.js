// Task 6: User Name and Mobile Validation
let userName = validateUserInput();
let mobileNumber = validateMobileNumber();
console.log("Valid Name: " + userName);
console.log("Valid Mobile Number: " + mobileNumber);

function validateUserInput() {
  let name = prompt("Enter your name:");
  while (!isNaN(name) || name === null || name.trim() === "") {
    name = prompt("Invalid name please enter a valid name:");
  }
  return name;
}

function validateMobileNumber() {
  let mobile = prompt("Enter your mobile number (xxx-xxxxxxx):");
  let mobilePattern = /^(010|011|012|015)-\d{7}$/;
  while (!mobilePattern.test(mobile)) {
    mobile = prompt("invalid mobile number please enter a valid mobile number (format: xxx-xxxxxxx):");
  }
  return mobile;
}

// Task 7: 1- Birth Date Validation

let birthDate = validateBirthDate();
console.log("Valid Birth Date: " + birthDate);

function validateBirthDate() {
  let dateInput = prompt("Enter your birth date (DD/MM/YYYY):");
  let datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
  while (!datePattern.test(dateInput)) {
    dateInput = prompt("Invalid date format please enter a valid birth date (DD/MM/YYYY):");
  }
  return dateInput;
}

// 2- Valid Date Format
function isValidDateFormat(dateStr) {
  if (dateStr.length !== 10) {
    return false;
  }
  if (dateStr[2] !== "-" || dateStr[5] !== "-") {
    return false;
  }
  return true;
}
let dateInput = "12-05-2023";
let validDate = isValidDateFormat(dateInput);
if (validDate) {
  let dateParts = dateInput.split("-");
  let day = parseInt(dateParts[0]);
  let month = parseInt(dateParts[1]) - 1;
  let year = parseInt(dateParts[2]);

  let dateObj = new Date(year, month, day);
  alert(dateObj.toDateString());
} else {
  alert("Wrong Date Format");
}
