import type { TodoQueries } from "@realm/db";
import type { TodoOperations } from "@realm/kv";
import type { Todo } from "@realm/types";
import { createNanoId, tryCatch } from "@realm/utils";
import { AppError, ErrorCode } from "../errors";
import type { BaseContext } from "../types";

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

type CreateTodoServiceCtx = {
  todoQueries: TodoQueries;
  todoOperations: TodoOperations;
} & BaseContext;

export const createTodoService = (ctx: CreateTodoServiceCtx): TodoService => ({
  getAllTodos: async () => {
    const { data: cachedTodos } = await tryCatch(
      ctx.todoOperations.getAllTodo()
    );
    if (cachedTodos) {
      return cachedTodos;
    }

    const { data: todos, error } = await tryCatch(
      ctx.todoQueries.getAllTodos()
    );
    if (error) {
      throw new AppError(
        ErrorCode.INTERNAL_SERVER_ERROR,
        "Failed to fetch todos",
        {
          cause: error,
        }
      );
    }

    ctx.todoOperations.setAllTodo(todos);

    return todos;
  },
  createTodo: async (todo) => {
    const newTodo: Todo = {
      ...todo,
      id: createNanoId(),
      isCompleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const { error } = await tryCatch(ctx.todoQueries.createTodo(newTodo));
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

    ctx.waitUntil(ctx.todoOperations.deleteAllTodo());
  },
  updateTodo: async (id, todo) => {
    const updatedFields: Partial<Todo> = {
      ...todo,
      updatedAt: new Date().toISOString(),
    };
    const { data, error } = await tryCatch(
      ctx.todoQueries.updateTodo(id, updatedFields)
    );
    if (data === null) {
      throw new AppError(ErrorCode.NOT_FOUND, "Todo not found", {
        details: { id },
      });
    }

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

    ctx.waitUntil(
      Promise.all([
        ctx.todoOperations.deleteAllTodo(),
        ctx.todoOperations.setTodo(id, data),
      ])
    );
  },
  deleteTodo: async (id) => {
    const { error } = await tryCatch(ctx.todoQueries.deleteTodo(id));
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

    ctx.waitUntil(
      Promise.all([
        ctx.todoOperations.deleteAllTodo(),
        ctx.todoOperations.deleteTodo(id),
      ])
    );
  },
});
