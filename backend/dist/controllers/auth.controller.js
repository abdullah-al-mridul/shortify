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
exports.registerController = void 0;
const user_model_1 = require("../models/user.model");
const logger_1 = require("../logs/logger");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../constants/config");
// email regex
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// controller for user register
const registerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // getting information from request
    const { name, email, password } = req.body;
    // validate if all field available
    if (!(name && email && password)) {
        res.status(400).json({
            success: false,
            message: "Missing request field",
        });
        return;
    }
    else {
        // check if name atlast 5 character
        if (name.length < 5) {
            res.status(400).json({
                success: false,
                message: "Name should be at least 5 character",
            });
            return;
        }
        // check if email is valid
        else if (!emailRegex.test(email)) {
            res.status(400).json({
                success: false,
                message: "Invalid Email",
            });
            return;
        }
        // check if password minimum 6 character
        else if (password.length < 6) {
            res.status(400).json({
                success: false,
                message: "Password must be at least 6 character",
            });
            return;
        }
    }
    // get existing user
    const existingUser = yield user_model_1.User.findOne({ email: email });
    // check if user exist or not
    if (!existingUser) {
        // user payload
        const userPayload = {
            name,
            email,
            password,
        };
        // create new user if not exist
        const user = new user_model_1.User(userPayload);
        yield user.save();
        // log that user is created
        logger_1.logger.info(`User created for ${email}`);
        // delete user password from payload
        delete userPayload.password;
        // create token
        jsonwebtoken_1.default.sign(userPayload, config_1.Config.JWT_SECRET, function (err, token) {
            if (!err) {
                // set token to response cookie
                res.cookie("auth_token", token, {
                    httpOnly: true,
                    secure: false,
                    sameSite: "none",
                    maxAge: 1000 * 60 * 60 * 24,
                });
            }
            else {
                // log on error
                logger_1.logger.info(`Failed creation of token for user ${userPayload.email} - ${err.message}`);
            }
        });
        // send res
        res.status(200).json({
            success: true,
            message: "User created successfully",
        });
        return;
    }
    else {
        // send res that user already exist
        res.status(200).json({
            success: false,
            message: "User already exist",
        });
        return;
    }
});
exports.registerController = registerController;
