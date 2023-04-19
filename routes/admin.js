import express from "express";
import Admin from "../models/admin.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const admin = await Admin.find();
  res.send(admin);
});

export default router;
