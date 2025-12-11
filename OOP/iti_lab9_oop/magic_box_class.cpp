#include <iostream>
using namespace std;


class MagicBox {
  int size;
  int** box;
public:
  MagicBox(int _size) {
    size = _size;
    box = new int*[size + 1];
    for (int i = 0; i <= size; i++) {
      box[i] = new int[size + 1];
    }
  }
  void build(){
    // Rule: 1
    int row = 1;
    int col = (size + 1) / 2;
    box[row][col] = 1;

    for (int i = 2; i <= size * size; i++) {
      // if prev number is multiple of n
      if ((i - 1) % size == 0) {
        row = row + 1;
      } else {
        row = row - 1;
        col = col - 1;
      }
      // turn around
      if (row == 0) row = size;
      if (col == 0) col = size;

      if (row > size) row = 1;

      box[row][col] = i;
    }
  }
  void print(){
    for (int i = 1; i <= size; i++) {
      for (int j = 1; j <= size; j++) {
        cout << box[i][j] << "\t";
      }
      cout << endl;
    }
  }

};

int main() {
  MagicBox mb(5);
  mb.build();
  mb.print();

  return 0;
}
