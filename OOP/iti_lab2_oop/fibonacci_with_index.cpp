#include <bits/stdc++.h>
using namespace std;

// 0 1 1 2 3 5 8 13 21
int main() {
  int index;
  cout << "Enter  index of fibonacci number: ";
  cin >> index;
  int a = 0, b = 1, fib;
  if (index == 0) {
    fib = a;
  } else if (index == 1) {
    fib = b;
  } else {
    for (int i = 2; i <= index; i++) {
      fib = a + b;
      a = b;
      b = fib;
    }
  }
  cout << "fibonacci number of index " << index << " is: " << fib << endl;
  return 0;
}
