#include <bits/stdc++.h>
#include <conio.h>
using namespace std;

int main() {
  bool flag = true;
  do {
    system("cls");
    cout << "Menu:\nNew\nDisplay\nExit\n";
    char ch;
    ch = getch();
    switch (ch) {
      case 'n':
      case 'N':
        cout << "You select item New\n";
        break;
      case 'd':
      case 'D':
        cout << "You select item Display\n";
        break;
      case 'e':
      case 'E':
        cout << "You select Exit\n";
        flag = false;
        break;
      case 27:
        flag = false;
        break;
    }
    if (flag) getch();

  } while (flag);

  return 0;
}
