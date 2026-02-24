package org.iti.day2.objectmodel;

import java.io.FileWriter;
import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonWriter;

public class JasonWriterLab {

  public void produceJsonUsingJasonWriter() throws Exception {
    JsonWriter writer = Json.createWriter(new FileWriter("movie.json"));

    JsonObject jsonObject = Json
        .createObjectBuilder()
        .add("title", "The Matrix")
        .add("year", 1999)
        .add("cast", Json.createArrayBuilder()
            .add("Keanu Reeves")
            .add("Laurence Fishburne")
            .add("Carrie-Anne Moss"))
        .build();

    writer.write(jsonObject);
    writer.close();

  }

}
