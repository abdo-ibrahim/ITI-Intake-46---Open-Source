package org.iti.day2.jasonb;

public class Dog {
  public String name;
  public int age;
  public boolean bitable;

  public Dog(String name, int age, boolean bitable) {
    this.name = name;
    this.age = age;
    this.bitable = bitable;
  }

  public Dog() {
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public int getAge() {
    return age;
  }

  public void setAge(int age) {
    this.age = age;
  }

  public boolean isBitable() {
    return bitable;
  }

  public void setBitable(boolean bitable) {
    this.bitable = bitable;
  }

}
