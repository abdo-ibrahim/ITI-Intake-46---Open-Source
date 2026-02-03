class StrategySolveQuadraticEquation {

  double a, b, c;
  RootStrategy strategy;

  StrategySolveQuadraticEquation(double a, double b, double c, RootStrategy strategy) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.strategy = strategy;
  }

  double[] apply() {
    return strategy.apply(a, b, c);
  }
}

// strategy Interface
interface RootStrategy {
  double[] apply(double a, double b, double c);
}

// concrete strategies
class NoRootsStrategy implements RootStrategy {
  public double[] apply(double a, double b, double c) {
    return new double[] {};
  }
}

class OneRootStrategy implements RootStrategy {
  public double[] apply(double a, double b, double c) {
    return new double[] { -b / (2 * a) };
  }
}

class TwoRootsStrategy implements RootStrategy {
  public double[] apply(double a, double b, double c) {

    double disc = b * b - 4 * a * c;
    double sqrtDisc = Math.sqrt(disc);

    double root1 = (-b + sqrtDisc) / (2 * a);
    double root2 = (-b - sqrtDisc) / (2 * a);
    return new double[] { root1, root2 };
  }
}
