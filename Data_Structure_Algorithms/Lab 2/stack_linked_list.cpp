#include <iostream>

#include <conio.h>
#include <windows.h>

void textattr(int attr) {
  SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE), attr);
}

using namespace std;
struct emp{
  int age , id;
  string name;
};

class Node {
public:
  emp data;
  Node* next;
  Node(emp d) {
    data.age = d.age;
    data.id = d.id;
    data.name = d.name;
    next = nullptr;
  }
};

class Stack {
private:
  Node* top;

public:
  Stack() {
    top = nullptr;
  }

  void push(emp d) {
    Node* newNode = new Node(d);
    newNode->next = top;
    top = newNode;
  }

  emp pop() {
    if (!isEmpty()) {
      emp value = top->data;
      Node* temp = top;
      top = top->next;
      delete temp;
      return value;
    } else {
      cout << "Stack is empty";
      return {};
    }
  }

  emp getTop() {
    if (!isEmpty()) {
      return top->data;
    } else {
      cout << "Stack is empty";
      return {};
    }
  }

  bool isEmpty() {
    return top == nullptr;
  }

  int size() {
    int count = 0;
    Node* current = top;
    while (current != nullptr){
      count++;
      current = current->next;
    }
    return count;
  }

  void print() {
    Node* cur = top;
    while(cur){
      cout << "id= " << cur->data.id << " | name= " << cur->data.name << " | age= " << cur->data.age << endl;
      cur = cur->next;
    }
  }
};

emp addEmployee() {
  emp newEmp;
  cout << "Enter id | name | age: ";
  cin >> newEmp.id >> newEmp.name >> newEmp.age;
  return newEmp;
}
void printEmployee(emp e){
  cout << "id= " << e.id << " | ";
  cout << "name= " << e.name << " | ";
  cout << "age= " << e.age << endl;
}
int main() {
  int sz;
  bool flag = true;
  int highlighted = 0;
  Stack st;
  do {
    system("cls");
    string menu[] = {"New", "Display", "peak", "Pop" , "isEmpty", "Exit"};
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
          emp newEmp = addEmployee();
          st.push(newEmp);
          cout << "Employee added successful" << endl;
          cout << "press any key to continue...";
          getch();
        } else if (highlighted == 1) {  // display
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
        else if (highlighted == 3) {  // pop
          if(st.isEmpty()){
            cout << "stack is empty" << endl;
          }
          else {
            printEmployee(st.pop());
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
