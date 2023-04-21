import mongoose from "mongoose";
import { customerSchema } from "./customer.js";

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: customerSchema,
      required: true,
    },
    orderDate: {
      type: String,
      require: true,
    },
    promiseDate: {
      type: String,
      require: true,
    },
    flavor: {
      type: String,
      required: true,
    },
    shape: {
      type: String,
      required: true,
    },
    orderDetails: {
      type: String,
      maxlength: 255,
    },
    images: Array,
    payment: {
      type: String,
      required: true,
    },
    comment: { type: String, maxlength: 255 },
    status: {
      type: String,
      default: "processing",
    },
    price: {
      type: Number,
      min: 0,
      default: 0,
    },
    isDone: {
      type: Boolean,
      default: false,
    },
  },
  { collection: "orders" }
);

const Order = mongoose.model("orders", orderSchema);

export default Order;
