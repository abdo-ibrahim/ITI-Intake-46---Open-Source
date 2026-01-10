#include <conio.h>
#include <windows.h>

#include <iostream>

void textattr(int attr) {
  SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE), attr);
}

using namespace std;

struct emp{
  int id,age;
  string name;
};
struct node{
  emp data;
  node *next,*prev;

  node(emp d){
    data.id = d.id;
    data.age = d.age;
    data.name = d.name;
    next = prev = nullptr;
  }
};

class LinkedList{
 private:
  node *head,*tail;

 public:
  LinkedList(){
    head=tail=nullptr;
  }

  // insert at pos
  void insertAtPos(emp d, int pos){
    if (pos<=1) {
      insertFirst(d);
      return;
    }

    int n = size();
    if (pos>n) {
      insertEnd(d);
      return;
    }

    // middle
    node* newNode = new node(d);
    node* cur = head;
    int idx = 1;

    while (cur && idx<pos){
      cur = cur->next;
      idx++;
    }

    node* prevnode = cur->prev;
    prevnode->next = newNode;

    newNode->prev = prevnode;
    newNode->next = cur;
    cur->prev = newNode;
  }
  void insertFirst(emp d){
    node* newNode = new node(d);

    if (head == nullptr){
      head = tail = newNode;
      return;
    }

    newNode->next = head;
    head->prev = newNode;
    head = newNode;
  }

  void insertEnd(emp d){
    node* newNode = new node(d);

    if (head == nullptr){
      head = tail = newNode;
      return;
    }

    newNode->prev = tail;
    tail->next = newNode;
    tail = newNode;
  }

  void deleteById(int id){
    if (isEmpty()) {
      cout << "list is empty" << endl;
      return;
    }

    node* cur = head;
    while (cur && cur->data.id != id){
      cur = cur->next;
    }

    if (cur == nullptr) {
      cout << "ID not found" << endl;
      return;
    }

    if (cur == head){
      deleteFirst();
      return;
    }

    if (cur == tail){
      deleteEnd();
      return;
    }

    node* prevnode = cur->prev;
    prevnode->next = cur->next;
    cur->next->prev = prevnode;
    delete cur;
  }

  void deleteFirst() {
    if (isEmpty()) {
      cout << "list is empty" << endl;
      return;
    }

    // only one node
    if (head == tail) {
      delete head;
      head = tail = nullptr;
      return;
    }

    node* del = head;
    head = head->next;
    head->prev = nullptr;
    delete del;
  }
  void deleteEnd() {
    if (isEmpty()) {
      cout << "list is empty" << endl;
      return;
    }

    // only one node
    if (head == tail) {
      delete head;
      head = tail = nullptr;
      return;
    }

    node* del = tail;
    tail = tail->prev;
    tail->next = nullptr;
    delete del;
  }

  void deleteByName(string name) {
    if (isEmpty()) {
      cout << "list is empty" << endl;
      return;
    }

    node* cur = head;
    while (cur && cur->data.name != name){
      cur = cur->next;
    }

    if (cur == nullptr) {
      cout << "name not found" << endl;
      return;
    }

    if (cur == head){
      deleteFirst();
      return;
    }

    if (cur == tail){
      deleteEnd();
      return;
    }

    node* prevnode = cur->prev;
    prevnode->next = cur->next;
    cur->next->prev = prevnode;
    delete cur;
  }

  node* searchById(int id){
    node* cur = head;
    while (cur) {
      if (cur->data.id == id){
        return cur;
      }
      cur = cur->next;
    }
    return nullptr;
  }
  node* searchByName(string name){
    node* cur = head;
    while (cur) {
      if (cur->data.name == name){
        return cur;
      }
      cur = cur->next;
    }
    return nullptr;
  }

  void print(){
    if (isEmpty()) {
      cout << "list is empty" << endl;
      return;
    }
    node* cur = head;
    while (cur) {
      cout << cur->data.id << " " << cur->data.name << " " << cur->data.age << endl;
      cur = cur->next;
    }
  }

  void printReverse(){
    if (isEmpty()) {
      cout << "list is empty" << endl;
      return;
    }
    node* cur = tail;
    while (cur) {
      cout << cur->data.id << " " << cur->data.name << " " << cur->data.age << endl;
      cur = cur->prev;
    }
  }

  // count
  int size() {
    node* cur = head;
    int cnt = 0;
    while (cur) {
      cnt++;
      cur = cur->next;
    }
    return cnt;
  }

  void deleteAll(){
    node* cur = head;
    while (cur) {
      node* nextNode = cur->next;
      delete cur;
      cur = nextNode;
    }
    head = tail = nullptr;
    cout << "all list had deleted" << endl;
  }

  bool isEmpty(){
    return head == nullptr;
  }
  LinkedList& operator=(const LinkedList& list){
    node* cur = list.head;
    while (cur) {
      insertEnd(cur->data);
      cur = cur->next;
    }
    return *this;
  }
};

emp addEmployee(){
  emp newEmp;
  cout << "Enter id | name | age: ";
  cin >> newEmp.id >> newEmp.name >> newEmp.age;
  return newEmp;
}
void printEmployee(emp emp){
  cout << "id= " << emp.id << " | ";
  cout << "name= " << emp.name << " | ";
  cout << "age= " << emp.age << endl;
}
int main(){
  bool flag = true;
  int highlighted = 0;

  LinkedList li;

  do {
    system("cls");

    string menu[] = {
        "New", "Display Forward", "Display Reverse", "Search By Name", "Search By ID",
        "Delete By Name", "Delete By ID","Delete All", "Exit"
    };

    for (int i = 0; i < 9; i++){
      if (i == highlighted) textattr(0x0C);
      cout << menu[i] << "\n";
      textattr(0x07);
    }

    char ch = getch();
    switch (ch) {
      case -32:  // extended key
        ch = getch();
        switch (ch){
          case 72:  // up
            highlighted--;
            highlighted = (highlighted + 9) % 9;
            break;

          case 80:  // down
            highlighted++;
            highlighted = (highlighted + 9) % 9;
            break;

          case 71:  // home
            highlighted = 0;
            break;

          case 79:  // end
            highlighted = 8;
            break;
        }
        break;

      case 13:  // Enter
        system("cls");
        if (highlighted == 0){
          emp e = addEmployee();
          int pos;
          cout << "Enter position: ";
          cin >> pos;
          li.insertAtPos(e, pos);
          cout << "Inserted at position";
        } else if (highlighted == 1) {  // print
          li.print();
        } else if (highlighted == 2) {  // reverse
          li.printReverse();
        } else if (highlighted == 3) { // search by name
          string name;
          cout << "Enter name: ";
          cin >> name;
          node* result = li.searchByName(name);
          if (result) {
            cout << "Found Employee:" << endl;
            printEmployee(result->data);
          } else {
            cout << "Employee not found";
          }
        } else if (highlighted == 4) { // search by id
          int id;
          cout << "Enter id: ";
          cin >> id;
          node* result = li.searchById(id);
          if (result) {
            cout << "Found Employee:" << endl;
            printEmployee(result->data);
          } else {
            cout << "Employee not found";
          }
        } else if (highlighted == 6) {  // delete by id
          int id;
          cout << "Enter ID to delete: ";
          cin >> id;
          li.deleteById(id);
        } else if (highlighted == 7) {  // delete all
          li.deleteAll();
        } else if (highlighted == 8) {  // end
          flag = false;
        }

        cout << endl << "press any key to continue...";
        getch();
        break;

      case 27:  // ESC
        flag = false;
        break;
    }

  } while (flag);

  return 0;
}
