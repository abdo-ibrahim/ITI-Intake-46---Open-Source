#include <iostream>
#include <conio.h>
#include <windows.h>

#define MAX_SIZE 10

using namespace std;

void textattr(int attr) {
  SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE), attr);
}

struct emp {
  int age, id;
  string name;
};
class Queue {
private:
  emp* arr = new emp[MAX_SIZE];
  int front;
  int rear;
  int length;

public:
  Queue() {
    front = 0;
    rear = MAX_SIZE - 1;
    length = 0;
  }

  void enqueue(emp value) {
    if (isFull()) {
      cout << "queue is full" << endl;
      return;
    }
    rear = (rear + 1) % MAX_SIZE;
    arr[rear] = value;
    length++;
  }

  emp dequeue() {
    if (isEmpty()) {
      cout << "queue is empty" << endl;
      return {};
    }
    emp value = arr[front];
    front = (front + 1) % MAX_SIZE;
    length--;
    return value;
  }

  emp getFront() {
    if (isEmpty()) {
      cout << "queue is empty" << endl;
      return {};
    }
    return arr[front];
  }

  emp getRear() {
    if (isEmpty()) {
      cout << "queue is empty" << endl;
      return {};
    }
    return arr[rear];
  }

  void clear() {
    front = 0;
    rear = MAX_SIZE - 1;
    length = 0;
  }

  bool isEmpty() {
    return length == 0;
  }

  bool isFull() {
    return length == MAX_SIZE;
  }

  int size() {
    return length;
  }

  void print() {
    if (isEmpty()) {
      cout << "queue is empty" << endl;
      return;
    }
    int i = front;
    for (int cnt = 0; cnt < length; cnt++) {
      cout << "id= " << arr[i].id
           << " | name= " << arr[i].name
           << " | age= " << arr[i].age << endl;
      i = (i + 1) % MAX_SIZE;
    }
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
