import { pgTable, serial, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { postsTable } from "./posts";
import { usersTable } from "../user";

export const likesTable = pgTable("likes", {
  id: serial("id").primaryKey(),
  postId: integer("postId")
    .notNull()
    .references(() => postsTable.id, { onDelete: "cascade" }),
  userId: integer("userId")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
});

export type SelectLike = typeof likesTable.$inferSelect;
export type InsertLike = typeof likesTable.$inferInsert;

export const likesRelations = relations(likesTable, ({ one }) => {
  return {
    post: one(postsTable, {
      fields: [likesTable.postId],
      references: [postsTable.id],
    }),
    user: one(usersTable, {
      fields: [likesTable.userId],
      references: [usersTable.id],
    }),
  };
});
