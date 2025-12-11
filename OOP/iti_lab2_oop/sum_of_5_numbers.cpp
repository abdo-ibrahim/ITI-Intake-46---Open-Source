
#include <bits/stdc++.h>

using namespace std;

int main() {
  int sum = 0;
  for (int i = 1; i <= 5; i++) {
    int num;
    cout << "Enter number " << i << ": ";
    cin >> num;
    sum += num;
  }
  cout << "sum of the 5 numbers = " << sum << endl;
}
