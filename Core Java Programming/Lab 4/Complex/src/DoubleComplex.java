public class DoubleComplex implements Complex<Double> {
  double real, img;

  public DoubleComplex(double real, double img) {
    this.real = real;
    this.img = img;
  }

  @Override
  public Double getReal() {
    return real;
  }

  @Override
  public Double getImaginary() {
    return img;
  }

  @Override
  public Complex<Double> add(Complex<Double> z) {
    return new DoubleComplex(this.real + z.getReal(), this.img + z.getImaginary());
  }

  @Override
  public Complex<Double> subtract(Complex<Double> z) {
    return new DoubleComplex(this.real - z.getReal(), this.img - z.getImaginary());
  }

  @Override
  public Complex<Double> product(Complex<Double> z) {
    // (a + bi)(c + di) = (a*c - b*d) + (a*d + b*c)i
    double realPart = this.real * z.getReal() - this.img * z.getImaginary();
    double imgPart = this.real * z.getImaginary() + this.img * z.getReal();
    return new DoubleComplex(realPart, imgPart);
  }

  @Override
  public Complex<Double> div(Complex<Double> z) {
    // (a + bi) / (c + di) = [(a*c + b*d) + (b*c - a*d)i] / (c^2 + d^2)
    double denominator = z.getReal() * z.getReal() + z.getImaginary() * z.getImaginary();
    double realPart = (this.real * z.getReal() + this.img * z.getImaginary()) / denominator;
    double imgPart = (this.img * z.getReal() - this.real * z.getImaginary()) / denominator;
    return new DoubleComplex(realPart, imgPart);
  }

}
