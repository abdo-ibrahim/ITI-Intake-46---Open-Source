#include <iostream>

using namespace std;

class Employee{
 private:
  int id;
  string name;
  int age;
  float salary;

 public:
  void SetId(int _id){
    id = _id;
  }
  void SetName(string _name){
    name = _name;
  }
  void SetAge(int _age){
    age = _age;
  }
  void SetSalary(float _salary){
    salary = _salary;
  }

  int GetId(){
    return id;
  }
  string GetName(){
    return name;
  }
  int GetAge(){
    return age;
  }
  float GetSalary(){
    return salary;
  }
  void print(){
    cout << "id: " << id << endl;
    cout << "name: " << name << endl;
    cout << "age: " << age << endl;
    cout << "salary: " << salary << endl;
  }
};

int main() {
  Employee emp;
  emp.SetId(1);
  emp.SetAge(23);
  emp.SetName("Abdo");
  emp.SetSalary(1500.25);
  emp.print();

  return 0;
}
