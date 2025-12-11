#include <bits/stdc++.h>
using namespace std;
int main() {
  int number;
  cout << "Enter a number: ";
  cin >> number;
  int factorial = 1;
  for (int i = 1; i <= number; i++) {
    factorial *= i;
  }
  cout << "factorial of " << number << " = " << factorial << endl;

  return 0;
}
