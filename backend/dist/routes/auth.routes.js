"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
// importing modules
const express_1 = __importDefault(require("express"));
// initializing auth router
const authRouter = express_1.default.Router();
exports.authRouter = authRouter;
