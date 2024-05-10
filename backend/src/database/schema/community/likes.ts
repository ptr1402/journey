import { pgTable, serial, integer } from "drizzle-orm/pg-core";

export const likes = pgTable("likes", {
  id: serial("id").primaryKey(),
  postId: integer("postId"),
  userId: integer("userId"),
});
