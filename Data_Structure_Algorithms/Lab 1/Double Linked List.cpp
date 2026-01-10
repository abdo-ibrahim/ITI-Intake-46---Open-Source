#include <iostream>

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

class LinkedList {
 private:
  node *head,*tail;

 public:
  LinkedList() {
    head = tail = nullptr;
  }

  // insert at pos
  void insertAtPos(emp d, int pos){
    if (pos <= 1) {
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
    while (cur && idx<pos) {
      cur = cur->next;
      idx++;
    }

    node* prevnode = cur->prev;
    prevnode->next = newNode;

    newNode->prev = prevnode;
    newNode->next = cur;
    cur->prev = newNode;
  }
  void insertFirst(emp d) {
    node* newNode = new node(d);

    if (head == nullptr) {
      head = tail = newNode;
      return;
    }
    newNode->prev = nullptr;
    newNode->next = head;
    head->prev = newNode;
    head = newNode;
  }

  void insertEnd(emp d) {
    node* newNode = new node(d);

    if (head == nullptr) {
      head = tail = newNode;
      return;
    }

    newNode->prev = tail;
    newNode->next = nullptr;
    tail->next = newNode;
    tail = newNode;
  }

  void deleteById(int id) {
    if (isEmpty()) {
      cout << "list is empty" << endl;
      return;
    }
    node* cur = head;
    while (cur && cur->data.id != id) {
      cur = cur->next;
    }

    if (cur == nullptr) {
      cout << "ID not found" << endl;
      return;
    }

    if (cur == head) {
      deleteFirst();
      return;
    }

    if (cur == tail) {
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

int main() {
  LinkedList list;
  emp e1 = {1, 25, "abdo"};
  emp e2 = {2, 30, "ibrahim"};
  emp e3 = {3, 28, "ali"};
  emp e4 = {4, 15, "ahmed"};

  list.insertAtPos(e1, 1);
  list.insertAtPos(e2, 2);
  list.insertAtPos(e3, 2);
  list.insertAtPos(e4, 3);

  cout << "print:" << endl;
  list.print();

  cout << endl << "reverse:" << endl;
  list.printReverse();

  cout << endl << "deleting by name" << endl;
  list.deleteByName("ahmed");
  list.print();

  cout << endl << "equal overload:" << endl;
  LinkedList l2;
  l2 = list;
  l2.print();
  cout << endl;

  list.deleteAll();
  list.print();

  return 0;
}
