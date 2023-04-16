import express from "express";
import Customer from "../models/customer.js";

const router = express.Router();

router.get("/me", async (req, res) => {
  const customers = await Customer.findById(req.user._id);
  res.send(customers);
});

router.post("/", async (req, res) => {
  let customer = await Customer.findOne({ email: req.body.email });
  if (customer) return res.status(400).send("Email Already Registered");

  customer = new Customer({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    orders: req.body.orders,
  });

  await customer.save();

  const token = customer.generateAuthToken();
  console.log(token);
  res.header("x-auth-token", token).send(customer);
});

export default router;
