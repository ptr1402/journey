import { pgTable, primaryKey, timestamp, integer } from "drizzle-orm/pg-core";
import { groupsTable } from "./groups";
import { usersTable } from "../user";
import { relations } from "drizzle-orm";

export const usersToGroupsTable = pgTable(
  "usersToGroups",
  {
    userAddedAt: timestamp("userAddedAt", {
      mode: "date",
      withTimezone: false,
    }).defaultNow(),
    userId: integer("userId")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    groupId: integer("groupId")
      .notNull()
      .references(() => groupsTable.id, { onDelete: "cascade" }),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.userId, table.groupId] }),
    };
  }
);

export type SelectUserToGroup = typeof usersToGroupsTable.$inferSelect;
export type InsertUserToGroup = typeof usersToGroupsTable.$inferInsert;

export const usersToGroupsRelations = relations(
  usersToGroupsTable,
  ({ one }) => {
    return {
      user: one(usersTable, {
        fields: [usersToGroupsTable.userId],
        references: [usersTable.id],
      }),
      group: one(groupsTable, {
        fields: [usersToGroupsTable.groupId],
        references: [groupsTable.id],
      }),
    };
  }
);
