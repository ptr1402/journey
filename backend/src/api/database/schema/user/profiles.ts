import {
  pgTable,
  serial,
  varchar,
  date,
  pgEnum,
  integer,
  real,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { usersTable } from "./users";

export const genderEnum = pgEnum("gender", [
  "female",
  "male",
  "other",
  "not-mention",
]);

export const profilesTable = pgTable("profiles", {
  id: serial("id").primaryKey(),
  birthday: date("birthday"),
  gender: genderEnum("gender"),
  height: integer("height"),
  weight: real("weight"),
  bio: varchar("bio", { length: 128 }),
  createdAt: timestamp("createdAt", {
    mode: "date",
    withTimezone: false,
  }).defaultNow(),
  updatedAt: timestamp("updatedAt"),
  userId: integer("userId")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
});

export type SelectProfile = typeof profilesTable.$inferSelect;
export type InsertProfile = typeof profilesTable.$inferInsert;

export const profilesRelations = relations(profilesTable, ({ one }) => {
  return {
    user: one(usersTable, {
      fields: [profilesTable.userId],
      references: [usersTable.id],
    }),
  };
});
