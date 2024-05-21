import { db } from "../../config/databaseConfig";
import { InsertMealProduct, mealProductsTable } from "../../schema";

export async function createMealProductDb(mealProduct: InsertMealProduct) {
  await db.insert(mealProductsTable).values(mealProduct);
}


