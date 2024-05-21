import { type Request, type Response } from "express";
import { InsertMealProduct } from "../../database/schema";
import { validMeal, validProduct } from "../utils/validation";
import { createMealProductDb } from "../../database/queries/food/mealProduct";

export function validateMealProduct(
  mealProductData: InsertMealProduct
): string[] {
  const errors: string[] = [];

  if (mealProductData.quantity) {
    if (
      typeof mealProductData.quantity !== "number" ||
      mealProductData.quantity <= 0
    ) {
      errors.push("Invalid quantity. Quantity must be a positive number.");
    }
  }

  return errors;
}

export async function getMealProducts(req: Request, res: Response) {
  console.log(req.params);
  res.send("Get all meal products");
}

export async function getMealProductById(req: Request, res: Response) {
  console.log(req.params);
  res.send("Get meal product by id");
}

export async function createMealProduct(req: Request, res: Response) {
  try {
    const mealProductData: InsertMealProduct = req.body;

    const errors = [...validateMealProduct(mealProductData)];

    if (!mealProductData.productId) {
      errors.push("productId is required.");
    } else {
      const productErrors = await validProduct(mealProductData.productId);
      errors.push(...productErrors);
    }

    if (!mealProductData.mealId) {
      errors.push("mealId is required.");
    } else {
      const mealErrors = await validMeal(mealProductData.mealId);
      errors.push(...mealErrors);
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    await createMealProductDb(mealProductData);

    return res
      .status(201)
      .json({ message: "Meal product created successfully." });
  } catch (error) {
    console.error("Error creating meal product: ", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}

export async function updateMealProduct(req: Request, res: Response) {
  console.log(req.params);
  res.send("Update meal product");
}

export async function deleteMealProduct(req: Request, res: Response) {
  console.log(req.params);
  res.send("Delete meal product");
}
