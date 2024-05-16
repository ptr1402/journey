import express from "express";
import {
  createJoinRequest,
  deleteJoinRequest,
  getJoinRequestById,
  getJoinRequests,
  updateJoinRequest,
} from "../../controller";

export const joinRequestRouter = express.Router();

// here special query params for group or user
joinRequestRouter.route("/").get(getJoinRequests).post(createJoinRequest);

joinRequestRouter
  .route("/:joinRequestId")
  .get(getJoinRequestById)
  .patch(updateJoinRequest)
  .delete(deleteJoinRequest);
