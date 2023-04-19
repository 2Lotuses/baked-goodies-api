import express from "express";
import Order from "../models/order.js";
import Customer from "../models/customer.js";
import customer from "../middleware/customer.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const orders = await Order.find().sort({ date: 1 }).lean();
  res.send(orders);
});

router.get("/:id", async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order)
    return res.status(404).send("The order with the given ID was not found.");
  res.send(order);
});

router.post("/", customer, async (req, res) => {
  const customer = await Customer.findOne({ email: req.user.email });

  const order = new Order({
    customer: customer,
    promiseDate: req.body.promiseDate,
    flavor: req.body.flavor,
    shape: req.body.shape,
    orderDetails: req.body.orderDetails,
    images: req.body.images,
    payment: req.body.payment,
  });

  await order.save();
  await Customer.findByIdAndUpdate(
    customer._id,
    {
      $push: { orders: order._id },
    },
    { new: true }
  );
  res.send(order);
});

router.put("/:id", async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    {
      customerId: req.body.customerId,
      promiseDate: req.body.promiseDate,
      flavor: req.body.flavor,
      shape: req.body.shape,
      orderDetails: req.body.orderDetails,
      images: req.body.images,
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
