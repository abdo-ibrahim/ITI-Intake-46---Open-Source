import java.util.*;
import java.util.stream.Collectors;

public class WorldDataAnalyzer {
  private List<Country> countries;
  private List<City> cities;

  public WorldDataAnalyzer(List<Country> countries, List<City> cities) {
    this.countries = countries;
    this.cities = cities;
  }

  // Highest populated city of each country O(cities)
  public Map<String, City> findHighestPopulatedCityPerCountry() {
    return cities.stream()
        .collect(Collectors.groupingBy(City::getCountryCode,
            Collectors.collectingAndThen(
                Collectors.maxBy(Comparator.comparingInt(City::getPopulation)),
                Optional::get)));
  }

  // Most populated country per continent O(countries)
  public Map<String, Country> findMostPopulatedCountryPerContinent() {
    return countries.stream()
        .collect(Collectors.groupingBy(
            Country::getContinent,
            Collectors.collectingAndThen(
                Collectors.maxBy(Comparator.comparingInt(Country::getPopulation)),
                Optional::get)));
  }

  // Highest populated capital city O(countries + cities)
  public City findHighestPopulatedCapitalCity() {
    Set<Integer> capitalIds = countries.stream()
        .map(Country::getCapital)
        .collect(Collectors.toSet());

    return cities.stream()
        .filter(city -> capitalIds.contains(city.getId()))
        .max(Comparator.comparingInt(City::getPopulation))
        .orElse(null);
  }
}
