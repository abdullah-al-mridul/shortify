"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticated = void 0;
// importing modules and types
const config_1 = require("../constants/config");
const logger_1 = require("../logs/logger");
const user_model_1 = require("../models/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// middleware for protect auth routes
const authenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get token from request
        const token = req.cookies.auth_token;
        // check if token available
        if (token) {
            // verify jwt with token
            const decoded = jsonwebtoken_1.default.verify(token, config_1.Config.JWT_SECRET);
            // extract email from decoded
            const { email } = decoded;
            try {
                // find the user
                const isUserExist = yield user_model_1.User.findOne({ email: email });
                // check if user founded
                if (isUserExist) {
                    // user payload for next
                    const userPayload = {
                        name: isUserExist.name,
                        email: isUserExist.email,
                    };
                    // add user payload in request
                    req.user = userPayload;
                    next();
                }
                else {
                    // response for not found user
                    const response = {
                        success: false,
                        message: "User not founded with provided token",
                    };
                    res.status(404).json(response);
                }
            }
            catch (error) {
                logger_1.logger.info(`Server error - ${error}`);
                const response = {
                    success: false,
                    message: "Internal Server Failure",
                };
                res.status(401).json(response);
            }
        }
        else {
            // response payload
            const response = {
                success: false,
                message: "Unauthorized - token not found",
            };
            res.status(400).json(response);
        }
    }
    catch (error) {
        logger_1.logger.info(`Server error - ${error}`);
        const response = {
            success: false,
            message: "Internal Server Failure",
        };
        res.status(401).json(response);
    }
});
exports.authenticated = authenticated;
