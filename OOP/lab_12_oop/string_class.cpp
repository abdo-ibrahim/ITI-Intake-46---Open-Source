#include <string.h>

#include <iostream>
using namespace std;

class String{
 private:
  char* str;
  int length;

 public:
  String(char* _str = ""){
    length = strlen(_str);
    str = new char[length + 1];
    for (int i = 0; i < length; i++){
      str[i] = _str[i];
    }
    str[length] = '\0';
  }
  String(int size) {
    length = size;
    str = new char[length + 1];
    for (int i = 0; i <= length; i++){
      str[i] = '\0';
    }
  }
  ~String(){
    delete[] str;
  }
  int size(){
    return length;
  }
  String operator+(String& s){
    int new_length = length + s.length;
    char* new_str = new char[new_length + 1];
    for (int i = 0; i < length; i++){
      new_str[i] = str[i];
    }
    for (int i = 0; i < s.length; i++){
      new_str[length + i] = s.str[i];
    }
    new_str[new_length] = '\0';
    String result(new_str);
    delete[] new_str;
    return result;
  }
  bool operator==(String& s){
    if (length != s.length){
      return false;
    }
    for (int i = 0; i < length; i++){
      if (str[i] != s.str[i]){
        return false;
      }
    }
    return true;
  }
  bool operator>(String& s){
    int min_length = min(length, s.length);
    for (int i = 0; i < min_length; i++){
      if (str[i] > s.str[i]){
        return true;
      } else if (str[i] < s.str[i]){
        return false;
      }
    }
    return length > s.length;
  }
  bool operator<(String& s){
    int min_length = min(length, s.length);
    for(int i = 0; i < min_length; i++){
      if(str[i] < s.str[i]){
        return true;
      } else if (str[i] > s.str[i]){
        return false;
      }
    }
    return length < s.length;
  }
  void toUpperCase(){
    for (int i = 0; i < length; i++){
      if (str[i] >= 'a' && str[i] <= 'z'){
        str[i] = str[i] - 32;
      }
    }
  }
  void toLowerCase(){
    for (int i = 0; i < length; i++){
      if (str[i] >= 'A' && str[i] <= 'Z'){
        str[i] = str[i] + 32;
      }
    }
  }
  void print(){
    cout << str << endl;
  }
};
int main()
{
  String s1("Hello ");
  String s2("World");
  String s3 = s1 + s2;
  s3.print();  // Hello World

  if(s1 == s2){
    cout << "equals" << endl;
  } else{
    cout << "not equals" << endl;
  }

  if(s1 < s2){
    cout << "s1 is less than s2" << endl;
  }

  s1.toUpperCase();
  s1.print();  // HELLO

  s2.toLowerCase();
  s2.print();  // world

  return 0;
}
