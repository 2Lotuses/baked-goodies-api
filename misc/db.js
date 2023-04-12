import mongoose from "mongoose";
import * as dotenv from "dotenv";
import logger from "./logger.js";
dotenv.config();
export default function () {
    const db = process.env.db;
    mongoose.connect(db).then(() => logger.info(`Connected to ${db}...`));
}
