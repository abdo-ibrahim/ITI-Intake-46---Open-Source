#include <iostream>

using namespace std;

int main() {
  cout << "Enter size of array: ";
  int n;
  cin >> n;
  cout << "Enter array: ";
  int* arr = new int[n];
  for (int i = 0; i < n; i++) {
    cin >> arr[i];
  }
  for (int i = 0; i < n; i++) {
    cout << arr[i] << " ";
  }
  cout << endl;
  delete arr;
  return 0;
}
