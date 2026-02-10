import java.io.*;
import java.util.*;

public class CsvReader {

  public static List<Country> readCountries(String filePath) {
    List<Country> countries = new ArrayList<>();

    try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {

      String line = br.readLine(); // skip header

      while ((line = br.readLine()) != null) {
        String[] data = line.split(",");
        countries.add(new Country(
            data[0],
            data[1],
            data[2],
            Double.parseDouble(data[3]),
            Integer.parseInt(data[4]),
            Double.parseDouble(data[5]),
            Integer.parseInt(data[6])));
      }

    } catch (IOException | NumberFormatException e) {
      e.printStackTrace();
    }

    return countries;
  }

  public static List<City> readCities(String filePath) {
    List<City> cities = new ArrayList<>();

    try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {

      String line = br.readLine(); // skip header

      while ((line = br.readLine()) != null) {
        String[] data = line.split(",");

        cities.add(new City(
            Integer.parseInt(data[0]),
            data[1],
            Integer.parseInt(data[2]),
            data[3]));
      }

    } catch (IOException | NumberFormatException e) {
      e.printStackTrace();
    }

    return cities;
  }
}
