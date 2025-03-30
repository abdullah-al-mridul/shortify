// setup env variables
import dotenv from "dotenv";
dotenv.config();

// importing modules
import express from "express";
import { Config } from "@constants/config";
import { authRouter } from "@routes/auth.routes";
import { logger } from "@logs/logger";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import { linkRouter } from "@routes/links.routes";

// initializing the server
const server = express();

// configure cors setup
server.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// add cookie parser middleware
server.use(cookieParser());

// configure database
mongoose
  .connect(Config.MONGOOSE_URI)
  .then(() => {
    logger.info("Connected to database");
  })
  .catch((err: Error) => {
    logger.error(`Failed connecting to the database - ${err.message}`);
  });

// configure server to parse json body
server.use(express.json());

// adding routers to the server
// auth router
server.use(`${Config.API_ENDPOINT}/auth`, authRouter);
// links router
server.use(`${Config.API_ENDPOINT}/links`, linkRouter);

// listening for request
server.listen(Config.PORT, () => {
  logger.info(`Server is running at port ${Config.PORT}`);
});
