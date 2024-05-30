import { eq, ilike } from "drizzle-orm";
import { db } from "../../config/databaseConfig";
import {
  InsertGroup,
  SelectGroup,
  SelectUser,
  groupsTable,
  usersTable,
  usersToGroupsTable,
} from "../../schema";

export async function createGroupDb(group: InsertGroup) {
  const [createdGroup] = await db
    .insert(groupsTable)
    .values(group)
    .returning({ id: groupsTable.id });

  await addUserToGroupDb(group.manager, createdGroup.id);
}

export async function addUserToGroupDb(
  userId: SelectUser["id"],
  groupId: SelectGroup["id"]
) {
  await db.insert(usersToGroupsTable).values({ userId, groupId });
}

export async function getGroupsDb(): Promise<SelectGroup[]> {
  return db.select().from(groupsTable);
}

export async function getGroupsByNameDb(name: string): Promise<SelectGroup[]> {
  return db.select().from(groupsTable).where(ilike(groupsTable.name, name));
}

export async function getGroupsByManagerIdDb(
  managerId: SelectUser["id"]
): Promise<SelectGroup[]> {
  return db
    .select()
    .from(groupsTable)
    .where(eq(groupsTable.manager, managerId));
}

export async function getGroupsByUserIdDb(
  userId: SelectUser["id"]
): Promise<SelectGroup[]> {
  const users = db.query.usersTable.findMany({
    columns: {},
    where: eq(usersTable.id, userId),
    with: {
      usersToGroups: {
        columns: {},
        with: {
          group: true,
        },
      },
    },
  });

  const groups: SelectGroup[] = (await users).flatMap((user) =>
    user.usersToGroups.map((userToGroup) => userToGroup.group)
  );

  return groups;
}

export async function getGroupByIdDb(
  id: SelectGroup["id"]
): Promise<SelectGroup[]> {
  return db.select().from(groupsTable).where(eq(groupsTable.id, id)).limit(1);
}

export async function updateGroupDb(
  id: SelectGroup["id"],
  data: Partial<Omit<SelectGroup, "id">>
) {
  data.updatedAt = new Date();
  await db.update(groupsTable).set(data).where(eq(groupsTable.id, id));
}

export async function deleteGroupDb(id: SelectGroup["id"]) {
  await db.delete(groupsTable).where(eq(groupsTable.id, id));
}
