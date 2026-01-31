public class Example2 {

  public static void main(String[] args) {
    if (args.length > 0) {
      System.out.println("true value");
      for (int i = 0; i < args.length; i++) {
        System.out.println((i + 1) + ": " + args[i]);
      }
    } else {
      System.out.println("false value");
    }
  }
}
