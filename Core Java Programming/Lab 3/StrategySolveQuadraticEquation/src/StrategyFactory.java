class RootStrategyFactory {

  static RootStrategy create(double a, double b, double c) {

    double disc = b * b - 4 * a * c;

    if (disc < 0)
      return new NoRootsStrategy();
    else if (disc == 0)
      return new OneRootStrategy();
    else
      return new TwoRootsStrategy();
  }
}
