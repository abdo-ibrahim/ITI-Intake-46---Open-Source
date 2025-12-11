#include <iostream>

using namespace std;

class Bank{
 private:
  int id;
  string name;
  float balance;

 public:
  void SetId(int _id){
    id = _id;
  }
  void SetName(string _name){
    name = _name;
  }
  void Withdraw(float _sub){
    if(balance - _sub < 0){
      cout << "your balance not enough" << endl;
    }
    else {
      balance -= _sub;
      cout << "sucessuflly Withdraw " << _sub << endl;
    }
  }
  void Deposite(float _sub){
    balance += _sub;
    cout << "sucessuflly added " << _sub << endl;
  }

  int GetId(){
    return id;
  }
  string GetName(){
    return name;
  }
  float GetBalance(){
    return balance;
  }
  void print(){
    cout << "id: " << id << endl;
    cout << "name: " << name << endl;
    cout << "balance: " << balance << endl;
  }
};

int main() {
  Bank b1;
  b1.SetId(1);
  b1.SetName("Abdo");
  b1.Deposite(900);
  b1.Withdraw(500);  // 400
  b1.Deposite(100);  // 500
  b1.print();

  return 0;
}



