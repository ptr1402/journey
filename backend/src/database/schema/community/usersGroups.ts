import { pgTable, serial, timestamp, integer } from "drizzle-orm/pg-core";

export const usersGroups = pgTable("usersToGroups", {
  id: serial("id").primaryKey(),
  userAddedAt: timestamp("userAddedAt", {
    mode: "date",
    withTimezone: false,
  }).defaultNow(),
  groupId: integer("groupId"),
  userId: integer("userId"),
});
