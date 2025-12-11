#include <iostream>

using namespace std;

struct Employee {
  int id;
  string name;
  int age;
};
int main() {
  Employee emp[2];
  for (int i = 0; i < 2; i++) {
    cout << "Enter id | name | age no " << i + 1 << ": ";
    cin >> emp[i].id >> emp[i].name >> emp[i].age;
  }
  for (int i = 0; i < 2; i++) {
    cout << "Employee no " << i + 1 << ": ";
    cout << "id= " << emp[i].id << " | ";
    cout << "name= " << emp[i].name << " | ";
    cout << "age= " << emp[i].age << endl;
  }
  return 0;
}
