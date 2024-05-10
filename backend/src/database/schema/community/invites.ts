import {
  pgTable,
  serial,
  pgEnum,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("status", ["pending", "declined", "accepted"]);

export const invites = pgTable("invites", {
  id: serial("id").primaryKey(),
  status: statusEnum("status").default("pending").notNull(),
  createdAt: timestamp("createdAt", {
    mode: "date",
    withTimezone: false,
  }).defaultNow(),
  resolvedAt: timestamp("resolvedAt"),
  groupId: integer("groupId"),
  inviteeId: integer("inviteeId"),
});
