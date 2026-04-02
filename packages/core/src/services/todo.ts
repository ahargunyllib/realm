import type { TodoQueries } from "@realm/db";
import { createNanoId, tryCatch } from "@realm/utils";
import { AppError, ErrorCode } from "../errors";
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
    const { error } = await tryCatch(todoQueries.createTodo(newTodo));
    if (error) {
      throw new AppError(
        ErrorCode.INTERNAL_SERVER_ERROR,
        "Failed to create todo",
        {
          cause: error,
          details: { todo: newTodo },
        }
      );
    }
  },
  updateTodo: async (id, todo) => {
    const updatedFields: Partial<Todo> = {
      ...todo,
      updatedAt: new Date().toISOString(),
    };
    const { error } = await tryCatch(todoQueries.updateTodo(id, updatedFields));
    if (error) {
      throw new AppError(
        ErrorCode.INTERNAL_SERVER_ERROR,
        "Failed to update todo",
        {
          cause: error,
          details: { id, updatedFields },
        }
      );
    }
  },
  deleteTodo: async (id) => {
    const { error } = await tryCatch(todoQueries.deleteTodo(id));
    if (error) {
      throw new AppError(
        ErrorCode.INTERNAL_SERVER_ERROR,
        "Failed to delete todo",
        {
          cause: error,
          details: { id },
        }
      );
    }
  },
});
