#include <iostream>

using namespace std;

class Complex{
 private:
  int real;
  int img;

 public:
   Complex(int real = 0 , int img = 0){
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
  Complex add(Complex c){
    Complex result;
    result.real = real + c.real;
    result.img = img + c.img;
    return result;
  }
  void print(){
    if(img > 0){
      cout << real << "+"<< img << "j" << endl;
    }
    else if(img < 0){
      cout << real << img<<"j" << endl;
    }
    else{
      cout << real << endl;
    }
  }

};

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
      cout << real << "+"<< img << "j" << endl;
    }
    else if(img < 0){
      cout << real << img<<"j" << endl;
    }
    else{
      cout << real << endl;
    }
}


int main() {
  Complex c(5 , 3);
  c.print();

  return 0;
}



