import express from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import fs from "fs";
import * as dotenv from "dotenv";
import { send } from "process";

dotenv.config();

const router = express();

cloudinary.config({
  secure: true,
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "./uploads");
  },
  filename: (req, file, callBack) => {
    callBack(null, `BG ${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.array("imageUpload", 5), async (req, res) => {
  if (!req.files) {
    return res.status(400).send("No file were uploaded");
  }

  const result = await cloudinary.uploader.upload(`./${req.files[0].path}`);
  res.send(result.secure_url);

  fs.unlinkSync(`./${req.files[0].path}`);
});

export default router;
