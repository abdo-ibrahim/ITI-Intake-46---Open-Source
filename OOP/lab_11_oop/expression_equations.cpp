#include <iostream>
#define MAX_SIZE 10
using namespace std;

string infixToPostfix(string expression);
int hasHighPriority(char operator1, char operator2);
bool isDigit(char c);
int evaluatePostfix(string expression);
int getOperatorWeight(char op);

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
    } else {
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
  int size() {
    return top + 1;
  }
};

int main(){
  string expression = "3+2*6+5/6-4";
  cin >> expression;
  cout << "infix: " << expression << endl;

  string postfix = infixToPostfix(expression);
  cout << "postfix: " << postfix << endl;

  int result = evaluatePostfix(postfix);
  cout << "\nresult: " << result << endl;

  return 0;
}

string infixToPostfix(string expression){
  Stack<char> st;
  string postfix = "";

  for (char ch : expression){
    if (isDigit(ch)) {
      postfix += ch;
    } else if (ch == '('){
      st.push(ch);
    } else if (ch == ')'){
      while (!st.isEmpty() && st.getTop() != '('){
        postfix += st.pop();
      }
      st.pop();
    } else{ // operator
      while (!st.isEmpty() && hasHighPriority(st.getTop(), ch)){
        postfix += st.pop();
      }
      st.push(ch);
    }
  }
  while (!st.isEmpty()){ // pop all operators from stack
    postfix += st.pop();
  }
  return postfix;
}

bool isDigit(char ch){
  return (ch >= '0' && ch <= '9');
}

int getOperatorWeight(char op){
  switch (op) {
    case '+':
    case '-':
      return 1;
    case '*':
    case '/':
      return 2;
  }
  return -1;
}

int hasHighPriority(char op1, char op2){
  return getOperatorWeight(op1) >= getOperatorWeight(op2);
}

int evaluatePostfix(string expression){
  Stack<int> st;
  for (char ch : expression) {
    if (isDigit(ch)) {
      st.push(ch - '0');
    } else {
      int b = st.pop();
      int a = st.pop();
      int result;

      switch (ch) {
        case '+':
          result = a + b;
          break;
        case '-':
          result = a - b;
          break;
        case '*':
          result = a * b;
          break;
        case '/':
          result = a / b;
          break;
      }
      st.push(result);
    }
  }

  return st.pop();
}
