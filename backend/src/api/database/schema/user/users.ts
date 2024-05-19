import { relations } from "drizzle-orm";
import {
  text,
  timestamp,
  pgTable,
  serial,
  varchar,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { profilesTable } from "./profiles";
import { goalsTable } from "./goals";
import {
  groupsTable,
  invitationsTable,
  joinRequestsTable,
  likesTable,
  postsTable,
  usersToGroupsTable,
} from "../community";
import { mealsTable } from "../food";

export const usersTable = pgTable(
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
      usernameIdx: uniqueIndex("usernameIndex").on(table.username),
    };
  }
);

export type SelectUser = typeof usersTable.$inferSelect;
export type InsertUser = typeof usersTable.$inferInsert;

export const usersRelations = relations(usersTable, ({ one, many }) => ({
  profile: one(profilesTable),
  goal: one(goalsTable),
  managingGroups: many(groupsTable),
  usersToGroups: many(usersToGroupsTable),
  invitations: many(invitationsTable),
  joinRequests: many(joinRequestsTable),
  posts: many(postsTable),
  meals: many(mealsTable),
  likes: many(likesTable),
}));
