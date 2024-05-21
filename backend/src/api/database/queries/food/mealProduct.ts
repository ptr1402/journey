import { eq, and } from "drizzle-orm";
import { db } from "../../config/databaseConfig";
import {
  InsertMealProduct,
  SelectMeal,
  SelectMealProduct,
  SelectProduct,
  mealProductsTable,
} from "../../schema";

export async function createMealProductDb(mealProduct: InsertMealProduct) {
  await db.insert(mealProductsTable).values(mealProduct);
}

export async function getMealProductsDb(): Promise<SelectMealProduct[]> {
  return db.select().from(mealProductsTable);
}

export async function getMealProductsByMealIdDb(
  mealId: SelectMeal["id"]
): Promise<SelectMealProduct[]> {
  return db
    .select()
    .from(mealProductsTable)
    .where(eq(mealProductsTable.mealId, mealId))
    .limit(1);
}

export async function getMealProductsByProductIdDb(
  productId: SelectProduct["id"]
): Promise<SelectMealProduct[]> {
  return db
    .select()
    .from(mealProductsTable)
    .where(eq(mealProductsTable.productId, productId));
}

export async function getMealProductsByMealIdAndProductIdDb(
  mealId: SelectMeal["id"],
  productId: SelectProduct["id"]
): Promise<SelectMealProduct[]> {
  return db
    .select()
    .from(mealProductsTable)
    .where(
      and(
        eq(mealProductsTable.mealId, mealId),
        eq(mealProductsTable.productId, productId)
      )
    );
}

export async function getMealProductByIdDb(
  mealProductId: SelectMealProduct["id"]
): Promise<SelectMealProduct[]> {
  return db
    .select()
    .from(mealProductsTable)
    .where(eq(mealProductsTable.id, mealProductId))
    .limit(1);
}

export async function updateMealProductDb(
  id: SelectProduct["id"],
  data: Partial<Omit<SelectMealProduct, "id">>
) {
  data.updatedAt = new Date();
  await db
    .update(mealProductsTable)
    .set(data)
    .where(eq(mealProductsTable.id, id));
}

export async function deleteMealProductDb(id: SelectMealProduct["id"]) {
  await db.delete(mealProductsTable).where(eq(mealProductsTable.id, id));
}
