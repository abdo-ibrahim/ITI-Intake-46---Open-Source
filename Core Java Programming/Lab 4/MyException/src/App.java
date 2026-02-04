public class App {
  public static void main(String[] args) {
    Service s = new Service();
    try {
      s.method1();
    } catch (MyException e) {
      System.out.println(e.getMessage());
      // e.printStackTrace();
    }
    try {
      s.method2();
    } catch (MyException e) {
      System.out.println(e.getMessage());
    }
    try {
      s.method3();
    } catch (MyException e) {
      System.out.println(e.getMessage());
    }
  }
}
