db.orders.find()
db.inventory.find()
db.employees.find()
db.sales.find()
db.likes.find()

//1.	Find documents where the "tags" field exists.
db.inventory.find({ tags: { $exists: true } })

//2.	Find documents where the "tags" field does not contain values "ssl" or "security."
db.inventory.find({
  tags: { $nin: ["ssl", "security"] }
})

//3.	Find documents where the "qty" field is equal to 85.
db.inventory.find({
  "qty.num": 85
})
//4.	Find documents where the "tags" array contains all of the values [ssl, security] using the `$all` operator.
db.inventory.find({
  tags: { $all: ["ssl", "security"] }
})
//a.	Question:
//If you need to find only the two values "ssl" and "security", what change would you make to your query?
db.inventory.find({
  tags: { $all: ["ssl", "security"], $size: 2 }
})

//5.	Find documents where the "tags" array has a size of 3.
db.inventory.find({
  tags: { $size: 3 }
})

//6.	Update the "item" field in the "paper" document, update "size.uom" to "meter" and using the `$currentDate` operator.
db.inventory.updateOne(
  { item: "paper" },
  {
    $set: { "size.uom": "meter" },
    $currentDate: {
      updatedAt: true,
    }
  }
)
//a.	Also, use the (upsert) option (within updateOne)and change filter condition item:”laptopDevice”.
db.inventory.updateOne(
  { item: "laptopDevice" },
  {
    $set: {
      "size.uom": "meter"
    },
    $currentDate: { updatedAt: true }
  },
  { upsert: true }
)

//b.	Use the $setOnInsert operator to add new data if an insert occurs. Example field: dataSource: "todayRegister"
db.inventory.updateOne(
  { item: "laptopDevice" },
  {
    $set: { "size.uom": "meter" },
    $currentDate: { lastModified: true },
    $setOnInsert: { dataSource: "todayRegister", status: "new" }
  },
  { upsert: true }
)
//c.	Try using the updateMany operation.
db.inventory.updateMany(
  { item: "paper" },
  {
    $set: { "size.uom": "meter" },
    $currentDate: { updatedAt: true }
  }
)
//d.	Try using the `replaceOne` operation.
db.inventory.replaceOne(
  { item: "paper" },
  {
    item: "paper",
    size: { uom: "meter" },
    replaced: true
  }
)
//7.	Insert a document with incorrect field names "neme" and "ege," then rename them to "name" and "age."
db.inventory.insertOne({
  _id: 100,
  neme: "product",
  ege: 5,
})
db.inventory.updateOne(
  { _id: 100 },
  { $rename: { "neme": "name", "ege": "age" } }
)
//8.	Try to reset any document field using the `$unset` function.
db.inventory.updateOne(
  { _id: 100 },
  { $unset: { age: "" } }
)
//9.	Try update operators like `$inc`, `$min`, `$max`, and `$mul` to modify document fields.
//Important: Use a different field for each operation listed below. Insert Data If Not Existing
//Apply the following MongoDB update operators to the specified fields:
// Create document with required fields
db.inventory.insertOne({
  _id: 101,
  name: "abdulrahman",
  salary: 50000,
  overtime: 10,
  age: 30,
  quantity: 5,
  price: 10
})
//•	Use $max on the field: salary
//• Use $min on the field: overtime
//•	Use $inc on the field: age
//•	Use $mul on the fields: quantity and price
db.inventory.updateOne(
  { _id: 101 },
  {
    $max: { salary: 55000 },
    $min: { overtime: 5 },
    $inc: { age: 1 },
    $mul: {
      quantity: 2,
      price: 1.1
    }
  }
)

//10.	Calculate the total revenue for product from sales collection documents within the date range '01-01-2020' to '01-01-2023' and then sort them in descending order by total revenue.
//a.	Total Revenue=  Sum (Quantity * Price)
db.sales.aggregate([
  {
    $match: {
      date: {
        $gte: ISODate("2020-01-01"),
        $lt: ISODate("2023-01-01")
      }
    }
  },
  {
    $group: {
      _id: "$product",
      totalRevenue: {
        $sum: { $multiply: ["$quantity", "$price"] }
      }
    }
  },
  {
    $sort: { totalRevenue: -1 }
  }
])
//11.	Calculate the average salary for employees for each department from the employee’s collection.
db.employees.aggregate([
  {
    $group: {
      _id: "$department",
      avgSalary: { $avg: "$salary" }
    }
  }
])

//12.	Use likes Collection to calculate max and min likes per title
db.likes.aggregate([
  {
    $group: {
      _id: "$title",
      maxLikes: { $max: "$likes" },
      minLikes: { $min: "$likes" }
    }
  }
])


db.orders.find()
db.inventory.find()
db.employees.find()
db.sales.find()
db.likes.find()
