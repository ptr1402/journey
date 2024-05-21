import { getMealByIdDb } from "../../database/queries/food/meal";
import { getProductByIdDb } from "../../database/queries/food/product";
import { getUserByIdDb } from "../../database/queries/user/user";
import { SelectMeal, SelectProduct, SelectUser } from "../../database/schema";

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

  if (typeof productId !== "number" || productId <= 0) {
    errors.push(`Invalid productId=${productId}`);
  } else {
    const product = await getProductByIdDb(productId);
    if (!product || product.length === 0) {
      errors.push(`Product with productId=${productId} not found.`);
    }
  }

  return errors;
}

export async function validMeal(mealId: SelectMeal["id"]): Promise<string[]> {
  const errors: string[] = [];

  if (typeof mealId !== "number" || mealId <= 0) {
    errors.push(`Invalid mealId=${mealId}`);
  } else {
    const meal = await getMealByIdDb(mealId);
    if (!meal || meal.length === 0) {
      errors.push(`Meal with mealId=${mealId} not found.`);
    }
  }

  return errors;
}
