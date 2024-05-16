import { pgTable, integer, primaryKey } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { groups } from "./groups";
import { posts } from "./posts";

export const postsToGroups = pgTable(
  "groupsPosts",
  {
    groupId: integer("groupId")
      .notNull()
      .references(() => groups.id, { onDelete: "cascade" }),
    postId: integer("postId")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.groupId, table.postId] }),
    };
  }
);

export type PostsToGroups = typeof postsToGroups.$inferSelect;
export type NewPostsToGroups = typeof postsToGroups.$inferInsert;

export const postsToGroupsRelations = relations(postsToGroups, ({ one }) => {
  return {
    group: one(groups, {
      fields: [postsToGroups.groupId],
      references: [groups.id],
    }),
    post: one(posts, {
      fields: [postsToGroups.postId],
      references: [posts.id],
    }),
  };
});
