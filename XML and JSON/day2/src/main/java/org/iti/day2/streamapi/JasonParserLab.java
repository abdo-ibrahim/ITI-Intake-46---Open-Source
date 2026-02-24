package org.iti.day2.streamapi;

import jakarta.json.Json;
import jakarta.json.stream.JsonParser;
import jakarta.json.stream.JsonParser.Event;
import java.io.File;
import java.io.FileReader;

public class JasonParserLab {
  public void consumeJsonInStreamingFashion() throws Exception {
    File file = new File(getClass().getResource("/movie.json").toURI());
    JsonParser parser = Json.createParser(new FileReader(file));

    while (parser.hasNext()) {
      final Event event = parser.next();
      switch (event) {
        case KEY_NAME:
          System.out.println("KEY_NAME \t => \t" + parser.getString());
          break;
        case VALUE_STRING:
          System.out.println("VALUE_STRING \t => \t" + parser.getString());
          break;
        case VALUE_NUMBER:
          System.out.println("VALUE_NUMBER \t => \t" + parser.getBigDecimal());
          break;
        case VALUE_TRUE:
          System.out.println("VALUE_TRUE \t => \t" + true);
          break;
        case VALUE_FALSE:
          System.out.println("VALUE_FALSE \t => \t" + false);
          break;
        case VALUE_NULL:
          System.out.println("VALUE_NULL \t => \t" + "null");
          break;
        case END_ARRAY:
          System.out.println("END_ARRAY \t => \t" + "]");
          break;
        case END_OBJECT:
          System.out.println("END_OBJECT \t => \t" + "}");
          break;
        case START_ARRAY:
          System.out.println("START_ARRAY \t => \t" + "[");
          break;
        case START_OBJECT:
          System.out.println("START_OBJECT \t => \t" + "{");
          break;
      }
    }

  }

}
// START_OBJECT => {
// KEY_NAME => title
// VALUE_STRING => The Matrix
// KEY_NAME => year
// VALUE_NUMBER => 1999
// KEY_NAME => cast
// START_ARRAY => [
// VALUE_STRING => Keanu Reeves
// VALUE_STRING => Laurence Fishburne
// VALUE_STRING => Carrie-Anne Moss
// END_ARRAY => ]
// END_OBJECT => }