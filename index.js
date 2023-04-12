import express from "express";
import routes from "./misc/routes.js";
import logger from "./misc/logger.js";
import db from "./misc/db.js";
const app = express();

process.on("unhandledRejection", (ex) => {
  throw ex;
});
routes(app);
db();
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  logger.info(`Listening to port ${port}...`);
});
export default server;
