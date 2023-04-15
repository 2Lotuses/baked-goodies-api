import express from "express";
import error from "../middleware/error.js";
import order from "../routes/order.js";
import upload from "../routes/upload.js";
import helmet from "helmet";
import morgan from "morgan";
export default function (app) {
  app.use(helmet());
  app.use(express.json({ extended: false }));
  app.use("/api/order", order);
  app.use("/api/upload", upload);
  app.use(error);
  app.use(morgan);
}
