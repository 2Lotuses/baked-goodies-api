import express from "express";
import cors from "cors";
import order from "../routes/order.js";
import upload from "../routes/upload.js";
import customer from "../routes/customer.js";
import admin from "../routes/admin.js";
import cookieParser from "cookie-parser";

export default function (app) {
  app.use(cors());
  app.use(express.json({ extended: false }));
  app.use(cookieParser());
  app.use("/api/admin", admin);
  app.use("/api/customer", customer);
  app.use("/api/order", order);
  app.use("/api/upload", upload);
}
