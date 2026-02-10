public class City {
  private int id;
  private String name;
  private int population;
  private String countryCode; // foreign key

  public City(int id, String name, int population, String countryCode) {
    this.id = id;
    this.name = name;
    this.population = population;
    this.countryCode = countryCode;
  }

  public int getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public int getPopulation() {
    return population;
  }

  public String getCountryCode() {
    return countryCode;
  }

  @Override
  public String toString() {
    return "City{" +
        "id=" + id +
        ", name='" + name + '\'' +
        ", population=" + population +
        ", countryCode='" + countryCode + '\'' +
        '}';
  }
}