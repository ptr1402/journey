import { eq } from "drizzle-orm";
import { db } from "../../config/databaseConfig";
import {
  InsertProfile,
  SelectProfile,
  SelectUser,
  profilesTable,
} from "../../schema";

export async function createProfileDb(profile: InsertProfile) {
  await db.insert(profilesTable).values(profile);
}

export async function getProfilesDb(): Promise<SelectProfile[]> {
  return db.select().from(profilesTable);
}

export async function getProfileByIdDb(
  id: SelectProfile["id"]
): Promise<SelectProfile[]> {
  return db
    .select()
    .from(profilesTable)
    .where(eq(profilesTable.id, id))
    .limit(1);
}

export async function getProfileByUserIdDb(
  userId: SelectUser["id"]
): Promise<SelectProfile[]> {
  return db
    .select()
    .from(profilesTable)
    .where(eq(profilesTable.userId, userId))
    .limit(1);
}

export async function updateProfileDb(
  id: SelectProfile["id"],
  data: Partial<Omit<SelectProfile, "id">>
) {
  data.updatedAt = new Date();
  await db.update(profilesTable).set(data).where(eq(profilesTable.id, id));
}

export async function deleteProfileDb(id: SelectProfile["id"]) {
  await db.delete(profilesTable).where(eq(profilesTable.id, id));
}
