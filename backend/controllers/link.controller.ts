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

// declaring type for user in request
declare global {
  namespace Express {
    interface Request {
      user?: {
        name: string;
        email: string;
        id: ObjectId;
      };
    }
  }
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
        const isLinkAddedByThisUser =
          isLinkAlreadyAdded.user.toString() === req.user?.id.toString();

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

// get user links controller
const getUserLinksController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // get the user id from request
    const userId: ObjectId | undefined = req.user?.id;

    // return if user id not found
    if (!userId) {
      const response: ApiResponse = {
        success: false,
        message: "User id not found",
      };
      res.status(404).json(response);
      return;
    }

    // find the links with this user id
    const links = await Link.find({ user: userId });

    // return if no links founded
    if (!links) {
      const response: ApiResponse = {
        success: false,
        message: "Links not found",
      };
      res.status(404).json(response);
      return;
    }

    // response founded links
    const response: ApiResponse = {
      success: true,
      message: "Links founded",
      data: links,
    };
    res.status(200).json(response);
    return;
  } catch (error) {
    // handle error
    logger.info(`Server error - ${error}`);
    const response: ApiResponse = {
      success: false,
      message: "Internal Server Failure",
    };
    res.status(500).json(response);
    return;
  }
};

// get single link data
const getSingleLinkController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // get the shortlinkid from param
    const { shortLink } = req.params;

    // return if shortlink not provided
    if (!shortLink) {
      const response: ApiResponse = {
        success: false,
        message: "Shortlink not provided",
      };
      res.status(404).json(response);
      return;
    }

    // find the shortlink full data
    const fullLinkData = await Link.findOne({
      shortLink,
    }).populate("user");

    // return if shortlink not founded
    if (!fullLinkData) {
      const response: ApiResponse = {
        success: false,
        message: "Shortlink not founded in database",
      };
      res.status(404).json(response);
      return;
    }

    // response fullLinkData
    const response: ApiResponse = {
      success: true,
      message: "Shortlink founded",
      data: fullLinkData,
    };
    res.status(200).json(response);
    return;
  } catch (error) {
    logger.info(`Server error - ${error}`);
    const response: ApiResponse = {
      success: false,
      message: "Internal Server Failure",
    };
    res.status(500).json(response);
    return;
  }
};

// link delete controller
const deleteSingleLinkController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // get link id from param
    const { linkId } = req.params;

    // return if link id not provided
    if (!linkId) {
      const response: ApiResponse = {
        success: false,
        message: "link id not provided",
      };
      res.status(400).json(response);
      return;
    }

    // find the link
    const linkFromDB = await Link.findById(linkId);

    if (!linkFromDB) {
      const response: ApiResponse = {
        success: false,
        message: "link not founded",
      };
      res.status(404).json(response);
      return;
    }

    // verify link owner
    const verifyLinkOwner =
      linkFromDB.user.toString() === req.user?.id.toString();

    // return if not verified
    if (!verifyLinkOwner) {
      const response: ApiResponse = {
        success: false,
        message: "You are not that link owner",
      };
      res.status(401).json(response);
      return;
    }

    // delete the link
    await linkFromDB.deleteOne();

    // send success response
    const response: ApiResponse = {
      success: false,
      message: "Selected link deleted",
      data: linkFromDB,
    };
    res.status(200).json(response);
    return;
  } catch (error) {
    logger.info(`Server error - ${error}`);
    const response: ApiResponse = {
      success: false,
      message: "Internal Server Failure",
    };
    res.status(500).json(response);
    return;
  }
};

// export controllers for external use
export {
  createLinkController,
  getUserLinksController,
  getSingleLinkController,
  deleteSingleLinkController,
};
