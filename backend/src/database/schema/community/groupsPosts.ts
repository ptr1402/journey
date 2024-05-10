import { pgTable, serial, integer } from "drizzle-orm/pg-core";

export const groupsPosts = pgTable("groupsPosts", {
  id: serial("id").primaryKey(),
  groupId: integer("groupId"),
  postId: integer("postId"),
});
