// importing modules
import express, { Request, Response } from "express";
import { logger } from "@logs/logger";

// initializing auth router
const authRouter = express.Router();

// email regex
const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// initialize interfaces
interface LoginReq {
  email: string;
  password: string;
}

interface RegisterReq extends LoginReq {
  name: string;
}

// register route
authRouter.post("/register", (req: Request, res: Response) => {
  const { name, email, password }: RegisterReq = req.body;
  if (!(name && email && password)) {
    res.status(400).json({
      success: false,
      message: "Missing request field",
    });
  } else {
    if (name.length < 5) {
      res.status(400).json({
        success: false,
        message: "Name should be at least 5 character",
      });
    } else if (!emailRegex.test(email)) {
      res.status(400).json({
        success: false,
        message: "Invalid Email",
      });
    } else if (password.length < 6) {
      res.status(400).json({
        success: false,
        message: "Password must be at least 6 character",
      });
    }
  }

  res.status(200).json({
    name,
    email,
    password,
  });
});

// exporting the router for external use
export { authRouter };
