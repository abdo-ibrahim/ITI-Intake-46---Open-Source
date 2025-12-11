#include <iostream>

using namespace std;
void swap(int* x, int* y) {
  int temp;
  temp = *x;
  *x = *y;
  *y = temp;
}
int main() {
  cout << "Enter two vars: ";
  int a, b;
  cin >> a >> b;
  cout << "vars before swap: " << a << " " << b << endl;
  swap(&a, &b);
  cout << "vars after swap: " << a << " " << b << endl;
  return 0;
}
