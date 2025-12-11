#include <iostream>

using namespace std;

struct Student {
  string name;
  int age;
  float grade;
};
int main() {
  Student student1;
  cout << "Enter name | age | grade: ";
  cin >> student1.name >> student1.age >> student1.grade;

  cout << "name: " << student1.name << endl;
  cout << "age: " << student1.age << endl;
  cout << "grade: " << student1.grade << endl;
  return 0;
}
