import { pgTable, serial, real, timestamp, integer } from "drizzle-orm/pg-core";

export const mealProducts = pgTable("mealProducts", {
  id: serial("id").primaryKey(),
  quantity: real("quantity").default(1.0).notNull(),
  createdAt: timestamp("createdAt", {
    mode: "date",
    withTimezone: false,
  }).defaultNow(),
  updatedAt: timestamp("updatedAt"),
  productId: integer("productId"),
  mealId: integer("mealId"),
});
