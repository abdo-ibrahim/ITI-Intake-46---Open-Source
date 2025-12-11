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
  Point TL;
  Point BR;
public:
  Rectangle(int x1, int y1, int x2, int y2) : TL(x1,y1) , BR(x2,y2) {
    cout << "rectangle created" << endl;
  };
  ~Rectangle(){
    cout << "rectangle destructed" << endl;
  }

  void print(){
    TL.print();
    BR.print();
    cout << endl;
  }
};
class Circle{
private:
  Point center;
  float radius;
public:
  Circle(int x, int y, float r) : center(x, y){
    radius = r;
    cout << "circle created" << endl;
  };
  ~Circle(){
    cout << "Circle destructed" << endl;
  }

  void print(){
    center.print();
    cout << " radius: " << radius << endl;
  }
};
class Triangle{
private:
  Point p1,p2,p3;
public:
  Triangle(int x1, int y1, int x2, int y2, int x3, int y3) : p1(x1, y1), p2(x2, y2), p3(x3, y3) {
    cout << "trinagle created" << endl;
  }
  ~Triangle(){
    cout << "Triangle destructed" << endl;
  }
  void print(){
    p1.print();
    p2.print();
    p3.print();
    cout << endl;
  }
};
int main()
{
  Rectangle r(1, 1, 5, 5);
  r.print();

  cout << endl;
  Circle c(3, 4, 5);
  c.print();

  cout << endl;
  Triangle t(1, 1, 5, 5 , 6 , 6);
  t.print();
  return 0;
}
