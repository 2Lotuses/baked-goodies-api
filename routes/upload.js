import express from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import fs from "fs";
import * as dotenv from "dotenv";

dotenv.config();

const router = express();

cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
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
  if (req.files === []) {
    return res.status(400).send("No file were uploaded");
  }

  const imageArray = [];

  for (let file of req.files) {
    const result = await cloudinary.uploader.upload(`./${file.path}`);
    imageArray.push(result.secure_url);

    fs.unlinkSync(`./${file.path}`);
  }

  res.send(imageArray);
});

export default router;
