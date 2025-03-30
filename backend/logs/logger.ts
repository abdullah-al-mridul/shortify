// importing modules
import winston from "winston";
import moment from "moment";
import path from "path";

// log history file path to use for logging
const logFilePath: string = path.join(__dirname, "shortify.log");

// create logger for better logging
const logger = winston.createLogger({
  // default log level
  level: "info",
  // format logger for better visibility
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) => {
      return `[${moment(timestamp as string).format(
        "DD-MM-YYYY__hh:mm A"
      )}] ${level}: ${message}`;
    })
  ),
  // add logs in file and console
  transports: [
    // configure log style for the console
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.printf(({ level, message, timestamp }) => {
          return `[${moment(timestamp as string).format(
            "DD-MM-YYYY__hh:mm A"
          )}] ${level}: ${message}`;
        })
      ),
    }),
    // configure logging for file
    new winston.transports.File({
      filename: logFilePath,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.printf(({ level, message, timestamp }) => {
          return `[${moment(timestamp as string).format(
            "DD-MM-YYYY__hh:mm A"
          )}] ${level}: ${message}`;
        })
      ),
    }),
  ],
});

// export for external use
export { logger };
