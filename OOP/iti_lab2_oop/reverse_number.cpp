#include <bits/stdc++.h>
using namespace std;
// 1.2.3
// d=3 , reverse 3
// d=2 , reverse 30 + 2 = 320+1=321
int main() {
  int number;
  cout << "Enter a number: ";
  cin >> number;
  int reversed = 0;
  while (number) {
    int digit = number % 10;
    reversed = reversed * 10 + digit;
    number /= 10;
  }
  cout << "Reversed number: " << reversed << endl;
  return 0;
}
