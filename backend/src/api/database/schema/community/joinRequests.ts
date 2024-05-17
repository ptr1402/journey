import { pgTable, serial, timestamp, integer } from "drizzle-orm/pg-core";
import { statusEnum } from "./invitations";
import { users } from "../user";
import { groups } from "./groups";
import { relations } from "drizzle-orm";

export const joinRequests = pgTable("joinRequests", {
  id: serial("id").primaryKey(),
  status: statusEnum("status").default("pending"),
  createdAt: timestamp("createdAt", {
    mode: "date",
    withTimezone: false,
  }).defaultNow(),
  resolvedAt: timestamp("resolvedAt"),
  requesterId: integer("requesterId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  groupId: integer("groupId")
    .notNull()
    .references(() => groups.id, { onDelete: "cascade" }),
});

export type SelectJoinRequest = typeof joinRequests.$inferSelect;
export type InsertJoinRequest = typeof joinRequests.$inferInsert;

export const joinRequestsRelations = relations(joinRequests, ({ one }) => {
  return {
    requester: one(users, {
      fields: [joinRequests.requesterId],
      references: [users.id],
    }),
    group: one(groups, {
      fields: [joinRequests.groupId],
      references: [groups.id],
    }),
  };
});
