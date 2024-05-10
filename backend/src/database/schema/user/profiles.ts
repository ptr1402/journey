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
  userId: integer("userId"),
});
