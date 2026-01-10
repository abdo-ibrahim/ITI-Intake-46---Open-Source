#include <iostream>

using namespace std;

void selectionSort(int arr[], int n) {
  for (int i = 0; i < n - 1; i++) {
    int minIndex = i;
    for (int j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    swap(arr[i], arr[minIndex]);
  }
}

void bubbleSort(int arr[], int n) {
  for (int i = 0; i < n - 1; i++) {
    bool swapped = false;
    for (int j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swapped = true;
        swap(arr[j], arr[j + 1]);
      }
    }
    if (!swapped) {
      break;
    }
  }
}

void insertionSort(int arr[], int n) {
  for (int i = 1; i < n; i++) {
    int key = arr[i];
    int j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
}

int main() {
  int arr[] = {64, 34, 25, 12, 22, 11, 90};
  int n = sizeof(arr) / sizeof(arr[0]);
  cout << "original array:\n";
  for (int i = 0; i < n; i++) {
    cout << arr[i] << " ";
  }

  selectionSort(arr, n);
  cout << "\nsorted array:\n";
  for (int i = 0; i < n; i++) {
    cout << arr[i] << " ";
  }

  int arr1[] = {64, 34, 25, 12, 22, 11, 90};
  bubbleSort(arr1, n);
  cout << "\nsorted array:\n";
  for (int i = 0; i < n; i++) {
    cout << arr1[i] << " ";
  }
  int arr2[] = {64, 34, 25, 12, 22, 11, 90};
  insertionSort(arr2, n);
  cout << "\nSorted array:\n";
  for (int i = 0; i < n; i++) {
    cout << arr2[i] << " ";
  }
  return 0;
}
