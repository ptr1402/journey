import { pgTable, primaryKey, timestamp, integer } from "drizzle-orm/pg-core";
import { groups } from "./groups";
import { users } from "../user";
import { relations } from "drizzle-orm";

export const usersToGroups = pgTable(
  "usersToGroups",
  {
    userAddedAt: timestamp("userAddedAt", {
      mode: "date",
      withTimezone: false,
    }).defaultNow(),
    userId: integer("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    groupId: integer("groupId")
      .notNull()
      .references(() => groups.id, { onDelete: "cascade" }),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.userId, table.groupId] }),
    };
  }
);

export type SelectUserToGroup = typeof usersToGroups.$inferSelect;
export type InsertUserToGroup = typeof usersToGroups.$inferInsert;

export const usersToGroupsRelations = relations(usersToGroups, ({ one }) => {
  return {
    user: one(users, {
      fields: [usersToGroups.userId],
      references: [users.id],
    }),
    group: one(groups, {
      fields: [usersToGroups.groupId],
      references: [groups.id],
    }),
  };
});
