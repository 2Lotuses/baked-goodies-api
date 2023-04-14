import express from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import imgur from "imgur";

const router = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "-" + fileName);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

router.post("/", upload.single("imageUpload"), function (req, res) {
  // req.file is the name of your file in the form above, here 'uploaded_file'
  // req.body will hold the text fields, if there were any
  console.log(req.file, req.body);
});

// router.post("/", upload.array("imageUpload", 3), function (req, res) {
//   const file = req.file;

//   // req.files is array of `photos` files
//   // req.body will contain the text fields, if there were any
//   console.log(req.file, req.body);
// });

// const cpUpload = upload.fields([
//   { name: "image", maxCount: 1 },
//   { name: "gallery", maxCount: 8 },
// ]);
// router.post("/cool-profile", cpUpload, function (req, res, next) {
//   // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
//   //
//   // e.g.
//   //  req.files['avatar'][0] -> File
//   //  req.files['gallery'] -> Array
//   //
//   // req.body will contain the text fields, if there were any
// });

// router.post("/", async (req, res) => {
//   if (!req.files) {
//     return res.status(400).send("No file were uploaded");
//   }

//   let imageUpload = req.files.imageUpload;
//   let uploadPath = __dirname + "/uploads/" + imageUpload.name;

//   imageUpload.mv(uploadPath, (err) => {
//     if (err) {
//       return res.status(500).send(err);
//     }
//   });

//   imgur.uploadFile(uploadPath).then((upload) => {
//     fs.unlinkSync(uploadPath);
//     res.send(upload.data.link);
//   });
// });

export default router;
