// importing modules
import express from "express";
import {
  registerController,
  loginController,
  checkAuthController,
} from "@controllers/auth.controller";
import { authenticated } from "@middlewares/auth.middleware";

// initializing auth router
const authRouter = express.Router();

// register route
authRouter.post("/register", registerController);

// login route
authRouter.post("/login", loginController);

// route for auth check
authRouter.get("/me", authenticated, checkAuthController);

// exporting the router for external use
export { authRouter };
