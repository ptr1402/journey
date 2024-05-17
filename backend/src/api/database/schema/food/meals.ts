import { relations } from "drizzle-orm";
import {
  serial,
  varchar,
  timestamp,
  pgTable,
  integer,
  index,
} from "drizzle-orm/pg-core";
import { mealProducts } from "./mealProducts";
import { users } from "../user";

export const meals = pgTable(
  "meals",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 32 }).default("Meal"),
    createdAt: timestamp("createdAt", {
      mode: "date",
      withTimezone: false,
    }).defaultNow(),
    userId: integer("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  },
  (table) => {
    return {
      mealNameIdx: index("mealNameIndex").on(table.name),
    };
  }
);

export type SelectMeal = typeof meals.$inferSelect;
export type InsertMeal = typeof meals.$inferInsert;

export const mealsRelations = relations(meals, ({ one, many }) => {
  return {
    mealProducts: many(mealProducts),
    user: one(users, {
      fields: [meals.userId],
      references: [users.id],
    }),
  };
});
