import {
  serial,
  varchar,
  timestamp,
  pgTable,
  integer,
} from "drizzle-orm/pg-core";

export const meals = pgTable("meals", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 32 }).default("Meal"),
  createdAt: timestamp("createdAt", {
    mode: "date",
    withTimezone: false,
  }).defaultNow(),
  userId: integer("userId"),
  createdBy: integer("createdBy"),
});
