import { relations } from "drizzle-orm";
import {
  serial,
  varchar,
  timestamp,
  pgTable,
  integer,
  index,
} from "drizzle-orm/pg-core";
import { mealProductsTable } from "./mealProducts";
import { usersTable } from "../user";

export const mealsTable = pgTable(
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
      .references(() => usersTable.id, { onDelete: "cascade" }),
  },
  (table) => {
    return {
      mealNameIdx: index("mealNameIndex").on(table.name),
    };
  }
);

export type SelectMeal = typeof mealsTable.$inferSelect;
export type InsertMeal = typeof mealsTable.$inferInsert;

export const mealsRelations = relations(mealsTable, ({ one, many }) => {
  return {
    mealProducts: many(mealProductsTable),
    user: one(usersTable, {
      fields: [mealsTable.userId],
      references: [usersTable.id],
    }),
  };
});
