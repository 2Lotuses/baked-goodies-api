import express from "express";
import Order from "../models/order.js";
// @ts-ignore
import Joi from "joi";
const router = express.Router();
router.get("/", async (req, res) => {
  const orders = await Order.find().sort("date");
  res.send(orders);
});
router.get("/:id", async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order)
    return res.status(404).send("The order with the given ID was not found.");
  res.send(order);
});
router.post("/", async (req, res) => {
  const { error } = Joi.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const order = new Order({
    orderer: req.body.orderer,
    flavor: req.body.flavor,
    description: req.body.description,
    image: req.body.image,
    isProcessed: req.body.isProcessed,
    payment: req.body.payment,
    isFullfilled: req.body.payment,
    comment: req.body.comment,
  });
  await order.save();
  res.send(order);
});
router.put("/:id", async (req, res) => {
  const { error } = Joi.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    {
      orderer: req.body.orderer,
      flavor: req.body.flavor,
      description: req.body.description,
      image: req.body.image,
      isProcessed: req.body.isProcessed,
      payment: req.body.payment,
      isFullfilled: req.body.payment,
      comment: req.body.comment,
    },
    { new: true }
  );
  if (!order)
    return res.status(404).send("The order with the given ID was not found.");
  res.send(order);
});
router.delete("/:id", async (req, res) => {
  const order = await Order.findByIdAndRemove(req.params.id);
  if (!order)
    return res.status(404).send("The order with the given ID was not found.");
  res.send(order);
});
export default router;
