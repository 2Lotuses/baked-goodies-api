import express from "express";
import Customer from "../models/customer.js";
import Order from "../models/order.js";
import auth from "../middleware/auth.js";

const router = express.Router();

Customer.collection.createIndex({ "customer.email": 1 });

router.get("/", auth, async (req, res) => {
  const customer = await Customer.findById(req.user._id);
  // const order = await Order.find({
  //   "customer._id": customer._id,
  //   isPaid: false,
  // })
  //   .sort({ date: 1 })
  //   .lean();
  res.send(customer);
});

router.put("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    },
    { new: true }
  );
  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");
  res.send(customer);
});

router.put("/cancel/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  const order = await Order.findByIdAndRemove(customer.orders[0]);
  if (!order)
    return res.status(404).send("The order with the given ID was not found.");

  const update = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      $pop: {
        orders: -1,
      },
    },
    { new: true }
  );

  res.send(update);
});

export default router;
