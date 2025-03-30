// importing modules
import express from "express";

// create link router
const linkRouter = express.Router();

// create link route
linkRouter.post("/create");

// export for external use
export { linkRouter };
