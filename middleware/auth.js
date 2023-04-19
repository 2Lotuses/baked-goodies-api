import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

export default function (req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
}
