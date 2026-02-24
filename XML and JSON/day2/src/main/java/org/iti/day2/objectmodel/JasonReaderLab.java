package org.iti.day2.objectmodel;

import java.io.File;
import java.io.FileReader;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonNumber;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
import jakarta.json.JsonString;

public class JasonReaderLab {

  public void consumeJsonUsingJasonReader() throws Exception {
    File file = new File(getClass().getResource("/movie.json").toURI());
    JsonReader reader = Json.createReader(new FileReader(file));

    JsonObject jsonObject = reader.readObject();

    JsonString titleJsonString = jsonObject.getJsonString("title");
    System.out.println(titleJsonString);

    JsonNumber yearJsonNumber = jsonObject.getJsonNumber("year");
    System.out.println(yearJsonNumber);

    JsonArray castJsonArray = jsonObject.getJsonArray("cast");
    for (int i = 0; i < castJsonArray.size(); i++) {
      JsonString jsonString = castJsonArray.getJsonString(i);
      System.out.println(jsonString);
    }

  }

}
