"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./constants/config");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const server = (0, express_1.default)();
server.get("/", (req, res) => {
    res.send("hi");
});
server.listen(config_1.Config.PORT, () => {
    console.log(`Server is running at port ${config_1.Config.PORT}`);
});
