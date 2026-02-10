public class Country {
  private String code; // primary key
  private String name;
  private String continent;
  private double surfaceArea;
  private int population;
  private double gnp;
  private int capital;

  public Country(String code, String name, String continent, double surfaceArea,
      int population, double gnp, int capital) {
    this.code = code;
    this.name = name;
    this.continent = continent;
    this.surfaceArea = surfaceArea;
    this.population = population;
    this.gnp = gnp;
    this.capital = capital;
  }

  public String getCode() {
    return code;
  }

  public String getName() {
    return name;
  }

  public String getContinent() {
    return continent;
  }

  public int getPopulation() {
    return population;
  }

  public int getCapital() {
    return capital;
  }

  public double getSurfaceArea() {
    return surfaceArea;
  }

  public double getGnp() {
    return gnp;
  }

  @Override
  public String toString() {
    return "Country{" +
        "code='" + code + '\'' +
        ", name='" + name + '\'' +
        ", continent='" + continent + '\'' +
        ", population=" + population +
        ", capital=" + capital +
        '}';
  }
}