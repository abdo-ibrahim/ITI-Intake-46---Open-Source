#include <iostream>
using namespace std;
int gcd(int a, int b){ return ((b == 0) ? a : gcd(b, a % b));}
int lcm(int a, int b){return (b / gcd(a, b)) * a;}

class fraction{
  int num, dem;

 public:
  fraction(int _num = 0, int _dem = 1){
    num = _num;
    dem = _dem;
  }
  fraction operator+(fraction& f2){
    int common = lcm(dem, f2.dem);
    int new_num = (num * (common / dem)) + (f2.num * (common / f2.dem));
    fraction result = simplify(new_num, common);
    return result;
  }
  fraction operator+(int val){
    int new_num = num + (val * dem);
    fraction result = simplify(new_num, dem);
    return result;
  }
  friend fraction operator+(int val, fraction& f);
  bool operator==(fraction& f2){
    fraction f1_simp = simplify(num, dem);
    fraction f2_simp = simplify(f2.num, f2.dem);
    return (f1_simp.num == f2_simp.num && f1_simp.dem == f2_simp.dem);
  }
  bool operator!=(fraction& f2){
    return !(*this == f2);
  }
  fraction& operator++(){ //prefix
    num += dem;
    simplify();
    return *this;
  }
  fraction operator++(int) {//postfix
    fraction temp = *this;
    num += dem;
    simplify();

    return temp;
  }

  void simplify(){
    int _gcd = gcd(num, dem);
    num /= _gcd;
    dem /= _gcd;
  }

  fraction simplify(int _num, int _dem){
    fraction f;
    int g = gcd(_num, _dem);
    f.num = _num / g;
    f.dem = _dem / g;
    return f;
  }
  fraction add(fraction& f2){
    int common = lcm(dem, f2.dem);
    int new_num = (num * (common / dem)) + (f2.num * (common / f2.dem));
    fraction result = simplify(new_num, common);
    return result;
  }
  void print(){
    simplify();
    cout << num;
    if (dem != 1)
      cout << "/" << dem;
    cout << endl;
  }
};
fraction operator+(int val, fraction& f){
  return f + val;
}
int main()
{
  fraction f1(2, 6);
  fraction f2(1, 6);
  fraction sum = f1 + f2;
  sum.print();  // 1/2
  fraction sum2 = f1 + 2;
  sum2.print();  // 7/3
  fraction sum3 = 3 + f2;
  sum3.print();  // 19/6
  if(f1 == f2){
    cout << "equals" << endl;
  } else{
    cout << "not equals" << endl;
  }
  if(f1 != f2){
    cout << "not equals" << endl;
  } else{
    cout << "equals" << endl;
  }
  fraction f3 = f1++;
  f3.print();  // 2/6 --> 1/3
}
