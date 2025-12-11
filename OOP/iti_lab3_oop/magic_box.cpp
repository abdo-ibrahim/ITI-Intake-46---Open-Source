#include <iostream>
using namespace std;
int main() {
  int n;
  cout << "Enter size of magic box: ";
  cin >> n;
  int box[n + 1][n + 1] = {0};
  // Rule: 1
  int row = 1;
  int col = (n + 1) / 2;
  box[row][col] = 1;

  for (int i = 2; i <= n * n; i++) {
    // if prev number is multiple of n
    if ((i - 1) % n == 0) {
      row = row + 1;
    } else {
      row = row - 1;
      col = col - 1;
    }
    // turn around
    if (row == 0) row = n;
    if (col == 0) col = n;

    if (row > n) row = 1;

    box[row][col] = i;
  }

  for (int i = 1; i <= n; i++) {
    for (int j = 1; j <= n; j++) {
      cout << box[i][j] << "\t";
    }
    cout << endl;
  }
  return 0;
}
