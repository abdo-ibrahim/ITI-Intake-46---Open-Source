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

  // 7 elements
  // 5 2 3 2 5 1 2
  // - 2 - - - - 2  ==> 5
  int max_dist=-1 , ele_dist=arr[0];
  for (int i = 0; i < n; i++) {
    for (int j = i + 1; j < n; j++) {
      if (arr[i] == arr[j]) {
        max_dist = max(max_dist, j - i);
        ele_dist = arr[i];
      }
    }
  }

  if (max_dist != -1) {
    cout <<  "the num has max dist between equal elements is " << ele_dist << " and max dist = " << max_dist << endl;
  } else {
    cout << "no equal elements found" << endl;
  }

  return 0;
}
