import type { Todo } from "@realm/types";
import { KEYS } from "../keys";
import type { KV } from "../kv";

export type TodoOperations = {
  getAllTodo: () => Promise<Todo[] | null>;
  getTodo: (id: string) => Promise<Todo | null>;
  setAllTodo: (todos: Todo[]) => Promise<void>;
  setTodo: (id: string, todo: Todo) => Promise<void>;
  deleteAllTodo: () => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
};

export const createTodoOperations = (kv: KV): TodoOperations => ({
  getAllTodo: async () => {
    const todos = await kv.get(KEYS.todo.all);
    if (!todos) {
      return null;
    }

    return JSON.parse(todos);
  },
  getTodo: async (id) => {
    const todoString = await kv.get(KEYS.todo.byId(id));
    if (!todoString) {
      return null;
    }

    return await JSON.parse(todoString);
  },
  setAllTodo: async (todos) => {
    await kv.set(KEYS.todo.all, JSON.stringify(todos));
  },
  setTodo: async (id, todo) => {
    await kv.set(KEYS.todo.byId(id), JSON.stringify({ ...todo, id }));
  },
  deleteAllTodo: async () => {
    await kv.delete(KEYS.todo.all);
  },
  deleteTodo: async (id) => {
    await kv.delete(KEYS.todo.byId(id));
  },
});
