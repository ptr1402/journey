import { pgTable, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "./users";

export const goals = pgTable("goals", {
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
    .references(() => users.id, { onDelete: "cascade" }),
});

export type Goal = typeof goals.$inferSelect;
export type NewGoal = typeof goals.$inferInsert;

export const goalsRelations = relations(goals, ({ one }) => {
  return {
    user: one(users, {
      fields: [goals.userId],
      references: [users.id],
    }),
  };
});
