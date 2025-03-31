"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
// importing modules
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
// initializing auth router
const authRouter = express_1.default.Router();
exports.authRouter = authRouter;
// register route
authRouter.post("/register", auth_controller_1.registerController);
// login route
authRouter.post("/login", auth_controller_1.loginController);
// route for auth check
authRouter.get("/me", auth_middleware_1.authenticated, auth_controller_1.checkAuthController);
