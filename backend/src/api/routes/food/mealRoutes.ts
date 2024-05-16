import express from "express";
import {
  createMeal,
  deleteMeal,
  getMealById,
  getMeals,
  updateMeal,
} from "../../controller";

export const mealRouter = express.Router();

// special query params for user and date
mealRouter.route("/").get(getMeals).post(createMeal);

mealRouter
  .route("/:mealId")
  .get(getMealById)
  .patch(updateMeal)
  .delete(deleteMeal);
