import { pgTable, serial, integer, timestamp } from "drizzle-orm/pg-core";

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
  userId: integer("userId"),
});
