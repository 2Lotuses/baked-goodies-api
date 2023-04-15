import express from "express";
import error from "../middleware/error.js";
import order from "../routes/order.js";
import upload from "../routes/upload.js";
export default function (app) {
  app.use(express.json({ extended: false }));
  app.use("/order", order);
  app.use("/upload", upload);
  app.use(error);
}
