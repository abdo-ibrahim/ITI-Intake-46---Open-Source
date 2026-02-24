package org.iti.day2.streamapi;

import jakarta.json.Json;
import jakarta.json.stream.JsonGenerator;
import java.io.FileWriter;

public class JasonGeneratorLab {

  public void produceJsonInStreamingFashion() throws Exception {
    JsonGenerator generator = Json.createGenerator(new FileWriter("movie.json"));

    generator.writeStartObject()
        .write("title", "The Matrix")
        .write("year", 1999)
        .writeStartArray("cast")
        .write("Keanu Reeves")
        .write("Laurence Fishburne")
        .write("Carrie-Anne Moss")
        .writeEnd()
        .writeEnd();

    generator.flush();
    generator.close();
  }

}
// {
// "title": "The Matrix",
// "year": 1999,
// "cast": [
// "Keanu Reeves",
// "Laurence Fishburne",
// "Carrie-Anne Moss"
// ]
// }