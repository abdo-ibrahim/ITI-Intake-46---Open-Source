#include <iostream>

using namespace std;

int main() {
  cout << "Enter size of array: ";
  int n;
  cin >> n;
  cout << "Enter array: ";
  int arr[n];
  for (int i = 0; i < n; i++) {
    cin >> arr[i];
  }
  int* ptr = arr;
  for (int i = 0; i < n; i++) {
    cout << arr[i] << " ";
    cout << i[arr] << " ";
    cout << *(arr + i) << " ";
    // cout << *(ptr + i) << " ";
    cout << *ptr++ << " ";
    cout << endl;
  }

  return 0;
}
