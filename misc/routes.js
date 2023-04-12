import express from "express";
import error from "../middleware/error.js";
import Order from "../routes/order.js";
export default function (app) {
    app.use(express.json());
    app.use("/api/order", Order);
    app.use(error);
}
