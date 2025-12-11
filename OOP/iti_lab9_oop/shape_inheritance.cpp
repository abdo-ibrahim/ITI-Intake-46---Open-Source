#include <iostream>

using namespace std;

const double pi = 3.14;

class shape{
  double dim1, dim2;

 public:
  shape(){
    dim1 = 1, dim2 = 1;
  }
  shape(double d){
    dim1 = d, dim2 = d;
  }
  shape(double d1, double d2){
    dim1 = d1, dim2 = d2;
  }
  void setDim1(double _dim1){
    dim1 = _dim1;
  }
  void setDim2(double _dim2){
    dim2 = _dim2;
  }

  double getDim1(){
    return dim1;
  }
  double getDim2(){
    return dim2;
  }
  void print(){
    cout << "(" << dim1 << "," << dim2 << ")" << endl;
  }
};
class rectangle : public shape{
 public:
  rectangle() : shape(){}
  rectangle(double d1, double d2) : shape(d1, d2) {}
  double area(){
    return getDim1() * getDim2();
  }
  void print(){
    cout << "rectangle: ";
    shape::print();
  }
};
class circle : public shape{
 public:
  circle() : shape(){}
  circle(double radius) : shape(radius){}
  void setDim1(double _dim1){
    shape::setDim1(_dim1);
    shape::setDim2(_dim1);
  }
  void setDim2(double _dim2){
    shape::setDim1(_dim2);
    shape::setDim2(_dim2);
  }
  double area(){
    double radius = getDim1();
    return pi * radius * radius;
  }
  void print(){
    cout << "circle: ";
    shape::print();
  }
};
class triangle : public shape{
 public:
  triangle() : shape(){}
  triangle(double base, double height) : shape(base, height){}
  double area(){
    return 0.5 * getDim1() * getDim2();
  }
  void print(){
    cout << "triangle: ";
    shape::print();
  }
};
int main()
{
  rectangle r1(4, 5);
  r1.print();
  cout << "area: " << r1.area() << endl;

  cout << endl;

  circle c1(3);
  c1.setDim1(4);
  c1.setDim2(5);
  c1.print();
  cout << "area: " << c1.area() << endl;

  cout << endl;

  triangle t1(4, 6);
  t1.print();
  cout << "area: " << t1.area() << endl;

  return 0;
}
