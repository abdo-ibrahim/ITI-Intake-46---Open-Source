#include <iostream>

using namespace std;

// Binary Search Tree Node
struct Node {
  int key;
  Node* left;
  Node* right;

  Node(int val) {
    key = val;
    left = right = nullptr;
  }
};

class BinarySearchTree {
 private:
  Node* root;

  Node* insert(Node* node, int key) {
    Node* tmp = new Node(key);
    if (node == nullptr) {  // base case : reached leaf position
      return tmp;
    }
    if (key < node->key) {  // go left
      node->left = insert(node->left, key);
    } else {  // go right
      node->right = insert(node->right, key);
    }
    return node;
  }

  bool search(Node* node, int key) {
    if (node == nullptr) {  // base case : key not found
      return false;
    }
    if (node->key == key) {
      return true;
    }
    if (key < node->key) {  // go left
      return search(node->left, key);
    } else {  // go right
      return search(node->right, key);
    }
  }

  // inorder: left -> root -> right
  void inorder(Node* node) {
    if (node == nullptr) return;
    inorder(node->left);
    cout << node->key << " ";
    inorder(node->right);
  }

  // preorder: root -> left -> right
  void preorder(Node* node) {
    if (node == nullptr) return;
    cout << node->key << " ";
    preorder(node->left);
    preorder(node->right);
  }

  // postorder: left -> right -> root
  void postorder(Node* node) {
    if (node == nullptr) return;
    postorder(node->left);
    postorder(node->right);
    cout << node->key << " ";
  }

  // find successor (min value in right subtree)
  Node* findMin(Node* node) {
    while (node->left != nullptr) {
      node = node->left;
    }
    return node;
  }

  Node* deleteNode(Node* node, int key) {
    if (node == nullptr) return nullptr;  // base case: key not found

    if (key < node->key) {  // go left
      node->left = deleteNode(node->left, key);
    } else if (key > node->key) {  // go right
      node->right = deleteNode(node->right, key);
    } else {  // node found delete it

      // Case 1: Leaf node
      if (node->left == nullptr && node->right == nullptr) {
        delete node;
        return nullptr;
      }
      // Case 2: Node with one child
      else if (node->left == nullptr) {
        Node* temp = node->right;
        delete node;
        return temp;
      } else if (node->right == nullptr) {
        Node* temp = node->left;
        delete node;
        return temp;
      }
      // Case 3: Node with two children
      else {
        Node* successor = findMin(node->right);
        node->key = successor->key;
        node->right = deleteNode(node->right, successor->key);
      }
    }
    return node;
  }

 public:
  BinarySearchTree() {
    root = nullptr;
  }

  void insert(int key) {
    root = insert(root, key);  // start from root
  }

  bool search(int key) {
    return search(root, key);  // start from root
  }

  void deleteKey(int key) {
    root = deleteNode(root, key);  // start from root
  }

  void inorder() {
    inorder(root);
    cout << endl;
  }

  void preorder() {
    preorder(root);
    cout << endl;
  }

  void postorder() {
    postorder(root);
    cout << endl;
  }
};

int main() {
  BinarySearchTree bst;
  bst.insert(50);
  bst.insert(30);
  bst.insert(20);
  bst.insert(40);
  bst.insert(70);
  bst.insert(60);
  bst.insert(80);
  cout << "Inorder traversal: ";
  bst.inorder();
  cout << "Preorder traversal: ";
  bst.preorder();
  cout << "Postorder traversal: ";
  bst.postorder();
  int key = 40;
  cout << "searching for " << key << ": " << (bst.search(key) ? "found" : "not found") << endl;

  bst.deleteKey(20);
  cout << "after deleting 20: ";
  bst.inorder();
  bst.deleteKey(30);
  cout << "after deleting 30: ";
  bst.inorder();
  return 0;
}
