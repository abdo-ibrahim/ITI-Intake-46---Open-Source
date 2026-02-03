public class App {
  public static void main(String[] args) throws Exception {

    String equation = "1x^2 -3x +2";

    SolveQuadraticEquation qe = new SolveQuadraticEquation(equation);
    double[] roots = qe.solveEquation();

    if (roots.length == 0) {
      System.out.println("No roots.");
    } else if (roots.length == 1) {
      System.out.println("One root: " + roots[0]);
    } else {
      System.out.println("Two roots: " + roots[0] + " and " + roots[1]);
    }
  }
}
