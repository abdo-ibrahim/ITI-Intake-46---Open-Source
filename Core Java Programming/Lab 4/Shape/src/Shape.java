abstract class Shape {
  abstract void draw();
}

class Rectangle extends Shape {
  public void draw() {
    System.out.println("Drawing Rectangle");
  }
}

class Circle extends Shape {
  public void draw() {
    System.out.println("Drawing Circle");
  }
}
