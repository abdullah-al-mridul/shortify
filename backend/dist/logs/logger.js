"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
// importing modules
const winston_1 = __importDefault(require("winston"));
const moment_1 = __importDefault(require("moment"));
const path_1 = __importDefault(require("path"));
// log history file path
const logFilePath = path_1.default.join(__dirname, "shortify.log");
// create logger for better logging
const logger = winston_1.default.createLogger({
    // default log level
    level: "info",
    // format logger for better visibility
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.printf(({ level, message, timestamp }) => {
        return `[${(0, moment_1.default)(timestamp).format("DD-MM-YYYY__hh:mm A")}] ${level}: ${message}`;
    })),
    // add logs in file and console
    transports: [
        // configure log style for the console
        new winston_1.default.transports.Console({
            format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.colorize(), winston_1.default.format.printf(({ level, message, timestamp }) => {
                return `[${(0, moment_1.default)(timestamp).format("DD-MM-YYYY__hh:mm A")}] ${level}: ${message}`;
            })),
        }),
        // configure logging for file
        new winston_1.default.transports.File({
            filename: logFilePath,
            format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.json(), winston_1.default.format.printf(({ level, message, timestamp }) => {
                return `[${(0, moment_1.default)(timestamp).format("DD-MM-YYYY__hh:mm A")}] ${level}: ${message}`;
            })),
        }),
    ],
});
exports.logger = logger;
