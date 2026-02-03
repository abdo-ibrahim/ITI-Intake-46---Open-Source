import java.util.function.Function;

public class SolveQuadraticEquation implements Function<double[], double[]> {

  String equation;

  SolveQuadraticEquation(String equation) {
    this.equation = equation.replace(" ", "");
  }

  private double[] parseCoefficients(String eq) {

    int idxA = eq.indexOf("x^2");
    double a = Double.parseDouble(eq.substring(0, idxA));

    String rest = eq.substring(idxA + 3);

    int idxB = rest.lastIndexOf("x");

    double b = Double.parseDouble(rest.substring(0, idxB));
    double c = Double.parseDouble(rest.substring(idxB + 1));

    return new double[] { a, b, c };
  }

  @Override
  public double[] apply(double[] coefficients) {
    if (coefficients.length != 3) {
      throw new IllegalArgumentException("Need 3 coefficients: a, b, c");
    }

    double a = coefficients[0];
    double b = coefficients[1];
    double c = coefficients[2];

    if (a == 0) {
      throw new IllegalArgumentException("Coefficient 'a' cannot be zero");
    }

    double disc = b * b - 4 * a * c;

    if (disc < 0) {
      return new double[] {};
    } else if (disc == 0) {
      double root = -b / (2 * a);
      return new double[] { root };
    } else {
      double sqrtDisc = Math.sqrt(disc);

      double root1 = (-b + sqrtDisc) / (2 * a);
      double root2 = (-b - sqrtDisc) / (2 * a);
      return new double[] { root1, root2 };
    }
  }

  public double[] solveEquation() {
    double[] coefficients = parseCoefficients(equation);
    return apply(coefficients);
  }
}