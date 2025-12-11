#include <iostream>

using namespace std;
class Person{
  string name;
  int age;
  string city;
public:
  void SetName(string _name){
    if(_name.size() < 2){
      cout << "name can't less than 2" << endl;
    }
    else {
      name = _name;

    }
  }
  void SetAge(int _age){
    if(_age < 0){
      cout << "age can't be negative";
    }
    else{
      age = _age;
    }
  }
};

int main()
{
    Person p;
    p.SetAge(20);
    p.SetAge(-5);

    p.SetName("fdgf");
    p.SetName("d");

    return 0;
}
