import { getMealByIdDb } from "../../database/queries/food/meal";
import { getMealProductByIdDb } from "../../database/queries/food/mealProduct";
import { getProductByIdDb } from "../../database/queries/food/product";
import { getUserByIdDb } from "../../database/queries/user/user";
import {
  SelectMeal,
  SelectMealProduct,
  SelectProduct,
  SelectUser,
} from "../../database/schema";

export async function validUser(userId: SelectUser["id"]): Promise<string[]> {
  const errors: string[] = [];

  if (!userId || isNaN(userId)) {
    errors.push(`Invalid userId=${userId}`);
  } else {
    const user = await getUserByIdDb(userId);
    if (!user || user.length === 0) {
      errors.push(`User with userId=${userId} not found.`);
    }
  }

  return errors;
}

export async function validProduct(
  productId: SelectProduct["id"]
): Promise<string[]> {
  const errors: string[] = [];

  const product = await getProductByIdDb(productId);
  if (!product || product.length === 0) {
    errors.push(`Product with productId=${productId} not found.`);
  }

  return errors;
}

export async function validMeal(mealId: SelectMeal["id"]): Promise<string[]> {
  const errors: string[] = [];

  const meal = await getMealByIdDb(mealId);
  if (!meal || meal.length === 0) {
    errors.push(`Meal with mealId=${mealId} not found.`);
  }

  return errors;
}

export async function validMealProduct(
  mealProductId: SelectMealProduct["id"]
): Promise<string[]> {
  const errors: string[] = [];

  const mealProduct = await getMealProductByIdDb(mealProductId);
  if (!mealProduct || mealProduct.length === 0) {
    errors.push(`Meal product with mealProductId=${mealProductId} not found.`);
  }

  return errors;
}
