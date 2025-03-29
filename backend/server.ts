// setup env variables
import dotenv from "dotenv";
dotenv.config();

// importing modules
import express from "express";
import { Config } from "@constants/config";
import { authRouter } from "@routes/auth.routes";
import { logger } from "@logs/logger";

// initializing the server
const server = express();

// configure server to parse json body
server.use(express.json());

// adding routes to the server
server.use(`${Config.API_ENDPOINT}/auth`, authRouter);

// listening for request
server.listen(Config.PORT, () => {
  logger.info(`Server is running at port ${Config.PORT}`);
});
