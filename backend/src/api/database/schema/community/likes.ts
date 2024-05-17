import { pgTable, serial, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { posts } from "./posts";
import { users } from "../user";

export const likes = pgTable("likes", {
  id: serial("id").primaryKey(),
  postId: integer("postId")
    .notNull()
    .references(() => posts.id, { onDelete: "cascade" }),
  userId: integer("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export type SelectLike = typeof likes.$inferSelect;
export type InsertLike = typeof likes.$inferInsert;

export const likesRelations = relations(likes, ({ one }) => {
  return {
    post: one(posts, {
      fields: [likes.postId],
      references: [posts.id],
    }),
    user: one(users, {
      fields: [likes.userId],
      references: [users.id],
    }),
  };
});
