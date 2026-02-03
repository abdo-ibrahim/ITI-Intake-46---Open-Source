public class App {
  public static void main(String[] args) {

    double a = 1, b = -3, c = 2;

    RootStrategy strategy = RootStrategyFactory.create(a, b, c);

    StrategySolveQuadraticEquation solve = new StrategySolveQuadraticEquation(a, b, c, strategy);

    double[] roots = solve.apply();

    for (double r : roots)
      System.out.println(r);
  }
}
