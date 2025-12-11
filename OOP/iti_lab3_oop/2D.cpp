#include <windows.h>

#include <iostream>

void textattr(int attr) {
  SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE), attr);
}
using namespace std;
int main() {
  int rows, cols;
  cout << "Enter num of rows and cols: ";
  cin >> rows >> cols;
  int arr[rows][cols];
  cout << "Enter elements of array: " << endl;
  for (int i = 0; i < rows; i++) {
    for (int j = 0; j < cols; j++) {
      cin >> arr[i][j];
    }
  }
  // sum of each row
  cout << "sum of array: " << endl;
  for (int i = 0; i < rows; i++) {
    int sumRow = 0;
    for (int j = 0; j < cols; j++) {
      cout << arr[i][j] << "\t";
      sumRow += arr[i][j];
    }
    textattr(0x0C);
    cout << "|\t" << sumRow << endl;
    textattr(0x07);
  }

  cout << "----------------------------------" << endl;
  // avg of each column
  cout << "avg of array: " << endl;
  double colAvg[cols] = {0};
  for (int j = 0; j < cols; j++) {
    int sumCol = 0;
    for (int i = 0; i < rows; i++) {
      cout << arr[j][i] << "\t";
      sumCol += arr[i][j];
    }
    colAvg[j] = 1.0 * sumCol / rows;
    cout << endl;
  }
  cout << "----------------------------------" << endl;
  textattr(0x0C);
  for (int j = 0; j < cols; j++) {
    cout << colAvg[j] << "\t";
  }
  cout << endl;
  textattr(0x07);

  return 0;
}
