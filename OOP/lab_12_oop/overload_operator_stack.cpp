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
  }
  ~Stack(){
    delete[] arr;
  }
  void push(T value){
    if(!isFull()){
      arr[++top] = value;
    } else{
      cout << "stack is full cannot push" << endl;
    }
  }
  T pop(){
    if(!isEmpty()){
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
    if (isEmpty()) {
      cout << "stack is empty" << endl;
      return -1;
    }
    return arr[top];
  }
  void print(){
    for (int i = 0; i <= top; i++){
      cout << arr[i] << " ";
    }
  }
  int size(){
    return top + 1;
  }
  bool operator==(Stack<T>& s){
    if(this->size() != s.size()){
      return false;
    }
    for(int i = 0; i <= top; i++){
      if(this->arr[i] != s.arr[i]){
        return false;
      }
    }
    return true;
  }
  Stack<T> operator+(Stack<T>& s){
    Stack<T> result;
    for (int i = 0; i < this->size(); i++){
      result.push(this->arr[i]);
    }
    for (int i = 0; i < s.size(); i++){
      result.push(s.arr[i]);
    }

    return result;
  }
};
int main()
{
  Stack<int> st1;
  st1.push(1);
  st1.push(2);

  Stack<int> st2;
  st2.push(1);
  st2.push(2);

  if(st1 == st2)
    cout << "equals" << endl;
  else
    cout << "not equals" << endl;

  Stack<int> st3 = st1 + st2;
  st3.print();
}
