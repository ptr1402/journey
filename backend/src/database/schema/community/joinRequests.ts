import { pgTable, serial, timestamp, integer } from "drizzle-orm/pg-core";
import { statusEnum } from "./invites";

export const joinRequests = pgTable("joinRequests", {
  id: serial("id").primaryKey(),
  status: statusEnum("status").default("pending"),
  createdAt: timestamp("createdAt", {
    mode: "date",
    withTimezone: false,
  }).defaultNow(),
  resolvedAt: timestamp("resolvedAt"),
  groupId: integer("groupId"),
  requesterId: integer("requesterId"),
});
