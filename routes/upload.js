import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import * as dotenv from "dotenv";
import DatauriParser from "datauri/parser.js";
import path from "path";

dotenv.config();

const router = express();

cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

const parser = new DatauriParser();

router.post("/", upload.array("imageUpload", 5), async (req, res) => {
  if (req.files === []) {
    return res.status(400).send("No file were uploaded");
  }
  const linkArray = [];

  for (let file of req.files) {
    const file64 = parser.format(
      path.extname(file.originalname).toString(),
      file.buffer
    );
    const result = await cloudinary.uploader.upload(file64.content);
    linkArray.push(result.url);
  }

  res.send(linkArray);
});

export default router;
