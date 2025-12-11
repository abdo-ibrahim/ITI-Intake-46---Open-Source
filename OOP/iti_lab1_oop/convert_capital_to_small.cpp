#include <iostream>

using namespace std;

int main()
{
  // we notice that difference between any two char = 32
  // 'A' and 'a' : 97 - 65 = 32
  char ch;
  cout << "Please Enter a Char: ";
  cin>>ch;
  if(ch < 97) {
    cout << "you enter capital char and small char is: " << char(ch + 32) << endl;
  }
  else {
    cout << "you enter small char and capital char is: " << char(ch - 32) << endl;
  }
  return 0;
}
