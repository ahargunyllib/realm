import type { Todo } from "@realm/types";
import type { KV } from "../kv";

export type TodoOperations = {
  getTodo: (id: string) => Promise<Todo | null>;
  setTodo: (id: string, todo: Omit<Todo, "id">) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
};

export const createTodoOperations = (kv: KV): TodoOperations => ({
  getTodo: async (id) => {
    const todoString = await kv.get(id);
    if (!todoString) {
      return null;
    }

    return await JSON.parse(todoString);
  },
  setTodo: async (id, todo) => {
    await kv.set(id, JSON.stringify({ ...todo, id }));
  },
  deleteTodo: async (id) => {
    await kv.delete(id);
  },
});
