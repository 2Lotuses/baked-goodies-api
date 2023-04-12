import winston from "winston";
const logger = winston.createLogger({
    format: winston.format.printf((info) => JSON.stringify(info, null, 2)),
    transports: [new winston.transports.Console({ level: "verbose" })],
});
export default logger;
