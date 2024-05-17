import {
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  integer,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { usersTable } from "../user";
import { postsToGroupsTable } from "./postsToGroups";
import { likesTable } from "./likes";

export const postsTable = pgTable(
  "posts",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 32 }).notNull(),
    content: text("content").notNull(),
    createdAt: timestamp("createdAt", {
      mode: "date",
      withTimezone: false,
    }).defaultNow(),
    editedAt: timestamp("editedAt", { mode: "date", withTimezone: false }),
    authorId: integer("users")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
  },
  (table) => {
    return {
      postTitleIdx: index("postTitleIndex").on(table.title),
    };
  }
);

export type SelectPost = typeof postsTable.$inferSelect;
export type InsertPost = typeof postsTable.$inferInsert;

export const postsRelations = relations(postsTable, ({ one, many }) => {
  return {
    author: one(usersTable, {
      fields: [postsTable.authorId],
      references: [usersTable.id],
    }),
    postsToGroups: many(postsToGroupsTable),
    likes: many(likesTable),
  };
});
