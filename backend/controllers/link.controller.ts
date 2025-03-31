import { ObjectId } from "mongoose";
// importing modules
import { Config } from "@constants/config";
import { logger } from "@logs/logger";
import { Link } from "@models/link.model";
import { Request, Response } from "express";
import { generateRandomString, validateLink } from "utilities/utilities";

// interface for api response
interface ApiResponse {
  success: boolean;
  message: string;
  data?: object;
}

// controller for link creation
const createLinkController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // getting link from request
    const { link }: { link: string } = req.body;

    // check if link is valid
    const isLinkValid = validateLink(link);
    if (isLinkValid) {
      // find the link
      const isLinkAlreadyAdded = await Link.findOne({ fullLink: link });
      if (isLinkAlreadyAdded) {
        // check if link added by this user
        const isLinkAddedByThisUser = isLinkAlreadyAdded.user === req.user?.id;
        // send conflict response if user already have this link
        if (isLinkAddedByThisUser) {
          const response: ApiResponse = {
            success: false,
            message: "Link already added",
          };
          res.status(409).json(response);
          return;
        }
      }
      // short the link
      const shortLink = generateRandomString(Config.SHORT_LINK_LENGTH);

      // create payload for load to db
      const linkPayload: {
        fullLink: string;
        shortLink: string;
        user: ObjectId | undefined;
      } = {
        fullLink: link,
        shortLink,
        user: req.user?.id,
      };

      // create the link in the database
      const linkDB = new Link(linkPayload);

      //save database
      await linkDB.save();
      const response: ApiResponse = {
        success: true,
        message: "Link created",
        data: linkPayload,
      };
      res.status(201).json(response);
      return;
    } else {
      const response: ApiResponse = {
        success: false,
        message: "Invalid Link",
      };
      res.status(400).json(response);
      return;
    }
  } catch (error) {
    logger.info(`Server error - ${error}`);
    const response: ApiResponse = {
      success: false,
      message: "Internal Server Failure",
    };
    res.status(401).json(response);
    return;
  }
};

// export controllers for external use
export { createLinkController };
