// importing modules
import express, { Request, Response } from "express";
import { logger } from "@logs/logger";

// initializing auth router
const authRouter = express.Router();

// register route
authRouter.post("/register", (req: Request, res: Response) => {
  logger.log(req.body);
});

// exporting the router for external use
export { authRouter };
