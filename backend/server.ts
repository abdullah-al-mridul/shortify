// setup env variables
import dotenv from "dotenv";
dotenv.config();

// important imports
import express from "express";
import { Config } from "./constants/config";

// initializing the server
const server = express();

// configure server to parse json body
server.use(express.json());

// listening for request
server.listen(Config.PORT, () => {
  console.log(`Server is running at port ${Config.PORT}`);
});
