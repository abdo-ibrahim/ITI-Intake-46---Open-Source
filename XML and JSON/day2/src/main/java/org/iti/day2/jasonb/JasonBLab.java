package org.iti.day2.jasonb;

import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

public class JasonBLab {

  public JasonBLab() {

    // Create a dog instance
    Dog dog = new Dog();
    dog.name = "Falco";
    dog.age = 4;
    dog.bitable = false;

    // Create Jsonb and serialize
    Jsonb jsonb = JsonbBuilder.create();
    String result = jsonb.toJson(dog);
    System.out.println(result);

    // Deserialize back
    dog = jsonb.fromJson("{\"age\":4,\"bitable\":false,\"name\":\"Falco\"}", Dog.class);

    // using Array
    Dog[] dogs = new Dog[2];
    dogs[0] = dog;
    dogs[1] = new Dog("Roe", 2, false);
    result = jsonb.toJson(dogs);
    System.out.println(result);
    Dog[] results = jsonb.fromJson(result, Dog[].class);
    System.out.println(results[1].name);
    // using Generics
    List<Dog> dogsList = new ArrayList<>();
    dogsList.add(dog);
    dogsList.add(new Dog("Thunder", 5, false));
    result = jsonb.toJson(dogsList);
    System.out.println(result);
    Type listType = new ArrayList<Dog>().getClass().getGenericSuperclass();
    List resultList = jsonb.fromJson(result, new ArrayList().getClass());
    resultList.forEach(System.out::println);

  }

}
