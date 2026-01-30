require("dotenv").config();
const connectDB = require("./config/DB");
const app = require("./app");

connectDB();

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
