import java.util.ArrayList;
import java.util.List;

public class App {

  static void drawShapes(List<? extends Shape> shapes) {
    for (Shape s : shapes)
      s.draw();
  }

  public static void main(String[] args) {

    ArrayList<Rectangle> rects = new ArrayList<>();
    rects.add(new Rectangle());
    rects.add(new Rectangle());

    ArrayList<Circle> circles = new ArrayList<>();
    circles.add(new Circle());
    circles.add(new Circle());

    ArrayList<Shape> shapes = new ArrayList<>();
    shapes.add(new Circle());
    shapes.add(new Rectangle());

    System.out.println("----------");
    drawShapes(rects);
    System.out.println("----------");
    drawShapes(circles);
    System.out.println("----------");
    drawShapes(shapes);
  }
}
