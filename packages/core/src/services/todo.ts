import type { TodoQueries } from "@realm/db";
import { createNanoId } from "@realm/utils";
import type { Todo } from "../types";

export type TodoService = {
  getAllTodos: () => Promise<Todo[]>;
  createTodo: (todo: Omit<Todo, "id">) => Promise<void>;
  updateTodo: (id: string, todo: Partial<Omit<Todo, "id">>) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
};

export const createTodoService = (todoQueries: TodoQueries): TodoService => ({
  getAllTodos: async () => await todoQueries.getAllTodos(),
  createTodo: async (todo) => {
    const newTodo = {
      ...todo,
      id: createNanoId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await todoQueries.createTodo(newTodo);
  },
  updateTodo: async (id, todo) => {
    const updatedFields = {
      ...todo,
      updatedAt: new Date().toISOString(),
    };
    await todoQueries.updateTodo(id, updatedFields);
  },
  deleteTodo: async (id) => {
    await todoQueries.deleteTodo(id);
  },
});
