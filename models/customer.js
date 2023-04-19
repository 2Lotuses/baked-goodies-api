import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

export const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true,
    },
    phone: {
      type: String,
      minlength: 5,
      maxlength: 50,
    },
    orders: {
      type: Array,
    },
  },
  {
    collection: "customers",
  }
);

customerSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      phone: this.phone,
    },
    process.env.JWT_KEY
  );
  return token;
};

const Customer = mongoose.model("customers", customerSchema);

export default Customer;
