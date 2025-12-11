#include <bits/stdc++.h>
using namespace std;
int main() {
  // 2^3 = 2 * 2 * 2
  int base, power;
  cout << "Enter base number: ";
  cin >> base;
  cout << "Enter power number: ";
  cin >> power;
  long long result = 1;
  for (int i = 1; i <= power; i++) {
    result *= base;
  }
  cout << "the result is: " << result << endl;
  return 0;
}
