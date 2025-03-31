// importing modules
import { logger } from "@logs/logger";
import { Request, Response, NextFunction } from "express";

// error handling middleware
const errorHandler = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  logger.info(err); // log the error

  // response payloads
  const statusCode = 500;
  const message = err.message || "Internal Server Error";

  // send the error response
  res.status(statusCode).json({
    error: {
      message,
      status: statusCode,
    },
  });
};

// export for external use
export default errorHandler;
