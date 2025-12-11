#include <iostream>

using namespace std;
class person{
 private:
  int id;
  string name;
  int age;

 public:
  person(){
    id = 0;
    name = "unknown";
    age = 0;
  }
  person(int _id, string _name){
    id = _id;
    name = _name;
    age = 0;
  }
  person(int _id, string _name, int _age){
    id = _id;
    name = _name;
    age = _age;
  }
  void print(){
    cout << id << " | " << name << " | " << age;
  }
};
class employee : public person{
 private:
  double salary;

 public:
  employee(int _id, string _name, int _age, double _salary) : person(_id, _name, _age){
    salary = _salary;
  }
  void print(){
    person::print();
    cout << " | salary: " << salary << endl;
  }
};
class student : public person{
 private:
  double grade;

 public:
  student(int _id, string _name, int _age, double _grade) : person(_id, _name, _age) {
    grade = _grade;
  }
  void print(){
    person::print();
    cout << " | grade: " << grade << endl;
  }
};
int main()
{
  person p1(1, "abdo", 23);
  p1.print();
  cout << endl;
  employee e1(2, "ahmed", 20, 5000);
  e1.print();
  cout << endl;
  student s1(3, "mohamed", 18, 95);
  s1.print();

  return 0;
}
