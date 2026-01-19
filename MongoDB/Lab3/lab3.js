use Demo

//1.	Provide the MongoDB code for enforcing JSON schema validation when creating a collection named "employees" with required fields
// "name," "age" (min. 18), and "department" (limited to ["HR," "Engineering," "Finance"]).

db.createCollection("employees", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "age", "department"],
      properties: {
        name: {
          bsonType: "string"
        },
        age: {
          bsonType: "int",
          minimum: 18
        },
        department: {
          enum: ["HR", "Engineering", "Finance"]
        }
      }
    }
  }
})

//2.	Create new Database named Demo
//And Collections named trainningCenter1, trainningCenter2 
//a.	Insert documents into trainningCenter1 collection contains (Use Variable named data as Array)
//i.	_id , name as firstName lastName , age , address as array , status
//b.	Using insert ONE from data Variable
//c.	Using Same Variable (data) with same data and insert MANY into trainningCenter2 collection

db.createCollection("trainningCenter1")
db.createCollection("trainningCenter2")
var data = [
  {
    _id: 1,
    firstName: "Abdo",
    lastName: "Ibrahim",
    age: 24,
    address: ["Dakahlia", "Mit-Ghamr"],
    status: "Active"
  },
  {
    _id: 2,
    firstName: "Ahmed",
    lastName: "Hassan",
    age: 30,
    address: ["Giza"],
    status: "Inactive"
  }
]
db.trainningCenter1.insertOne(data)
db.trainningCenter2.insertMany(data)

db.trainningCenter1.drop()

db.trainningCenter1.find()
db.trainningCenter2.find()


//3.	Use find. explain function (find by age field) and mention scanning type
db.trainningCenter1.find({ age: 22 }).explain()
//COLLSCAN

//4.	Create index on created collection named it “IX_age” on age field 
db.trainningCenter2.createIndex( {age: 1}, { name: "IX_age"})

//5.	Use find. explain view winning plan for index created (find by age field) and mention scanning type
db.trainningCenter2.find({ age: 22 }).explain()
//IXSCAN

//6.	Create index on created collection named it “compound” on firstNsme and lastName
db.trainningCenter1.createIndex(
  { firstName: 1, lastName: 1 },
  { name: "IX_Name" }
)

//a.	Try find().explain before create index and mention scanning type
db.trainningCenter1.find({ firstName: "Abdo", lastName: "Ibrahim" }).explain()
//COLLSCAN

//b.	Try find().explain after create index and mention scanning type
//IXSCAN


//7.	Drop Demo Database
use Demo
db.dropDatabase()


