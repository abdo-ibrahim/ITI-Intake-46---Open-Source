#include <iostream>

using namespace std;

class Employee{
 private:
  int id;
  string name;
  int age;
  float salary;

 public:
  Employee() {
    id = 0;
    name = "Unknown";
    age = 0;
    salary = 0.0;
  }
  Employee(int id){
    this->id = id;
  }
  Employee(int id, string name): Employee(id){
    this->name = name;
  }
  Employee(int id, string name, int age): Employee(id , name){
    this->age = age;
  }
  Employee(int id, string name, int age, float salary) : Employee(id, name, age){
    this->salary = salary;
  }

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
  Employee emp(5, "Abdo", 22, 7000);
  emp.print();

  return 0;
}
