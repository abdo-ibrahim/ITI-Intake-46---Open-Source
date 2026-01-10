#include <conio.h>
#include <windows.h>

#include <iostream>

void textattr(int attr) {
  SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE), attr);
}

using namespace std;
struct emp {
  int age, id;
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
class Queue {
 private:
  Node *front, *rear;
  int length;

 public:
  Queue() {
    front = rear = nullptr;
    length = 0;
  }
  void enqueue(emp d) {
    Node* newNode = new Node(d);
    if (rear == nullptr) {
      front = rear = newNode;
    } else {
      rear->next = newNode;
      rear = newNode;
    }
    length++;
  }
  emp dequeue() {
    if (!isEmpty()) {
      emp value = front->data;
      Node* temp = front;
      front = front->next;
      if (front == nullptr) {
        rear = nullptr;
      }
      delete temp;
      length--;
      return value;
    } else {
      cout << "Queue is empty";
      return {};
    }
  }
  emp getFront() {
    if (!isEmpty()) {
      return front->data;
    } else {
      cout << "Queue is empty";
      return {};
    }
  }
  emp getRear() {
    if (!isEmpty()) {
      return rear->data;
    } else {
      cout << "Queue is empty";
      return {};
    }
  }
  void clear() {
    while (!isEmpty()) {
      dequeue();
    }
  }
  void print() {
    Node* cur = front;
    while (cur) {
      cout << "id= " << cur->data.id << " | name= " << cur->data.name
           << " | age= " << cur->data.age << endl;
      cur = cur->next;
    }
  }
  bool isEmpty() {
    return length == 0;
  }
};

emp addEmployee() {
  emp newEmp;
  cout << "Enter id | name | age: ";
  cin >> newEmp.id >> newEmp.name >> newEmp.age;
  return newEmp;
}
void printEmployee(emp emp) {
  cout << "id= " << emp.id << " | ";
  cout << "name= " << emp.name << " | ";
  cout << "age= " << emp.age << endl;
}

int main() {
  bool flag = true;
  int highlighted = 0;
  Queue q;

  do {
    system("cls");
    string menu[] = {
        "New", "Display", "Front", "Rear", "Dequeue", "Clear All", "Exit"
    };

    for (int i = 0; i < 7; i++) {
      if (i == highlighted) textattr(0x0C);
      cout << menu[i] << "\n";
      textattr(0x07);
    }

    char ch = getch();
    switch (ch) {
      case -32:
        ch = getch();
        switch (ch) {
          case 72:
            highlighted--;
            highlighted = (highlighted + 7) % 7;
            break;
          case 80:
            highlighted++;
            highlighted = (highlighted + 7) % 7;
            break;
          case 71:
            highlighted = 0;
            break;
          case 79:
            highlighted = 6;
            break;
        }
        break;

      case 13:
        if (highlighted == 0) {
          system("cls");
          emp newEmp = addEmployee();
          q.enqueue(newEmp);
          cout << "Employee enqueued successful\n";
          cout << "press any key to continue...";
          getch();
        }

        else if (highlighted == 1) {
          system("cls");
          q.print();
          cout << "press any key to continue...";
          getch();
        }

        else if (highlighted == 2) {  // front
          system("cls");
          if (q.isEmpty())
            cout << "queue is empty\n";
          else
            printEmployee(q.getFront());
          cout << "press any key to continue...";
          getch();
        }

        else if (highlighted == 3) {  // rear
          system("cls");
          if (q.isEmpty())
            cout << "queue is empty\n";
          else
            printEmployee(q.getRear());
          cout << "press any key to continue...";
          getch();
        }

        else if (highlighted == 4) {  // dequeue
          system("cls");
          if (q.isEmpty())
            cout << "queue is empty\n";
          else
            printEmployee(q.dequeue());
          cout << "press any key to continue...";
          getch();
        }

        else if (highlighted == 5) {  // clear all
          system("cls");
          q.clear();
          cout << "Queue cleared\n";
          cout << "press any key to continue...";
          getch();
        }

        else if (highlighted == 6) {  // exit
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
