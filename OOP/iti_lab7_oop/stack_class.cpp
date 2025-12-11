#include <iostream>
#define MAX_SIZE 10
using namespace std;

class Stack{
private:

  int* arr;
  int top;
public:
  Stack(){
    arr = new int[MAX_SIZE];
    top = -1;
    cout << "stack created" << endl;
  }
  ~Stack() {
    delete[] arr;
    cout << "stack destructed" << endl;
  }
  void push(int value){
    if(!isFull()){
      arr[++top] = value;
      cout << "value " << value << " added to stack" << endl;
    }
    else{
      cout << "stack is full cannot push" << endl;
    }
  }
  int pop(){
    if(!isEmpty()){
      cout << "value " << arr[top] << " removed from stack" << endl;
      return arr[top--];
    }
    else{
      cout << "stack is empty" << endl;
      return -1;
    }
  }
  bool isFull(){
    return top == MAX_SIZE -1;
  }
  bool isEmpty(){
    return top == -1;
  }
  int getTop(){
    if(isEmpty()){
      cout << "stack is empty" << endl;
      return -1;
    }
    return arr[top];
  }
  int size(){
    return top + 1;
  }

};


int main()
{
    Stack st;
    st.push(5);
    st.push(10);
    cout << (st.isEmpty() ? "stack is empty" : "stack not empty") << endl;
    st.pop();
    cout << "top = " << st.getTop() << endl;
    st.pop();
    st.pop();
    st.pop();
    return 0;
}
