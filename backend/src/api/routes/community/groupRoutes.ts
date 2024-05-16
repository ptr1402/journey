import express from "express";
import {
  addUserToGroup,
  createGroup,
  deleteGroup,
  deleteUserFromGroup,
  getGroupById,
  getGroupManager,
  getGroupUsers,
  getGroups,
  updateGroup,
} from "../../controller";

export const groupRouter = express.Router();

groupRouter.route("/").get(getGroups).post(createGroup);

groupRouter
  .route("/:groupId")
  .get(getGroupById)
  .patch(updateGroup)
  .delete(deleteGroup);

groupRouter
  .route("/:groupId/users")
  .get(getGroupUsers)
  .post(addUserToGroup)
  .delete(deleteUserFromGroup);

groupRouter.get("/:groupId/manager", getGroupManager);
