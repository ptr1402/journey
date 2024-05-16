import express from "express";
import {
  createMealProduct,
  deleteMealProduct,
  getMealProductById,
  getMealProducts,
  updateMealProduct,
} from "../../controller";

export const mealProductRouter = express.Router();

// query params for mealId
mealProductRouter.route("/").get(getMealProducts).post(createMealProduct);

mealProductRouter
  .route("/:mealProductId")
  .get(getMealProductById)
  .patch(updateMealProduct)
  .delete(deleteMealProduct);
