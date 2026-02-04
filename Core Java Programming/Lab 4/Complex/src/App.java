public class App {
  public static void main(String[] args) {

    Complex<Double> c1 = new DoubleComplex(4, 2);
    Complex<Double> c2 = new DoubleComplex(1, 1);

    Complex<Double> sum = c1.add(c2);
    Complex<Double> prod = c1.product(c2);
    System.out.println(sum.getReal() + " + " + sum.getImaginary() + "i");
    System.out.println(prod.getReal() + " + " + prod.getImaginary() + "i");
  }
}
