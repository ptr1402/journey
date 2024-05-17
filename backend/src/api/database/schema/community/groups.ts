import {
  pgTable,
  serial,
  integer,
  timestamp,
  varchar,
  text,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { usersTable } from "../user";
import { usersToGroupsTable } from "./usersToGroups";
import { invitationsTable } from "./invitations";
import { joinRequestsTable } from "./joinRequests";
import { postsToGroupsTable } from "./postsToGroups";

export const groupsTable = pgTable(
  "groups",
  {
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
      .references(() => usersTable.id, {
        onDelete: "cascade",
      }),
  },
  (table) => {
    return {
      groupNameIdx: index("groupNameIndex").on(table.name),
    };
  }
);

export type SelectGroup = typeof groupsTable.$inferSelect;
export type InsertGroup = typeof groupsTable.$inferInsert;

export const groupsRelations = relations(groupsTable, ({ one, many }) => {
  return {
    manager: one(usersTable, {
      fields: [groupsTable.manager],
      references: [usersTable.id],
    }),
    usersToGroups: many(usersToGroupsTable),
    invitations: many(invitationsTable),
    joinRequests: many(joinRequestsTable),
    postsToGroups: many(postsToGroupsTable),
  };
});
