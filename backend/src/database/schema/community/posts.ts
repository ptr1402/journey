import {
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  integer,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "../user";
import { postsToGroups } from "./postsToGroups";
import { likes } from "./likes";

export const posts = pgTable("posts", {
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
    .references(() => users.id, { onDelete: "cascade" }),
});

export const postsRelations = relations(posts, ({ one, many }) => {
  return {
    author: one(users, {
      fields: [posts.authorId],
      references: [users.id],
    }),
    postsToGroups: many(postsToGroups),
    likes: many(likes),
  };
});
