// importing modules
import {
  createLinkController,
  getUserLinksController,
} from "@controllers/link.controller";
import express from "express";
import { authenticated } from "middlewares/auth.middleware";

// create link router
const linkRouter = express.Router();

// create link route
linkRouter.post("/create", authenticated, createLinkController);

// get user links
linkRouter.get("/mylinks", authenticated, getUserLinksController);

// export for external use
export { linkRouter };
