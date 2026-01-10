#include <algorithm>
#include <cassert>
#include <climits>
#include <iostream>
#include <sstream>
#include <vector>  // for debug
using namespace std;

struct Node {
  int data;
  Node* next;                                    // Pointer to same type
  Node(int data) : data(data), next(nullptr) {}  // constructor
};

class LinkedList {
 private:
  Node* head{};
  Node* tail{};
  int length;

  vector<Node*> debug_data;  // add/remove nodes you use

  void debug_add_node(Node* node) {
    debug_data.push_back(node);
  }
  void debug_remove_node(Node* node) {
    auto it = std::find(debug_data.begin(), debug_data.end(), node);
    if (it == debug_data.end())
      cout << "Node does not exist\n";
    else
      debug_data.erase(it);
  }

 public:
  LinkedList() {
    head = tail = nullptr;
    length = 0;
  }
  // ~LinkedList() {
  //   // idea: get next first, remove current head
  //   while (head) {
  //     Node *cur = head->next;
  //     delete head;
  //     head = cur;
  //   }
  // }
  // Below 2 deletes prevent copy and assign to avoid this mistake
  LinkedList(const LinkedList&) = delete;
  LinkedList& operator=(const LinkedList& another) = delete;

  ////////////////////////////////////////////////////////////

  bool isEmpty() {
    return length == 0;
  }
  bool getLength() {
    return length;
  }
  void insert_front(int value) {
    Node* item = new Node(value);
    add_node(item);  // to add in vector

    if (!head)
      head = tail = item;
    else {
      item->next = head;
      head = item;
    }
  }
  void insert_end(int value) {
    Node* item = new Node(value);
    add_node(item);  // to add in vector

    if (!head)
      head = tail = item;
    else {
      tail->next = item;
      tail = item;
    }
  }
  void delete_front() {  // O(1) time - O(1) memory
    if (head) {
      Node* cur = head;
      head = head->next;
      delete_node(cur);
      if (!head) {
        tail = nullptr;
      }
    }
  }
  void delete_end() {
    if (length <= 1) {
      delete_front();
      return;
    }
    Node* prv = get_nth(length - 1);
    delete_node(tail);
    tail = prv;
    tail->next = nullptr;
  }
  void delete_nth(int n) {
    if (n == 1) {
      delete_front();
    } else if (n == length) {
      delete_end();
    } else {
      Node* prv = get_nth(n - 1);
      Node* cur = prv->next;  // nth
      prv->next = cur->next;
      delete_node(cur);
    }
  }
  void delete_with_value(int value) {
    if (value == head->data) {
      delete_front();
    } else if (value == tail->data) {
      delete_end();
    } else {
      Node *cur = head, *prv = nullptr;
      while (cur != nullptr) {
        if (cur->data == value) break;
        prv = cur, cur = cur->next;
      }
      prv->next = cur->next;
      delete_node(cur);
    }
  }

