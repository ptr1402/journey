import {
  pgTable,
  serial,
  pgEnum,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { usersTable } from "../user";
import { groupsTable } from "./groups";

export const statusEnum = pgEnum("status", ["pending", "declined", "accepted"]);

export const invitationsTable = pgTable("invites", {
  id: serial("id").primaryKey(),
  status: statusEnum("status").default("pending").notNull(),
  createdAt: timestamp("createdAt", {
    mode: "date",
    withTimezone: false,
  }).defaultNow(),
  resolvedAt: timestamp("resolvedAt"),
  inviteeId: integer("inviteeId")
    .notNull()
    .references(() => usersTable.id),
  groupId: integer("groupId")
    .notNull()
    .references(() => groupsTable.id),
});

export type SelectInvitation = typeof invitationsTable.$inferSelect;
export type InsertInvitation = typeof invitationsTable.$inferInsert;

export const invitationsRelations = relations(invitationsTable, ({ one }) => {
  return {
    invitee: one(usersTable, {
      fields: [invitationsTable.inviteeId],
      references: [usersTable.id],
    }),
    group: one(groupsTable, {
      fields: [invitationsTable.groupId],
      references: [groupsTable.id],
    }),
  };
});
