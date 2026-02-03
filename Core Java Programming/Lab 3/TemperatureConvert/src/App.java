public class App {
  public static void main(String[] args) throws Exception {

    TemperatureConvert tempConvert = new TemperatureConvert();

    float celsius = 25.0f;

    float fahrenheit = tempConvert.apply(celsius);
    System.out.println("Temp = " + celsius + "C or " + fahrenheit + " F");
  }
}
