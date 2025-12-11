#include <iostream>
#define MAX_SIZE 10
using namespace std;

class Queue{
private:
  int* arr = new int[MAX_SIZE];
  int front;
  int rear;
  int length;
public:
  Queue(){
    front = 0;
    rear = MAX_SIZE - 1;
    length = 0;
  }
  void enqueue(int value){
    if(isFull()){
      cout << "queue is full" << endl;
      return;
    }
    else{
      rear = (rear + 1) % MAX_SIZE;
      arr[rear] = value;
      length++;
      cout << "value " << value << " added to queue" << endl;
    }
  }
  void dequeue(){
    if(isEmpty()){
      cout << "queue is empty" << endl;
      return;
    }
    cout << "value " << arr[front] << " removed from queue" << endl;
    front = (front + 1) % MAX_SIZE;
    length--;
  }
  int getFront(){
    if(isEmpty()){
      cout << "queue is empty" << endl;
      return -1;
    }
    return arr[front];
  }
  bool isEmpty(){
    return length == 0;
  }
  bool isFull(){
    return length == MAX_SIZE;
  }
  int size(){
    return length;
  }
};

int main()
{
  Queue q;
  q.enqueue(10);
  q.enqueue(5);
  q.dequeue();
  cout << "front = " << q.getFront() << endl;

  return 0;
}
