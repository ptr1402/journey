import express from "express";
import {
  createInvitation,
  deleteInvitation,
  getInvitationById,
  getInvitations,
  updateInvitation,
} from "../../controller";

export const invitationRouter = express.Router();

// here special query params for getInvitations -> for User: ?userId={}
// and for Group: ?groupId={}
invitationRouter.route("/").get(getInvitations).post(createInvitation);

invitationRouter
  .route("/:invitationId")
  .get(getInvitationById)
  .patch(updateInvitation)
  .delete(deleteInvitation);
