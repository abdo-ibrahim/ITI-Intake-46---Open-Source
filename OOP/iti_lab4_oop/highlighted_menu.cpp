#include <bits/stdc++.h>
#include <conio.h>
#include <windows.h>

void textattr(int attr) {
  SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE), attr);
}
using namespace std;

int main() {
  bool flag = true;
  int highlighted = 0;
  do {
    system("cls");
    string menu[] = {"New", "Display", "Exit"};
    for (int i = 0; i < 3; i++) {
      if (i == highlighted) textattr(0x0C);
      cout << menu[i] << "\n";
      textattr(0x07);
    }
    char ch;
    ch = getch();
    switch (ch) {
      case -32:  // extended key
        ch = getch();
        switch (ch) {
          case 72:  // up
            highlighted--;
            highlighted = (highlighted + 3) % 3;
            // if(highlighted < 0) highlighted = 2;
            break;
          case 80:  // down
            highlighted++;
            highlighted = (highlighted + 3) % 3;
            break;
          case 71:  // home
            highlighted = 0;
            break;
          case 79:  // end
            highlighted = 2;
            break;
        }
        break;
      case 13:  // enter
        break;
      case 27:  // esc
      case 'e':
        flag = false;
        break;
    }

  } while (flag);

  return 0;
}
