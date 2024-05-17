import { pgTable, serial, timestamp, integer } from "drizzle-orm/pg-core";
import { statusEnum } from "./invitations";
import { usersTable } from "../user";
import { groupsTable } from "./groups";
import { relations } from "drizzle-orm";

export const joinRequestsTable = pgTable("joinRequests", {
  id: serial("id").primaryKey(),
  status: statusEnum("status").default("pending"),
  createdAt: timestamp("createdAt", {
    mode: "date",
    withTimezone: false,
  }).defaultNow(),
  resolvedAt: timestamp("resolvedAt"),
  requesterId: integer("requesterId")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  groupId: integer("groupId")
    .notNull()
    .references(() => groupsTable.id, { onDelete: "cascade" }),
});

export type SelectJoinRequest = typeof joinRequestsTable.$inferSelect;
export type InsertJoinRequest = typeof joinRequestsTable.$inferInsert;

export const joinRequestsRelations = relations(joinRequestsTable, ({ one }) => {
  return {
    requester: one(usersTable, {
      fields: [joinRequestsTable.requesterId],
      references: [usersTable.id],
    }),
    group: one(groupsTable, {
      fields: [joinRequestsTable.groupId],
      references: [groupsTable.id],
    }),
  };
});
