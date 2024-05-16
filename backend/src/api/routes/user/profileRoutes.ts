import express from "express";
import {
  createProfile,
  deleteProfile,
  getProfileById,
  getProfiles,
  updateProfile,
} from "../../controller";

export const profileRouter = express.Router();

// for user query param
profileRouter.route("/").get(getProfiles).post(createProfile);

profileRouter
  .route("/:profileId")
  .get(getProfileById)
  .patch(updateProfile)
  .delete(deleteProfile);
