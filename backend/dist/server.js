"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// setup env variables
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// importing modules
const express_1 = __importDefault(require("express"));
const config_1 = require("./constants/config");
const auth_routes_1 = require("./routes/auth.routes");
const logger_1 = require("./logs/logger");
// initializing the server
const server = (0, express_1.default)();
// configure server to parse json body
server.use(express_1.default.json());
// adding routes to the server
server.use(`${config_1.Config.API_ENDPOINT}/auth`, auth_routes_1.authRouter);
// listening for request
server.listen(config_1.Config.PORT, () => {
    logger_1.logger.info(`Server is running at port ${config_1.Config.PORT}`);
});
