// importing modules
import {
  createLinkController,
  deleteSingleLinkController,
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

// delete single link
linkRouter.delete("/:linkId", authenticated, deleteSingleLinkController);

// export for external use
export { linkRouter };
