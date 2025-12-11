#include <iostream>
#define MAX_SIZE 10
using namespace std;

template <typename T>
class Stack{
 private:
  T* arr;
  int top;

 public:
  Stack(){
    arr = new T[MAX_SIZE];
    top = -1;
    cout << "stack created" << endl;
  }
  ~Stack(){
    delete[] arr;
    cout << "stack destructed" << endl;
  }
  void push(T value){
    if (!isFull()) {
      arr[++top] = value;
      cout << "value " << value << " added to stack" << endl;
    } else {
      cout << "stack is full cannot push" << endl;
    }
  }
  T pop(){
    if (!isEmpty()){
      cout << "value " << arr[top] << " removed from stack" << endl;
      return arr[top--];
    } else{
      cout << "stack is empty" << endl;
      return -1;
    }
  }
  bool isFull(){
    return top == MAX_SIZE - 1;
  }
  bool isEmpty(){
    return top == -1;
  }
  T getTop(){
    if (isEmpty()){
      cout << "stack is empty" << endl;
      return -1;
    }
    return arr[top];
  }
  int size(){
    return top + 1;
  }
};

template <typename T>
void Swap(T& a, T& b){
  T temp = a;
  a = b;
  b = temp;
}

int main()
{
  Stack<int> st;
  st.push(1);
  st.push(2);
  st.pop();
  cout << st.getTop() << endl;

  Stack<char> st1;
  st1.push('A');
  st1.push('B');
  st1.pop();
  cout << st1.getTop() << endl;

  int x = 5, y = 10;
  cout << "before x=" << x << ", y=" << y << endl;
  Swap(x, y);
  cout << "after x=" << x << ", y=" << y << endl;

  double a = 5.5, b = 10.5;
  cout << "before a=" << a << ", b=" << b << endl;
  Swap(a, b);
  cout << "after a=" << a << ", b=" << b << endl;

  return 0;
}
