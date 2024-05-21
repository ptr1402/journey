import { InsertUser, SelectUser, usersTable } from "../../schema";
import { db } from "../../config/databaseConfig";
import { eq } from "drizzle-orm";

export async function createUserDb(
  user: InsertUser
): Promise<InsertUser["id"]> {
  const [createdUser] = await db
    .insert(usersTable)
    .values(user)
    .returning({ id: usersTable.id });
  return createdUser.id;
}

export async function getUsersDb(): Promise<
  Partial<Omit<SelectUser, "password">>[]
> {
  return db
    .select({
      id: usersTable.id,
      email: usersTable.email,
      username: usersTable.username,
      createdAt: usersTable.createdAt,
      updatedAt: usersTable.updatedAt,
    })
    .from(usersTable);
}

export async function getUserByIdDb(
  id: SelectUser["id"]
): Promise<Partial<Omit<SelectUser, "password">>[]> {
  return db
    .select({
      id: usersTable.id,
      email: usersTable.email,
      username: usersTable.username,
      createdAt: usersTable.createdAt,
      updatedAt: usersTable.updatedAt,
    })
    .from(usersTable)
    .where(eq(usersTable.id, id))
    .limit(1);
}

export async function getUserByEmailDb(
  email: SelectUser["email"]
): Promise<Partial<Omit<SelectUser, "password">>[]> {
  return db
    .select({
      id: usersTable.id,
      email: usersTable.email,
      username: usersTable.username,
      createdAt: usersTable.createdAt,
      updatedAt: usersTable.updatedAt,
    })
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);
}

export async function getUserByUsernameDb(
  username: SelectUser["username"]
): Promise<Partial<Omit<SelectUser, "password">>[]> {
  return db
    .select({
      id: usersTable.id,
      email: usersTable.email,
      username: usersTable.username,
      createdAt: usersTable.createdAt,
      updatedAt: usersTable.updatedAt,
    })
    .from(usersTable)
    .where(eq(usersTable.username, username))
    .limit(1);
}

export async function updateUserDb(
  id: SelectUser["id"],
  data: Partial<Omit<SelectUser, "id">>
): Promise<InsertUser["id"]> {
  data.updatedAt = new Date();
  const [updatedUser] = await db
    .update(usersTable)
    .set(data)
    .where(eq(usersTable.id, id))
    .returning({ id: usersTable.id });

  return updatedUser.id;
}

export async function deleteUserDb(id: SelectUser["id"]) {
  await db.delete(usersTable).where(eq(usersTable.id, id));
}
