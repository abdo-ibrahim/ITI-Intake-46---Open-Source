#include <iostream>

using namespace std;

int main()
{
  cout << "Please Enter Two Numbers: ";
  float number_1 , number_2;
  cin>>number_1 >> number_2;
  cout << "Sum is: " << number_1 + number_2 << endl;
  cout << "Substraction is: " << number_1 - number_2 << endl;
  cout << "Multiplication is: " << number_1 * number_2 << endl;
  if(number_2 != 0){
    cout << "Division is: " << number_1 / number_2 << endl;
  }
  else {
    cout << "Division: can't divide by zero" << endl;
  }

  return 0;
}
