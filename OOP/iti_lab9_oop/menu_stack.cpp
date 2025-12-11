#include <iostream>

#include <conio.h>
#include <windows.h>

void textattr(int attr) {
  SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE), attr);
}

#define MAX_SIZE 10
using namespace std;

struct Employee {
  int id;
  string name;
  int age;
};

class Stack{
private:
  Employee* arr;
  int top;
public:
  Stack(){
    arr = new Employee[MAX_SIZE];
    top = -1;
    cout << "stack created" << endl;
  }
  ~Stack() {
    delete[] arr;
    cout << "stack destructed" << endl;
  }
  Stack(Stack& s) {
     this->top = s.top;
     arr = new Employee[MAX_SIZE];
     for(int i = 0; i < MAX_SIZE; i++){
        arr[i] = s.arr[i];
     }
     cout << "stack copied" << endl;
  }
  void push(Employee value){
    if(!isFull()){
      arr[++top] = value;
    }
    else{
      cout << "stack is full cannot push" << endl;
    }
  }
  Employee pop(){
    if(!isEmpty()){
      return arr[top--];
    }
    else{
      cout << "stack is empty" << endl;
      return {};
    }
  }
  bool isFull(){
    return top == MAX_SIZE -1;
  }
  bool isEmpty(){
    return top == -1;
  }
  Employee getTop(){
    if(isEmpty()){
      cout << "stack is empty" << endl;
      return {};
    }
    return arr[top];
  }
  int size(){
    return top + 1;
  }
  void print(){
    if (isEmpty()) {
      cout << "stack is empty" << endl;
      return;
    }
    while (!isEmpty()) {
    Employee e = pop();
    cout << e.id << " | " << e.name << " | " << e.age << endl;
    }
  }
};


Employee addEmployee() {
  Employee newEmp;
  cout << "Enter id | name | age: ";
  cin >> newEmp.id >> newEmp.name >> newEmp.age;
  return newEmp;
}
void printEmployee(Employee emp){
  cout << "id= " << emp.id << " | ";
  cout << "name= " << emp.name << " | ";
  cout << "age= " << emp.age << endl;
}
int main() {
  int sz;
  bool flag = true;
  int highlighted = 0;
  Stack st;
  do {
    system("cls");
    string menu[] = {"New", "Display", "peak", "isFull", "isEmpty", "Exit"};
    for (int i = 0; i < 6; i++) {
      if (i == highlighted) textattr(0x0C);
      cout << menu[i] << "\n";
      textattr(0x07);
    }
    char ch;
    ch = getch();
    switch (ch) {
      case -32:  // extended key
        ch = getch();
        switch (ch) {
          case 72:  // up
            highlighted--;
            highlighted = (highlighted + 6) % 6;
            // if(highlighted < 0) highlighted = 2;
            break;
          case 80:  // down
            highlighted++;
            highlighted = (highlighted + 6) % 6;
            break;
          case 71:  // home
            highlighted = 0;
            break;
          case 79:  // end
            highlighted = 5;
            break;
        }
        break;
      case 13:  // enter
        if (highlighted == 0) {  // new
          system("cls");
          if (!st.isFull()) {
            Employee newEmp = addEmployee();
            st.push(newEmp);
            cout << "Employee added successful" << endl;
          }
          else{
            cout << "stack is full" << endl;
          }
          cout << "press any key to continue...";
          getch();
        } else if (highlighted == 1) {  // pop
          system("cls");
          st.print();
          cout << "press any key to continue...";
          getch();
        }
        else if (highlighted == 2) {  // peak
          if(st.isEmpty()){
            cout << "stack is empty" << endl;
          }
          else {
            printEmployee(st.getTop());
          }
          cout << "press any key to continue...";
          getch();
        }
        else if (highlighted == 3) {  // isFull
          if(st.isFull()){
            cout << "stack is full" << endl;
          }
          else{
            cout << "stack is not full" << endl;
          }
          cout << "press any key to continue...";
          getch();
        }
        else if (highlighted == 4) {  // isEmpty
          if(st.isEmpty()){
            cout << "stack is empty" << endl;
          }
          else{
            cout << "stack is not empty" << endl;
          }
          cout << "press any key to continue...";
          getch();
        }
        else if (highlighted == 5) {  // exit
          flag = false;
        }
        break;
      case 27:   // esc
      case 'e':  // exit
        flag = false;
        break;
    }

  } while (flag);
  return 0;
}