  Node* get_nth(int n) {  // O(n) time - O(1) memory
    int cnt = 0;
    for (Node* cur = head; cur; cur = cur->next) {
      if (++cnt == n)
        return cur;
    }
    return nullptr;
  }
  Node* get_nth_back(int n) {  // O(n) time - O(1) memory
    if (length < n)
      return nullptr;
    return get_nth(length - n + 1);
  }
  int search(int value) {
    int idx = 0;
    for (Node* cur = head; cur; cur = cur->next, idx++) {
      if (cur->data == value)  // common mistake to use head
        return idx;
    }
    return -1;
  }
  bool is_same(const LinkedList& other) {  // O(n) time - O(1) memory
    if (length != other.length) return false;
    Node* other_h = other.head;
    for (Node* cur_h = head; cur_h; cur_h = cur_h->next) {
      if (cur_h->data != other_h->data)
        return false;
      other_h = other_h->next;
    }
    return true;
  }
  bool is_same1(const LinkedList& other) {  // without length
    Node *h1 = head, *h2 = other.head;
    while (h1 && h2) {
      if (h1->data != h2->data)
        return false;
      h1 = h1->next,
      h2 = h2->next;
    }
    return !h1 && !h2;  // make sure both ends together
  }
  int search_improved_v2(int value) {
    int idx = 0;
    for (Node *cur = head, *prv = nullptr; cur; prv = cur, cur = cur->next) {
      if (cur->data == value) {
        if (!prv)
          return idx;
        swap(prv->data, cur->data);
        return idx - 1;
      }
      ++idx;
    }
    return -1;
  }
  void swap_pairs() {
    for (Node* cur = head; cur; cur = cur->next) {
      if (cur->next) {
        swap(cur->data, cur->next->data);
        cur = cur->next;
      }
    }
  }
  void reverse() {
    Node *prv = nullptr, *cur = head, *nxt = head->next;
    while (cur != nullptr) {
      nxt = cur->next;  // second
      cur->next = prv;  // reverse node
      prv = cur;        // first
      cur = nxt;        // second
    }
    tail = head;  // first
    head = prv;   // last
  }
  void delete_next_node(Node* prv) {
    // delete the next of the current node
    // handle if next is tail case
    Node* cur = prv->next;
    bool is_tail = cur == tail;
    //  node->next in middle to delete
    prv->next = cur->next;
    delete_node(cur);
    if (is_tail) tail = prv;
  }
  void print() {  // for loop
    // dont't change head itself
    for (Node* cur = head; cur; cur = cur->next) {
      cout << cur->data << " ";
    }
    cout << endl;
  }

  /////////////////////// Debug ////////////////////////////////////
  void debug_print_address() {
    for (Node* cur = head; cur; cur = cur->next)
      cout << cur << "," << cur->data << "\t";
    cout << "\n";
  }

  void debug_print_node(Node* node, bool is_separate = false) {
    if (is_separate)
      cout << "Sep: ";
    if (node == nullptr) {
      cout << "nullptr\n";
      return;
    }
    cout << node->data << " -> ";
    if (node->next == nullptr)
      cout << "X ";
    else
      cout << node->next->data << " ";

    if (node == head)
      cout << "head\n";
    else if (node == tail)
      cout << "tail\n";
    else
      cout << "\n";
  }
  void debug_print_list(string msg = "") {
    if (msg != "")
      cout << msg << "\n";
    for (int i = 0; i < (int)debug_data.size(); ++i)
      debug_print_node(debug_data[i]);
    cout << "************\n"
         << flush;
  }

  string debug_to_string() {
    if (length == 0)
      return "";
    ostringstream oss;
    for (Node* cur = head; cur; cur = cur->next) {
      oss << cur->data;
      if (cur->next)
        oss << " ";
    }
    return oss.str();
  }

  void debug_verify_data_integrity() {
    if (length == 0) {
      assert(head == nullptr);
      assert(tail == nullptr);
    } else {
      assert(head != nullptr);
      assert(tail != nullptr);
      if (length == 1)
        assert(head == tail);
      else
        assert(head != tail);
      assert(!tail->next);
    }
    int len = 0;
    for (Node* cur = head; cur; cur = cur->next, len++)
      assert(len < 10000);  // Consider infinite cycle?
    assert(length == len);
    assert(length == (int)debug_data.size());
  }
  // These 2 simple functions just to not forget changing the vector and length
  void delete_node(Node* node) {
    debug_remove_node(node);
    --length;
    delete node;
  }

  void add_node(Node* node) {
    debug_add_node(node);
    ++length;
  }

  //////////////////////////////////////////////////////////
};

int main() {
  LinkedList list;
  list.insert_end(1);
  list.insert_end(2);
  list.insert_end(3);
  list.insert_end(4);
  list.print();
  // some actions

  list.debug_print_list("************");

  return 0;
}
