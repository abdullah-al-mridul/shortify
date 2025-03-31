// importing modules
import {
  createLinkController,
  getSingleLinkController,
  getUserLinksController,
} from "@controllers/link.controller";
import { authenticated } from "@middlewares/auth.middleware";
import express from "express";

// create link router
const linkRouter = express.Router();

// create link route
linkRouter.post("/create", authenticated, createLinkController);

// get user links
linkRouter.get("/mylinks", authenticated, getUserLinksController);

// get single link data
linkRouter.get("/:shortLink", authenticated, getSingleLinkController);

// export for external use
export { linkRouter };
