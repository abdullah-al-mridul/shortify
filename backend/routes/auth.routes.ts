// importing modules
import express from "express";
import { registerController } from "@controllers/auth.controller";

// initializing auth router
const authRouter = express.Router();

// register route
authRouter.post("/register", registerController);

// exporting the router for external use
export { authRouter };
