import java.util.List;
import java.util.Map;

public class App {
  public static void main(String[] args) {

    // Read CSV files
    List<Country> countries = CsvReader.readCountries("countries.csv");

    List<City> cities = CsvReader.readCities("cities.csv");

    System.out.println("Loaded " + countries.size() + " countries");
    System.out.println("Loaded " + cities.size() + " cities");

    WorldDataAnalyzer analyzer = new WorldDataAnalyzer(countries, cities);

    // Find highest populated city per country
    Map<String, City> highestPopulatedCities = analyzer.findHighestPopulatedCityPerCountry();
    System.out.println("\nHighest populated city per country:");
    highestPopulatedCities.forEach((countryCode, city) -> {
      System.out.println(countryCode + ": " + city.getName() + " (Population: " + city.getPopulation() + ")");
    });

    // Find most populated country per continent
    Map<String, Country> mostPopulatedCountries = analyzer.findMostPopulatedCountryPerContinent();
    System.out.println("\nMost populated country per continent:");
    mostPopulatedCountries.forEach((continent, country) -> {
      System.out.println(continent + ": " + country.getName() + " (Population: " + country.getPopulation() + ")");
    });

    // Find highest populated capital city
    City highestPopulatedCapital = analyzer.findHighestPopulatedCapitalCity();
    if (highestPopulatedCapital != null) {
      System.out.println("\nHighest populated capital city: " + highestPopulatedCapital.getName() +
          " (Population: " + highestPopulatedCapital.getPopulation() + ")");
    } else {
      System.out.println("\nNo capital cities found.");
    }
  }
}
