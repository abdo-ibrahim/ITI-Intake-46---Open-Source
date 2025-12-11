
#include <bits/stdc++.h>

using namespace std;

int main() {
  int grade;
  cout << "Enter Your Grade: ";
  cin >> grade;
  if (grade >= 90) {
    cout << "Excellent" << endl;
  } else if (grade >= 75) {
    cout << "Very Good" << endl;
  } else if (grade >= 60) {
    cout << "Good" << endl;
  } else if (grade >= 50) {
    cout << "Pass" << endl;
  } else {
    cout << "Fail" << endl;
  }

  return 0;
}
