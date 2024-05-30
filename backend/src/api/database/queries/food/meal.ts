import { endOfDay } from "date-fns";
import { eq, gte, lte, and } from "drizzle-orm";
import { db } from "../../config/databaseConfig";
import { InsertMeal, SelectMeal, SelectUser, mealsTable } from "../../schema";

export async function getMealsDb(): Promise<SelectMeal[]> {
  return db.select().from(mealsTable);
}

export async function getMealsForUserDb(
  userId: SelectUser["id"]
): Promise<SelectMeal[]> {
  return db.select().from(mealsTable).where(eq(mealsTable.userId, userId));
}

export async function getMealsForUserFromStartDateDb(
  userId: SelectUser["id"],
  startDate: Date
): Promise<SelectMeal[]> {
  return db
    .select()
    .from(mealsTable)
    .where(
      and(eq(mealsTable.userId, userId), gte(mealsTable.createdAt, startDate))
    );
}

export async function getMealsForUserUntilEndDateDb(
  userId: SelectUser["id"],
  endDate: Date
): Promise<SelectMeal[]> {
  const adjustedEndDate = endOfDay(endDate);
  return db
    .select()
    .from(mealsTable)
    .where(
      and(
        eq(mealsTable.userId, userId),
        lte(mealsTable.createdAt, adjustedEndDate)
      )
    );
}

export async function getMealsForUserFromStartDateUntilEndDateDb(
  userId: SelectUser["id"],
  startDate: Date,
  endDate: Date
): Promise<SelectMeal[]> {
  const adjustedEndDate = endOfDay(endDate);
  return db
    .select()
    .from(mealsTable)
    .where(
      and(
        eq(mealsTable.userId, userId),
        gte(mealsTable.createdAt, startDate),
        lte(mealsTable.createdAt, adjustedEndDate)
      )
    );
}

export async function getMealByIdDb(
  id: SelectMeal["id"]
): Promise<SelectMeal[]> {
  return db.select().from(mealsTable).where(eq(mealsTable.id, id)).limit(1);
}

export async function createMealDb(meal: InsertMeal) {
  await db.insert(mealsTable).values(meal);
}

export async function updateMealDb(
  id: SelectMeal["id"],
  data: Partial<Omit<SelectMeal, "id">>
) {
  await db.update(mealsTable).set(data).where(eq(mealsTable.id, id));
}

export async function deleteMealDb(id: SelectMeal["id"]) {
  await db.delete(mealsTable).where(eq(mealsTable.id, id));
}
