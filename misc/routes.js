import express from "express";
import error from "../middleware/error.js";
import order from "../routes/order.js";
import upload from "../routes/upload.js";
export default function (app) {
  app.use(express.json());
  app.use("/api/order", order);
  app.use("/api/upload", upload);
  app.use(error);
}
