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
  virtual void print(){
    cout << "(" << dim1 << "," << dim2 << ")" << endl;
  }
  virtual double area() = 0;
};
class rectangle : public shape{
 public:
  rectangle() : shape() {}
  rectangle(double d1, double d2) : shape(d1, d2) {}
  double area() {
    return getDim1() * getDim2();
  }
  void print() {
    cout << "rectangle: ";
    shape::print();
  }
};
class circle : public shape{
 public:
  circle() : shape() {}
  circle(double radius) : shape(radius) {}
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
  void print() {
    cout << "circle: ";
    shape::print();
  }
};
class triangle : public shape{
 public:
  triangle() : shape() {}
  triangle(double base, double height) : shape(base, height) {}
  double area() {
    return 0.5 * getDim1() * getDim2();
  }
  void print(){
    cout << "triangle: ";
    shape::print();
  }
};

class square : public rectangle{
 public:
  square() : rectangle() {}
  square(double _dim1) : rectangle(_dim1, _dim1) {}

  void setDim1(double _dim1){
    rectangle::setDim1(_dim1);
    rectangle::setDim2(_dim1);
  }
  void setDim2(double _dim2){
    rectangle::setDim1(_dim2);
    rectangle::setDim2(_dim2);
  }
  void print(){
    cout << "square: ";
    shape::print();
  }
};
void printArea(shape* s){
  s->print();
  cout << "area: " << s->area() << endl;
}
int sumAreas(shape* shape[], int size) {
  double sum = 0;
  for (int i = 0; i < size; i++){
    sum += shape[i]->area();
  }
  return sum;
}
int main()
{
  shape* s1;
  rectangle r1(4, 5);
  s1 = &r1;
  printArea(s1);
  cout << endl;

  circle c1(3);
  s1 = &c1;
  printArea(s1);
  cout << endl;

  triangle t1(4, 6);
  s1 = &t1;
  printArea(s1);
  cout << endl;

  square sq(4);
  s1 = &sq;
  printArea(s1);
  cout << endl;
  /////////////////////////////
  shape* s[4];
  s[0] = new rectangle(7, 8);
  s[1] = new circle(5);
  s[2] = new triangle(6, 9);
  s[3] = new square(4);
  cout << "\nsum areas: " << sumAreas(s, 4) << endl;

  return 0;
}
