import mongoose from "mongoose";
// @ts-ignore
import Joi from "joi";
const orderSchema = new mongoose.Schema({
  orderer: {
    type: String,
    maxlength: 30,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  flavor: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    maxlength: 255,
  },
  images: Array,
  isProcessed: {
    type: Boolean,
    default: false,
  },
  payment: String,
  isFullfilled: {
    type: Boolean,
    default: false,
  },
  comment: { type: String, maxlength: 255 },
});
export const Order = mongoose.model("Order", orderSchema);
export function schema(order) {
  const schema = Joi.object({
    _id: Joi.string().hex().length(24),
    orderer: Joi.string().max(30),
    date: Joi.date(),
    flavor: Joi.string().required(),
    description: Joi.string().max(255),
    images: Joi.array(),
    isProcessed: Joi.boolean(),
    payment: Joi.string(),
    isFullfilled: Joi.boolean(),
    comment: Joi.string().max(255),
  });
  return Joi.validate(order, schema);
}
export default Order;
