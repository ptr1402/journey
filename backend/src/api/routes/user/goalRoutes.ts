import express from "express";
import {
  createGoal,
  deleteGoal,
  getGoalById,
  getGoals,
  updateGoal,
} from "../../controller";

export const goalRouter = express.Router();

// query param for user
goalRouter.route("/").get(getGoals).post(createGoal);

goalRouter
  .route("/:goalId")
  .get(getGoalById)
  .patch(updateGoal)
  .delete(deleteGoal);
