#include <iostream>
using namespace std;
int main() {
  int n;
  cout << "Enter size of array: ";
  cin >> n;
  int arr[n];
  cout << "Enter elements of array: ";
  for (int i = 0; i < n; i++) {
    cin >> arr[i];
  }

  // sum and average
  int sum = 0;
  for (int i = 0; i < n; i++) {
    sum += arr[i];
  }
  double average = 1.0 * sum / n;
  cout << "Sum of array elements: " << sum << endl;
  cout << "Average of array elements: " << average << endl;

  // min and max element
  int min = arr[0], max = arr[0];
  for (int i = 1; i < n; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
    if (arr[i] < min) {
      min = arr[i];
    }
  }
  cout << "Max element in array: " << max << endl;
  cout << "Min element in array: " << min << endl;

  // search for element
  int key;
  cout << "Enter element you want to search: ";
  cin >> key;
  int idx = -1;
  for (int i = 0; i < n; i++) {
    if (arr[i] == key) {
      idx = i;
      break;
    }
  }
  if (idx != -1) {
    cout << "element " << key << " found at idx " << idx << endl;
  } else {
    cout << "element " << key << " not found" << endl;
  }
  return 0;
}














