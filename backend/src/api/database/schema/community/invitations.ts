import {
  pgTable,
  serial,
  pgEnum,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "../user";
import { groups } from "./groups";

export const statusEnum = pgEnum("status", ["pending", "declined", "accepted"]);

export const invitations = pgTable("invites", {
  id: serial("id").primaryKey(),
  status: statusEnum("status").default("pending").notNull(),
  createdAt: timestamp("createdAt", {
    mode: "date",
    withTimezone: false,
  }).defaultNow(),
  resolvedAt: timestamp("resolvedAt"),
  inviteeId: integer("inviteeId")
    .notNull()
    .references(() => users.id),
  groupId: integer("groupId")
    .notNull()
    .references(() => groups.id),
});

export type Invitation = typeof invitations.$inferSelect;
export type NewInvitation = typeof invitations.$inferInsert;

export const invitationsRelations = relations(invitations, ({ one }) => {
  return {
    invitee: one(users, {
      fields: [invitations.inviteeId],
      references: [users.id],
    }),
    group: one(groups, {
      fields: [invitations.groupId],
      references: [groups.id],
    }),
  };
});
