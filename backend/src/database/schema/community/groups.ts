import {
  pgTable,
  serial,
  integer,
  timestamp,
  varchar,
  text,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "../user";
import { usersToGroups } from "./usersToGroups";
import { invitations } from "./invitations";
import { joinRequests } from "./joinRequests";
import { postsToGroups } from "./postsToGroups";

export const groups = pgTable("groups", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 64 }).notNull(),
  description: text("description"),
  createdAt: timestamp("createdAt", {
    mode: "date",
    withTimezone: false,
  }).defaultNow(),
  updatedAt: timestamp("updatedAt"),
  manager: integer("manager")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),
});

export const groupsRelations = relations(groups, ({ one, many }) => {
  return {
    manager: one(users, {
      fields: [groups.manager],
      references: [users.id],
    }),
    usersToGroups: many(usersToGroups),
    invitations: many(invitations),
    joinRequests: many(joinRequests),
    postsToGroups: many(postsToGroups),
  };
});
