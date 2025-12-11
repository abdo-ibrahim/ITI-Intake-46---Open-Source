
#include <bits/stdc++.h>
#include <conio.h>
#include <windows.h>

void textattr(int attr) {
  SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE), attr);
}
using namespace std;

struct Employee {
  int id;
  string name;
  int age;
};
void printEmployees(Employee emp[], int sz) {
  bool isThereEmployees = false;
  for (int i = 0; i < sz; i++) {
    if(emp[i].id == 0) continue;
    isThereEmployees = true;
    cout << "Employee no " << i + 1 << ": ";
    cout << "id= " << emp[i].id << " | ";
    cout << "name= " << emp[i].name << " | ";
    cout << "age= " << emp[i].age << endl;
  }
  if(!isThereEmployees) {
    cout << "There is no Employees";
  }
}
Employee addEmployee() {
  Employee newEmp;
  cout << "Enter id | name | age: ";
  cin >> newEmp.id >> newEmp.name >> newEmp.age;
  return newEmp;
}
int main() {
  bool flag = true;
  int highlighted = 0;
  Employee emp[10] = {};
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
      case 13: // enter
        if (highlighted == 0) {  // new
          system("cls");
          cout << "Enter place of employee 0-9: ";
          int idx;
          cin >> idx;
          bool isExist = true;
          if (emp[idx].id) {
            cout << "you cannot add employee already exist" << endl;
            isExist = false;
          }
          if (isExist) {
            Employee newEmp = addEmployee();
            emp[idx].id = newEmp.id;
            emp[idx].name = newEmp.name;
            emp[idx].age = newEmp.age;
            cout << "Employee added successful" << endl;
          }
          cout << "press any key to continue...";
          getch();
        } else if (highlighted == 1) {  // print
          system("cls");
          printEmployees(emp, 10);
          cout << "press any key to continue...";
          getch();
        } else if (highlighted == 2) {  // exit
          flag = false;
        }
        break;
      case 27:  // esc
      case 'e': // exit
        flag = false;
        break;
    }

  } while (flag);

  return 0;
}
