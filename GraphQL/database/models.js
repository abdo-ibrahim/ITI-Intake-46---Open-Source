import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  age: { type: Number },
  companies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
  ],
});

const companySchema = new mongoose.Schema({
  name: { type: String },
  address: { type: String },
});

const User = mongoose.model("User", userSchema);
const Company = mongoose.model("Company", companySchema);

export { User, Company };
