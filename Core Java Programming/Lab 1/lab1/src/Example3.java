public class Example3 {
  public static void main(String[] args) {
    if (args.length > 0) {
      try {
        int times = Integer.valueOf(args[0]);
        for (int i = 0; i < times; i++) {
          System.out.println(args[1]);
        }
      } catch (NumberFormatException e) {
        System.out.println("First argument must be a number.");
      }
    } else {
      System.out.println("No args provided.");
    }
  }
}
