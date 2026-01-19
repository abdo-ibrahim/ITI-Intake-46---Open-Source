// Q1: Create a Database named "ITI_Mongo".
use ITI_Mongo
//Q2: Create a Collection named "Staff".
db.createCollection("Staff")
//Q3: Insert one document into the "Staff" collection: Lid. name. age. gender. department}.
db.Staff.insertOne({
    _id: 1,
    name: "Abdo",
    age: 24,
    gender: "male",
    department: "os"
})

db.Staff.find({})

//Q4:Insert many documents into the "Staff" collection: 0 Object: Lid. name. age: 20. gender: "male". department} 0 Object: Lid. name. age: 25. gender: "female". managerName. department} 0 Object: Lid. name. age: [5. gender. DOB}
db.Staff.insertMany([
  {
    _id: 2,
    name: "Ali",
    age: 20,
    gender: "male",
    department: "IT"
  },
  {
    _id: 3,
    name: "Sara",
    age: 25,
    gender: "female",
    managerName: "Mohamed",
    department: "HR"
  },
  {
    _id: 4,
    name: "Omar",
    age: 15,
    gender: "male",
    DOB: new Date("2009-05-10")
  }
])


// Q5: 

// 1) Find all documents.
db.Staff.find({})

// 2) Find documents where gender is "male".
db.Staff.find({gender: "male"})

// 3) Find documents with age between 20 and 25.
db.Staff.find({age: { $gte: 20, $lte: 25 } })

// 4) Find documents where age is 25 and gender is "female".
db.Staff.find({
  age: 25,
  gender: "female"
})


// 5) Find documents where age is 20 or gender is "female".
db.Staff.find({
    $or:[
        {age:20},
        {gender: "female"}
    ]
})

//6. Update one document in the "Staff" collection where age is 15, set the name to "your name".
db.Staff.updateOne(
    {age: 15},
    {$set:{ name: "Abdo Ibrahim" } }
)

// 7. Update many documents in the "StafF" collection. setting the department to "AI".
db.Staff.updateMany(
    {},
    {$set: {department: "AI"}}
)

// 8. Create a new collection called "test" and insert documents from Question 4.
db.createCollection("test")

db.test.insertMany([
  {
    _id: 2,
    name: "Ali",
    age: 20,
    gender: "male",
    department: "IT"
  },
  {
    _id: 3,
    name: "Sara",
    age: 25,
    gender: "female",
    managerName: "Mohamed",
    department: "HR"
  },
  {
    _id: 4,
    name: "Omar",
    age: 15,
    gender: "male",
    DOB: new Date("2009-05-10")
  }
])

db.test.find({})

// 9. Try to delete one document from the "test" collection where age is 15.
db.test.deleteOne({age: 15})

// a. With justification, explain which document will be deleted if more than one has age = 15. (Try it.)
//--> delete first doc
//b.
db.test.insertOne({ _id: 5, name: "ahmed", age: 15 })

//c.
db.test.insertOne({ _id: 6, name: "eman", age: 15 })

//d.	b. When you run deleteOne, will it delete ahmed or eman?
db.test.deleteOne({age: 15})
// --> delete first "ahmed"


// 1O. try to delete all male gender
db.test.deleteMany({gender: "male"})

// 11. Try to delete all documents in the "test" collection.
db.test.deleteMany({})

