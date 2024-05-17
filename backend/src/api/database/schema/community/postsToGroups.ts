import { pgTable, integer, primaryKey } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { groupsTable } from "./groups";
import { postsTable } from "./posts";

export const postsToGroupsTable = pgTable(
  "groupsPosts",
  {
    groupId: integer("groupId")
      .notNull()
      .references(() => groupsTable.id, { onDelete: "cascade" }),
    postId: integer("postId")
      .notNull()
      .references(() => postsTable.id, { onDelete: "cascade" }),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.groupId, table.postId] }),
    };
  }
);

export type SelectPostToGroup = typeof postsToGroupsTable.$inferSelect;
export type InsertPostToGroup = typeof postsToGroupsTable.$inferInsert;

export const postsToGroupsRelations = relations(
  postsToGroupsTable,
  ({ one }) => {
    return {
      group: one(groupsTable, {
        fields: [postsToGroupsTable.groupId],
        references: [groupsTable.id],
      }),
      post: one(postsTable, {
        fields: [postsToGroupsTable.postId],
        references: [postsTable.id],
      }),
    };
  }
);
