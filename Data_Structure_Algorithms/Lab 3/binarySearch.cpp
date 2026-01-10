#include <iostream>

using namespace std;
int binarySearch(int arr[], int size, int key) {
  int low = 0, high = size - 1, mid;
  while (low <= high) {
    mid = (low + high) / 2;
    if (arr[mid] == key) {
      return mid;
    } else if (arr[mid] < key) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return -1;
}
int binarySearchRecursive(int arr[], int low, int high, int key) {
  if (low > high) {
    return -1;
  }
  int mid = (low + high) / 2;
  if (arr[mid] == key) {
    return mid;
  } else if (arr[mid] < key) {
    return binarySearchRecursive(arr, mid + 1, high, key);
  } else {
    return binarySearchRecursive(arr, low, mid - 1, key);
  }
}
int main() {
  int arr[] = {2, 3, 4, 10, 40};
  int size = sizeof(arr) / sizeof(arr[0]);
  int key = 10;
  int idx = binarySearch(arr, size, key);
  cout << "using iterative:" << endl;
  if (idx != -1) {
    cout << "element exist at idx " << idx << endl;
  } else {
    cout << "element not exist in array" << endl;
  }
  cout << "using recursive:" << endl;
  key = 4;
  idx = binarySearchRecursive(arr, 0, size - 1, key);
  if (idx != -1) {
    cout << "element exist at idx " << idx << endl;
  } else {
    cout << "element not exist in array" << endl;
  }
  return 0;
}
