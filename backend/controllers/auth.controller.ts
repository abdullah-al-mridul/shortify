// importing modules
import { Request, Response } from "express";
import { User } from "@models/user.model";
import { logger } from "@logs/logger";
import jwt from "jsonwebtoken";
import { Config } from "@constants/config";

// email regex
const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// interface for login
interface LoginReq {
  email: string;
  password: string;
}

// interface for register
interface RegisterReq extends LoginReq {
  name: string;
}

// controller for user register
const registerController = async (
  req: Request,
  res: Response
): Promise<void> => {
  // getting information from request
  const { name, email, password }: RegisterReq = req.body;

  // validate if all field available
  if (!(name && email && password)) {
    res.status(400).json({
      success: false,
      message: "Missing request field",
    });
    return;
  } else {
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
  const existingUser = await User.findOne({ email: email });

  // check if user exist or not
  if (!existingUser) {
    // user payload
    const userPayload: Partial<RegisterReq> = {
      name,
      email,
      password,
    };

    // create new user if not exist
    const user = new User(userPayload);
    await user.save();

    // log that user is created
    logger.info(`User created for ${email}`);

    // delete user password from payload
    delete userPayload.password;

    // create token
    const token: string = jwt.sign(userPayload, Config.JWT_SECRET);

    // set token to the response cookie
    if (token) {
      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24,
      });
    }

    // send res
    res.status(200).json({
      success: true,
      message: "User created successfully",
    });
    return;
  } else {
    // send res that user already exist
    res.status(200).json({
      success: false,
      message: "User already exist",
    });
    return;
  }
};

// exporting for external use
export { registerController };
