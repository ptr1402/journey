import { getMealByIdDb } from "../../database/queries/food/meal";
import { getMealProductByIdDb } from "../../database/queries/food/mealProduct";
import { getProductByIdDb } from "../../database/queries/food/product";
import { getGoalByIdDb } from "../../database/queries/user/goal";
import { getProfileByIdDb } from "../../database/queries/user/profile";
import { getUserByIdDb } from "../../database/queries/user/user";
import {
  SelectGoal,
  SelectMeal,
  SelectMealProduct,
  SelectProduct,
  SelectProfile,
  SelectUser,
} from "../../database/schema";

export async function validUser(userId: SelectUser["id"]): Promise<string[]> {
  const errors: string[] = [];

  const user = await getUserByIdDb(userId);
  if (!user || user.length === 0) {
    errors.push(`User with userId=${userId} not found.`);
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

export async function validGoal(goalId: SelectGoal["id"]): Promise<string[]> {
  const errors: string[] = [];

  const goal = await getGoalByIdDb(goalId);
  if (!goal || goal.length === 0) {
    errors.push(`Goal with goalId=${goalId} not found.`);
  }

  return errors;
}

export async function validProfile(
  profileId: SelectProfile["id"]
): Promise<string[]> {
  const errors: string[] = [];

  const profile = await getProfileByIdDb(profileId);
  if (!profile || profile.length === 0) {
    errors.push(`Profile with profileId=${profileId} not found.`);
  }

  return errors;
}
