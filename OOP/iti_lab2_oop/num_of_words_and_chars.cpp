#include <bits/stdc++.h>
using namespace std;
int main() {
  char ch;
  int words = 0, chars = 0;
  bool isWord = false;
  cout << "Enter sentence: ";
  while ((ch = getchar()) != '\n') {
    chars++;
    if (ch == ' ') {
      isWord = false;
    } else {
      if (!isWord) { // first letter in word
        words++;
        isWord = true;
      }
    }
  }
  cout << "number of words: " << words << endl;
  cout << "number of characters: " << chars << endl;
  return 0;
}
