import { pgTable, serial, real, timestamp, integer } from "drizzle-orm/pg-core";
import { products } from "./products";
import { meals } from "./meals";
import { relations } from "drizzle-orm";

export const mealProducts = pgTable("mealProducts", {
  id: serial("id").primaryKey(),
  quantity: real("quantity").default(1.0).notNull(),
  createdAt: timestamp("createdAt", {
    mode: "date",
    withTimezone: false,
  }).defaultNow(),
  updatedAt: timestamp("updatedAt"),
  productId: integer("productId").references(() => products.id, {
    onDelete: "set null",
  }),
  mealId: integer("mealId")
    .notNull()
    .references(() => meals.id, {
      onDelete: "cascade",
    }),
});

export type SelectMealProduct = typeof mealProducts.$inferSelect;
export type InsertMealProduct = typeof mealProducts.$inferInsert;

export const mealProductsRelations = relations(mealProducts, ({ one }) => {
  return {
    product: one(products, {
      fields: [mealProducts.productId],
      references: [products.id],
    }),
    meal: one(meals, {
      fields: [mealProducts.mealId],
      references: [meals.id],
    }),
  };
});
