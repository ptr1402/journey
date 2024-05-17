import { relations } from "drizzle-orm";
import {
  text,
  timestamp,
  pgTable,
  serial,
  varchar,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { profiles } from "./profiles";
import { goals } from "./goals";
import {
  groups,
  invitations,
  joinRequests,
  likes,
  posts,
  usersToGroups,
} from "../community";
import { meals } from "../food";

export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    email: text("email").notNull(),
    username: varchar("username", { length: 32 }).notNull(),
    password: text("password").notNull(),
    createdAt: timestamp("createdAt", {
      mode: "date",
      withTimezone: false,
    }).defaultNow(),
    updatedAt: timestamp("updatedAt"),
  },
  (table) => {
    return {
      emailIdx: uniqueIndex("emailIndex").on(table.email),
    };
  }
);

export type SelectUser = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const usersRelations = relations(users, ({ one, many }) => ({
  profile: one(profiles),
  goal: one(goals),
  managingGroups: many(groups),
  usersToGroups: many(usersToGroups),
  invitations: many(invitations),
  joinRequests: many(joinRequests),
  posts: many(posts),
  meals: many(meals),
  likes: many(likes),
}));
