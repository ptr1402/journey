import { db } from "../../config/databaseConfig";
import { InsertMeal, mealsTable } from "../../schema";

export async function createMealDb(meal: InsertMeal) {
  await db.insert(mealsTable).values(meal);
}
