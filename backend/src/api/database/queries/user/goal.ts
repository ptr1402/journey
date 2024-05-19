import { eq } from "drizzle-orm";
import { db } from "../../config/databaseConfig";
import { InsertGoal, SelectGoal, SelectUser, goalsTable } from "../../schema";

export async function createGoalDb(goal: InsertGoal) {
  await db.insert(goalsTable).values(goal);
}

export async function getGoalsDb(): Promise<SelectGoal[]> {
  return db.select().from(goalsTable);
}

export async function getGoalByIdDb(
  id: SelectGoal["id"]
): Promise<SelectGoal[]> {
  return db.select().from(goalsTable).where(eq(goalsTable.id, id)).limit(1);
}

export async function getGoalByUserIdDb(
  userId: SelectUser["id"]
): Promise<SelectGoal[]> {
  return db
    .select()
    .from(goalsTable)
    .where(eq(goalsTable.userId, userId))
    .limit(1);
}

export async function updateGoalDb(
  id: SelectGoal["id"],
  data: Partial<Omit<SelectGoal, "id">>
) {
  data.updatedAt = new Date();
  await db.update(goalsTable).set(data).where(eq(goalsTable.id, id));
}

export async function deleteGoalDb(id: SelectGoal["id"]) {
  await db.delete(goalsTable).where(eq(goalsTable.id, id));
}
