import { eq } from "drizzle-orm";
import type { DB } from "../db";
import { schema } from "../schemas";
import type { InsertTodo, SelectTodo } from "../schemas/todo";

export type TodoQueries = {
  getAllTodos: () => Promise<SelectTodo[]>;
  createTodo: (todo: InsertTodo) => Promise<void>;
  updateTodo: (
    id: string,
    todo: Partial<InsertTodo>
  ) => Promise<SelectTodo | null>;
  deleteTodo: (id: string) => Promise<void>;
};

export const createTodoQueries = (db: DB): TodoQueries => ({
  getAllTodos: async () => await db.select().from(schema.todoTable),
  createTodo: async (todo) => {
    await db.insert(schema.todoTable).values(todo);
  },
  updateTodo: async (id, todo) => {
    const [record] = await db
      .update(schema.todoTable)
      .set(todo)
      .where(eq(schema.todoTable.id, id))
      .returning();
    if (!record) {
      return null;
    }

    return record;
  },
  deleteTodo: async (id) => {
    await db.delete(schema.todoTable).where(eq(schema.todoTable.id, id));
  },
});
