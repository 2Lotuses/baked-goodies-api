import express from "express";
import Order from "../routes/order.js";
import Upload from "../routes/upload.js";
import Customer from "../routes/customer.js";

export default function (app) {
  app.use(express.json({ extended: false }));
  app.use("/api/customer", Customer);
  app.use("/api/order", Order);
  app.use("/api/upload", Upload);
}
