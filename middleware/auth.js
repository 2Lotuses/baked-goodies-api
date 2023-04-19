import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

export default async function (req, res, next) {
  let token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
}
