import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  varchar,
  pgEnum,
  real,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { mealProductsTable } from "./mealProducts";

export const portionSizeEnum = pgEnum("portionSize", [
  "100g",
  "100ml",
  "1cup",
  "1piece",
  "1can",
  "1tea-spoon",
]);

export const productsTable = pgTable(
  "products",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 32 }).notNull(),
    portionSize: portionSizeEnum("portionSize").notNull().default("100g"),
    kcalPerPortion: real("kcalPerPortion").default(0).notNull(),
    protPerPortion: real("protPerPortion").default(0).notNull(),
    carbPerPortion: real("carbPerPortion").default(0).notNull(),
    fatPerPortion: real("fatPerPortion").default(0).notNull(),
    createdAt: timestamp("createdAt", {
      mode: "date",
      withTimezone: false,
    }).defaultNow(),
    updatedAt: timestamp("updatedAt"),
  },
  (table) => {
    return {
      productNameIdx: uniqueIndex("productNameIndex").on(table.name),
    };
  }
);

export type SelectProduct = typeof productsTable.$inferSelect;
export type InsertProduct = typeof productsTable.$inferInsert;

export const productsRelations = relations(productsTable, ({ many }) => {
  return { mealProducts: many(mealProductsTable) };
});
