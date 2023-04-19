import express from "express";
import cors from "cors";
import order from "../routes/order.js";
import upload from "../routes/upload.js";
import customer from "../routes/customer.js";
import admin from "../routes/admin.js";

export default function (app) {
  app.use(cors());
  app.use(express.json({ extended: false }));
  app.use("/admin", admin);
  app.use("/customer", customer);
  app.use("/order", order);
  app.use("/upload", upload);
}
