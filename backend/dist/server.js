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
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// initializing the server
const server = (0, express_1.default)();
// configure cors setup
server.use((0, cors_1.default)({
    origin: true,
    credentials: true,
}));
// add cookie parser middleware
server.use((0, cookie_parser_1.default)());
// configure database
mongoose_1.default
    .connect(config_1.Config.MONGOOSE_URI)
    .then(() => {
    logger_1.logger.info("Connected to database");
})
    .catch((err) => {
    logger_1.logger.error(`Failed connecting to the database - ${err.message}`);
});
// configure server to parse json body
server.use(express_1.default.json());
// adding routers to the server
server.use(`${config_1.Config.API_ENDPOINT}/auth`, auth_routes_1.authRouter);
// listening for request
server.listen(config_1.Config.PORT, () => {
    logger_1.logger.info(`Server is running at port ${config_1.Config.PORT}`);
});
