import express from "express";
import Order from "../models/order.js";
import Customer from "../models/customer.js";
import customer from "../middleware/customer.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const orders = await Order.find(req.query).sort({ date: 1 }).lean();
  res.send(orders);
});

router.get("/:id", async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id, isPaid: false });
  if (!order)
    return res.status(404).send("The order with the given ID was not found.");
  res.send(order);
});

router.post("/", customer, async (req, res) => {
  const customer = await Customer.findOne({ email: req.user.email });

  const order = new Order({
    customer: customer,
    orderDate: req.body.orderDate,
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
      $push: {
        orders: {
          $each: [order._id],
          $positon: 0,
        },
      },
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
      orderDate: req.body.orderDate,
      promiseDate: req.body.promiseDate,
      flavor: req.body.flavor,
      shape: req.body.shape,
      orderDetails: req.body.orderDetails,
      images: req.body.images,
      payment: req.body.payment,
      comment: req.body.comment,
      status: req.body.status,
      isPaid: req.body.isPaid,
      price: req.body.price,
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
