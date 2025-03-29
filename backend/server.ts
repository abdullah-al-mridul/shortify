// setup env variables
import dotenv from "dotenv";
dotenv.config();

// importing modules
import express from "express";
import { Config } from "@constants/config";
import { authRouter } from "@routes/auth.routes";
import { logger } from "@logs/logger";
import mongoose from "mongoose";

// initializing the server
const server = express();

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
server.use(`${Config.API_ENDPOINT}/auth`, authRouter);

// listening for request
server.listen(Config.PORT, () => {
  logger.info(`Server is running at port ${Config.PORT}`);
});
