// Additiononal Requirements
let dateInput = "21-12-2025";
function getDateName(dateStr) {
  let dateParts = dateStr.split("-");
  let day = parseInt(dateParts[0]);
  let month = parseInt(dateParts[1]) - 1;
  let year = parseInt(dateParts[2]);
  let dateObj = new Date(year, month, day);
  let dayIndex = dateObj.getDay();
  let dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return dayNames[dayIndex];
}
let dayName = getDateName(dateInput);
console.log("Day Name: " + dayName);

// Modify Task 6
function validateMobileNumber() {
  let mobile = prompt("Enter your mobile number (00201xxxxxxxxx):");
  let mobilePattern = /^00201[0-2]\d{8}$/;
  while (!mobilePattern.test(mobile)) {
    mobile = prompt("invalid mobile number please enter a valid mobile number (format: 00201xxxxxxxxx):");
  }
  return mobile;
}
let mobileNumber = validateMobileNumber();
console.log("Valid Mobile Number: " + mobileNumber);

function calculateAge(birthDateStr, currentDateStr) {
  let birthParts = birthDateStr.split("-");
  let birthDay = parseInt(birthParts[0]);
  let birthMonth = parseInt(birthParts[1]) - 1;
  let birthYear = parseInt(birthParts[2]);

  let currentParts = currentDateStr.split("-");
  let currentDay = parseInt(currentParts[0]);
  let currentMonth = parseInt(currentParts[1]) - 1;
  let currentYear = parseInt(currentParts[2]);

  let ageYears = currentYear - birthYear;
  let ageMonths = currentMonth - birthMonth;
  let ageDays = currentDay - birthDay;
  if (ageDays < 0) {
    ageMonths--;
    let daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
    ageDays += daysInPrevMonth;
  }
  if (ageMonths < 0) {
    ageYears--;
    ageMonths += 12;
  }
  return { years: ageYears, months: ageMonths, days: ageDays };
}
let birthDateStr = "30-12-2000";
let currentDateStr = "01-11-2018";
let age = calculateAge(birthDateStr, currentDateStr);
console.log(`Age: ${age.years} years, ${age.months} months, ${age.days} days`);
