import { pgTable, serial, real, timestamp, integer } from "drizzle-orm/pg-core";
import { productsTable } from "./products";
import { mealsTable } from "./meals";
import { relations } from "drizzle-orm";

export const mealProductsTable = pgTable("mealProducts", {
  id: serial("id").primaryKey(),
  quantity: real("quantity").default(1.0).notNull(),
  createdAt: timestamp("createdAt", {
    mode: "date",
    withTimezone: false,
  }).defaultNow(),
  updatedAt: timestamp("updatedAt"),
  productId: integer("productId").references(() => productsTable.id, {
    onDelete: "set null",
  }),
  mealId: integer("mealId")
    .notNull()
    .references(() => mealsTable.id, {
      onDelete: "cascade",
    }),
});

export type SelectMealProduct = typeof mealProductsTable.$inferSelect;
export type InsertMealProduct = typeof mealProductsTable.$inferInsert;

export const mealProductsRelations = relations(mealProductsTable, ({ one }) => {
  return {
    product: one(productsTable, {
      fields: [mealProductsTable.productId],
      references: [productsTable.id],
    }),
    meal: one(mealsTable, {
      fields: [mealProductsTable.mealId],
      references: [mealsTable.id],
    }),
  };
});
