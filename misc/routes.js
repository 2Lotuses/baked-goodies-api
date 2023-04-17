import express from "express";
import cors from "cors";
import Order from "../routes/order.js";
import Upload from "../routes/upload.js";
import Customer from "../routes/customer.js";

export default function (app) {
  app.use(
    cors({
      origin: "https://baked-goodies.vercel.app/",
    })
  );
  app.use(express.json({ extended: false }));
  app.use("/customer", Customer);
  app.use("/order", Order);
  app.use("/upload", Upload);
}
