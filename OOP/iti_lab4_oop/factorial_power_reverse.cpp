#include <iostream>

using namespace std;

// factorial function
long long factorial(int n) {
  long long result = 1;
  for (int i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

// power function
long long power(int base, int exp) {
  long long result = 1;
  for (int i = 0; i < exp; i++) {
    result *= base;
  }
  return result;
}

// reverse number function
int reverseNumber(int n) {
  int reversed = 0;
  while (n != 0) {
    int digit = n % 10;
    reversed = reversed * 10 + digit;
    n /= 10;
  }
  return reversed;
}
int main() {
  int num;
  cout << "Enter a positive number: ";
  cin >> num;
  cout << "factorial: " << factorial(num) << endl;
  cout << "Power of 2 ^ " << num << ": " << power(2, num) << endl;
  cout << "reversed: " << reverseNumber(321) << endl;
  return 0;
}
