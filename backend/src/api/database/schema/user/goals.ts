import { pgTable, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { usersTable } from "./users";

export const goalsTable = pgTable("goals", {
  id: serial("id").primaryKey(),
  dailyKcalGoal: integer("dailyKcalGoal"),
  dailyProteinGoal: integer("dailyProteinGoal"),
  dailyCarbsGoal: integer("dailyCarbsGoal"),
  dailyFatsgoal: integer("dailyFatsGoal"),
  createdAt: timestamp("createdAt", {
    mode: "date",
    withTimezone: false,
  }).defaultNow(),
  updatedAt: timestamp("updatedAt"),
  userId: integer("userId")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
});

export type SelectGoal = typeof goalsTable.$inferSelect;
export type InsertGoal = typeof goalsTable.$inferInsert;

export const goalsRelations = relations(goalsTable, ({ one }) => {
  return {
    user: one(usersTable, {
      fields: [goalsTable.userId],
      references: [usersTable.id],
    }),
  };
});
