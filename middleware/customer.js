import jwt from "jsonwebtoken";
import Customer from "../models/customer.js";
import * as dotenv from "dotenv";

dotenv.config();

export default async function (req, res, next) {
  let token = req.cookies.token;
  // if (!token) return res.status(401).send("Access denied. No token provided.");
  if (!token) {
    let customer = await Customer.findOne({ email: req.body.email });
    if (customer) return res.status(400).send("Email Already Registered");

    customer = new Customer({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    });

    await customer.save();
    token = customer.generateAuthToken();
    req.user = customer;
    res.cookie("token", token, { httpOnly: true });

    next();
  } else {
    try {
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      req.user = decoded;
      next();
    } catch (ex) {
      res.status(400).send("Invalid token.");
    }
  }
}
