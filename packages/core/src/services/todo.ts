import type { TodoQueries } from "@realm/db";
import { createNanoId } from "@realm/utils";
import type { Todo } from "../types";

export type TodoService = {
  getAllTodos: () => Promise<Todo[]>;
  createTodo: (
    todo: Omit<Todo, "id" | "isCompleted" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  updateTodo: (
    id: string,
    todo: Partial<Omit<Todo, "id" | "createdAt" | "updatedAt">>
  ) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
};

export const createTodoService = (todoQueries: TodoQueries): TodoService => ({
  getAllTodos: async () => await todoQueries.getAllTodos(),
  createTodo: async (todo) => {
    const newTodo: Todo = {
      ...todo,
      id: createNanoId(),
      isCompleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await todoQueries.createTodo(newTodo);
  },
  updateTodo: async (id, todo) => {
    const updatedFields: Partial<Todo> = {
      ...todo,
      updatedAt: new Date().toISOString(),
    };
    await todoQueries.updateTodo(id, updatedFields);
  },
  deleteTodo: async (id) => {
    await todoQueries.deleteTodo(id);
  },
});
