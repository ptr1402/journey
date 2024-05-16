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
import { users } from "./users";

export const genderEnum = pgEnum("gender", [
  "female",
  "male",
  "other",
  "not-mention",
]);

export const profiles = pgTable("profiles", {
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
    .references(() => users.id, { onDelete: "cascade" }),
});

export type Profile = typeof profiles.$inferSelect;
export type NewProfile = typeof profiles.$inferInsert;

export const profilesRelations = relations(profiles, ({ one }) => {
  return {
    user: one(users, {
      fields: [profiles.userId],
      references: [users.id],
    }),
  };
});
