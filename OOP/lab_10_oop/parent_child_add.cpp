#include <iostream>
using namespace std;
class Parent{
 protected:
  int x, y;

 public:
  Parent() : x(0), y(0) {}
  Parent(int x, int y) : x(x), y(y) {}
  virtual void add(){
    cout << "parent sum: " << x + y << endl;
  }
};
class Child : public Parent{
 protected:
  int z;

 public:
  Child() : Parent(), z(0) {}
  Child(int x, int y, int z) : Parent(x, y), z(z) {}
  void add(){
    cout << "child sum: " << x + y + z << endl;
  }
};
int main()
{
  // static binding
  Parent p(1, 2); //3
  p.add();
  Child c(1, 2, 3); //6
  c.add();
  // dynamic binding
  Parent* ptr;
  ptr = &c;
  ptr->add();

  return 0;
}
