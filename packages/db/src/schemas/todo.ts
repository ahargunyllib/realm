import { sql } from "drizzle-orm";
import { sqliteTable } from "drizzle-orm/sqlite-core";

export const todoTable = sqliteTable("todos", (t) => ({
  id: t.text().primaryKey(),
  title: t.text().notNull(),
  isCompleted: t.integer({ mode: "boolean" }).notNull().default(false),
  createdAt: t
    .text()
    .notNull()
    .default(sql`(strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))`), // ISO 8601 format in UTC
  updatedAt: t
    .text()
    .notNull()
    .default(sql`(strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))`), // ISO 8601 format in UTC
}));

export type SelectTodo = typeof todoTable.$inferSelect;
export type InsertTodo = typeof todoTable.$inferInsert;
