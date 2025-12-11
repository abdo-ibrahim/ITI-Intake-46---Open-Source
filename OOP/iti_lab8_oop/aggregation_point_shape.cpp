#include <iostream>

using namespace std;
class Point{
private:
  int x , y;
public:
  Point(int _x = 0 , int _y = 0){
    x = _x;
    y = _y;
    cout << "point created" << endl;
  }
  ~Point(){
    cout << "point destructed" << endl;
  }

  void print(){
    cout << "(" << x << ", " << y << ") ";
  }
};

class Rectangle{
private:
  Point* TL;
  Point* BR;
public:
  Rectangle(Point* _TL, Point* _BR) {
    TL = _TL;
    BR = _BR;
    cout << "rectangle created" << endl;
  };
  ~Rectangle(){
    cout << "rectangle destructed" << endl;
  }

  void print(){
    TL->print();
    BR->print();
    cout << endl;
  }
};
class Circle{
private:
  Point* center;
  float radius;
public:
  Circle(Point* _center, float _radius){
    center = _center;
    radius = _radius;
    cout << "circle created" << endl;
  };
  ~Circle(){
    cout << "Circle destructed" << endl;
  }

  void print(){
    center->print();
    cout << " radius: " << radius << endl;
  }
};
class Triangle{
private:
  Point* p1;
  Point* p2;
  Point* p3;
public:
  Triangle(Point* _p1, Point* _p2, Point* _p3) {
    p1 = _p1;
    p2 = _p2;
    p3 = _p3;
    cout << "Triangle created" << endl;
  }
  ~Triangle(){
    cout << "Triangle destructed" << endl;
  }
  void print(){
    p1->print();
    p2->print();
    p3->print();
    cout << endl;
  }
};
int main()
{
  Point p1(1, 1);
  Point p2(5, 5);
  Point p3(3, 4);

  Rectangle r(&p1, &p2);
  r.print();

  cout << endl;
  Circle c(&p3, 5);
  c.print();

  cout << endl;
  Triangle t(&p1, &p2, &p3);
  t.print();

  cout << endl;
  return 0;
}
