#include <iostream>

using namespace std;

class Complex{
 private:
  int real;
  int img;

 public:
  Complex(int real = 0, int img = 0){
    this->real = real;
    this->img = img;
  }
  void SetReal(int _real){
    real = _real;
  }
  void SetImg(int _img){
    img = _img;
  }
  int GetReal(){
    return real;
  }
  int GetImg(){
    return img;
  }
  Complex(const Complex& c){
    real = c.real;
    img = c.img;
  }
  Complex operator+(Complex c){
    return Complex(real + c.real, img + c.img);
  }
  Complex operator+(int value){
    return Complex(real + value, img);
  }
  friend Complex operator+(int value, Complex c);
  bool operator==(Complex& c) {
    return (real == c.real && img == c.img);
  }
  bool operator!=(Complex c){
    return !(*this == c);
  }
  Complex& operator++(){ //++c
    real++;
    return *this;
  }
  Complex operator++(int) { //c++
    Complex temp = *this;
    real++;
    return temp;
  }
  explicit operator int(){
    return real;
  }

  Complex add(Complex c){
    Complex result;
    result.real = real + c.real;
    result.img = img + c.img;
    return result;
  }
  void print(){
    if (img > 0){
      cout << real << "+" << img << "j" << endl;
    } else if (img < 0){
      cout << real << img << "j" << endl;
    } else {
      cout << real << endl;
    }
  }
};
Complex operator+(int value, Complex c){
  return c + value;
}

Complex substract(Complex c1, Complex c2){
  Complex result;
  result.SetReal(c1.GetReal() - c2.GetReal());
  result.SetImg(c1.GetImg() - c2.GetImg());
  return result;
}
void printComplex(Complex c){
  int img = c.GetImg();
  int real = c.GetReal();
  if(img > 0){
    cout << real << "+" << img << "j" << endl;
  } else if (img < 0){
    cout << real << img << "j" << endl;
  } else{
    cout << real << endl;
  }
}

int main()
{
  Complex c1(1, 1);
  Complex c2(2, 2);
  Complex c3 = c1 + c2;
  c3.print();
  Complex c4 = c1 + 2;
  c4.print();
  Complex c5 = 2 + c1;
  c5.print();
  if(c4 == c5){
    cout << "equals" << endl;
  } else{
    cout << "not equals" << endl;
  }
  if(c1 != c2){
    cout << "not equals" << endl;
  } else{
    cout << "equals" << endl;
  }
  Complex c6 = ++c1;
  c6.print();
  Complex c7 = c2++;
  c7.print();
  c2.print();

  int i = (int)c1;
  cout << i << endl;

  return 0;
}
