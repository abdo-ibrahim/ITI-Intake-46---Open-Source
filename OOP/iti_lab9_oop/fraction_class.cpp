#include <iostream>
using namespace std;
int gcd(int a, int b) { return ((b == 0) ? a : gcd(b, a % b)); }
int lcm(int a, int b) { return (b / gcd(a, b)) * a; }

class fraction{
  int num , dem;
public:
  fraction(int _num = 0, int _dem = 1){
    num = _num;
    dem = _dem;
  }
  void simplify() {
    int _gcd = gcd(num, dem);
    num /= _gcd;
    dem /= _gcd;
  }
  fraction simplify(int _num , int _dem){
    fraction f;
    int g = gcd(_num , _dem);
    f.num =  _num/g;
    f.dem = _dem/g;
    return f;
  }
  fraction add(fraction& f2) {
    int common = lcm(dem, f2.dem);
    int new_num = (num * (common / dem)) + (f2.num * (common / f2.dem));
    fraction result = simplify(new_num, common);
    return result;
  }
  void print() {
    cout << num;
    if (dem != 1)
      cout << "/" << dem;
    cout << endl;
  }
};

int main() {
  fraction f1(2, 6);
  cout << "fraction before: ";
  f1.print();
  cout << "fraction after: ";
  f1.simplify();
  f1.print();
  fraction f2(1, 6);

  fraction sum = f1.add(f2);
  sum.print(); // 1/2
}
