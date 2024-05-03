const winston = require("winston");
const { format } = winston;
const path = require("path");

const logsFolder = path.join(__dirname, "logs"); // Path to the new folder

const blogLogger = winston.createLogger({
  level: "info",
  format: format.combine(
    format.timestamp(), // Add timestamp to log entries
    format.json()
  ),
  transports: [
    new winston.transports.File({ filename: path.join(logsFolder, "blogactivity.log"), level: "info" })
  ],
});

module.exports = blogLogger;
