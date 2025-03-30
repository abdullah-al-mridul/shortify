// importing modules
import express from "express";
import {
  registerController,
  loginController,
} from "@controllers/auth.controller";

// initializing auth router
const authRouter = express.Router();

// register route
authRouter.post("/register", registerController);

// login route
authRouter.post("/login", loginController);

// exporting the router for external use
export { authRouter };
