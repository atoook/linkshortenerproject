import {
  index,
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const links = pgTable(
  "links",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    userId: text("user_id").notNull(),
    originalUrl: varchar("original_url", { length: 2048 }).notNull(),
    shortCode: varchar("short_code", { length: 32 }).notNull().unique(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" })
      .notNull()
      .defaultNow(),
  },
  (table) => [index("links_user_id_idx").on(table.userId)],
);
//export types for use in the application
export type Link = typeof links.$inferSelect;
export type NewLink = typeof links.$inferInsert;
