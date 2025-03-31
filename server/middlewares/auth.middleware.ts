// importing modules and types
import { Config } from "@constants/config";
import { logger } from "@logs/logger";
import { User } from "@models/user.model";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ObjectId } from "mongoose";

// interface for api response
interface ApiResponse {
  success: boolean;
  message: string;
}

// declaring type for user in request
declare global {
  namespace Express {
    interface Request {
      user?: {
        name: string;
        email: string;
        id: ObjectId;
      };
    }
  }
}

// middleware for protect auth routes
const authenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // get token from request
    const token = req.cookies.auth_token;

    // check if token available
    if (token) {
      // verify jwt with token
      const decoded = jwt.verify(token, Config.JWT_SECRET) as JwtPayload;

      // extract email from decoded
      const { email } = decoded;
      try {
        // find the user
        const isUserExist = await User.findOne({ email: email });

        // check if user founded
        if (isUserExist) {
          // user payload for next
          const userPayload: {
            name: string;
            email: string;
            id: ObjectId;
          } = {
            name: isUserExist.name,
            email: isUserExist.email,
            id: isUserExist._id,
          };

          // add user payload in request
          req.user = userPayload;
          next();
        } else {
          // response for not found user
          const response: ApiResponse = {
            success: false,
            message: "User not founded with provided token",
          };
          res.status(404).json(response);
        }
      } catch (error) {
        logger.info(`Server error - ${error}`);
        const response: ApiResponse = {
          success: false,
          message: "Internal Server Failure",
        };
        res.status(401).json(response);
      }
    } else {
      // response payload
      const response: ApiResponse = {
        success: false,
        message: "Unauthorized - token not found",
      };
      res.status(400).json(response);
    }
  } catch (error) {
    logger.info(`Server error - ${error}`);
    const response: ApiResponse = {
      success: false,
      message: "Internal Server Failure",
    };
    res.status(401).json(response);
  }
};

// export for external use
export { authenticated };
