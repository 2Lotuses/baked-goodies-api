import express from "express";
import Customer from "../models/customer.js";
import auth from "../middleware/auth.js";

const router = express.Router();

Customer.collection.createIndex({ "customer.email": 1 });

router.get("/", auth, async (req, res) => {
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
  res.header("x-auth-token", token).send(customer);
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

export default router;
