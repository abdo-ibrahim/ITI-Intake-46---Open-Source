
// Task 2: Count Vowels
function countVowels(str) {
  let vowels = "aeiou";
  let count = 0;
  for (let char of str) {
    if (vowels.includes(char.toLowerCase())) {
      count++;
    }
  }
  return count;
}
let vowelCount = countVowels("AppleuedoeoddEIOU");
console.log(vowelCount);

// Task 3: Capitalize Words
function capitalizeWords(str) {
  let words = str.split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].slice(1).toLowerCase();
  }
  return words.join(" ");
}
let strCaptalize = capitalizeWords("heLLo woRLd froM jAVaSCrIPT");
console.log(strCaptalize);

// Task 4: Count Character Occurrences
function countCharacterOccurrences(str, char) {
  let count = 0;
  for (let c of str) {
    if (c.toLowerCase() === char.toLowerCase()) {
      count++;
    }
  }
  return count;
}
let charCount = countCharacterOccurrences("abdo ibrahim", "a");
console.log(charCount);

// Task 5: Count Words
function countWords(str) {
  let words = str.trim().split(" ");
  return words.length;
}
let wordCount = countWords("  Hello world from JavaScript  ");
console.log(wordCount);
