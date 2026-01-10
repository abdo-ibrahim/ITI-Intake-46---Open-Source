#include <iostream>

using namespace std;

// merge sort
void merge(int arr[], int left, int mid, int right) {
  int n1 = mid - left + 1;
  int n2 = right - mid;
  int L[n1], R[n2];
  for (int i = 0; i < n1; i++) L[i] = arr[left + i];
  for (int j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];

  int i = 0, j = 0, k = left;

  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      arr[k] = L[i++];
    } else {
      arr[k] = R[j++];
    }
    k++;
  }

  while (i < n1) {
    arr[k++] = L[i++];
  }
  while (j < n2) {
    arr[k++] = R[j++];
  }
}

void mergeSort(int arr[], int left, int right) {
  if (left < right) {
    int mid = left + (right - left) / 2;
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
  }
}

// Quick sort
int partition(int arr[], int low, int high) {
  int pivot = arr[high];  // last element as pivot
  int i = low - 1;

  for (int j = low; j <= high - 1; j++) {
    if (arr[j] < pivot) {
      i++;
      swap(arr[i], arr[j]);
    }
  }
  swap(arr[i + 1], arr[high]);
  return i + 1;
}
void quickSort(int arr[], int low, int high) {
  if (low < high) {
    int pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}

int main() {
  int arr1[] = {12, 11, 13, 5, 6, 7};
  int arr2[] = {12, 11, 13, 5, 6, 7};

  // before sorting
  cout << "Original array: ";
  int sz = sizeof(arr1) / sizeof(arr1[0]);
  for (int i = 0; i < sz; i++) {
    cout << arr1[i] << " ";
  }
  cout << endl;
  // with merge sort
  mergeSort(arr1, 0, sz - 1);
  cout << "Merge Sort: ";
  for (int i = 0; i < sz; i++) {
    cout << arr1[i] << " ";
  }

  cout << endl;

  // with quick sort
  quickSort(arr2, 0, sz - 1);
  cout << "Quick Sort: ";
  for (int i = 0; i < sz; i++) {
    cout << arr2[i] << " ";
  }
  return 0;
}
