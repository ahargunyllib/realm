import { createTodoService, type TodoService } from "@realm/core";
import { createTodoQueries, type DB } from "@realm/db";
import type { D1Database } from "@realm/db";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

type CreateContextOptions = {
  env: {
    db: D1Database;
  };
  fetchCreateContextFnOptions: FetchCreateContextFnOptions;
};

export const createContext = ({ env }: CreateContextOptions): Context => {
  const todoQueries = createTodoQueries(env.db);

  const todoServices = createTodoService(todoQueries);

  return {
    services: {
      todo: todoServices,
    },
    env,
  };
};

export type Context = {
  services: {
    todo: TodoService;
  };
  env: {
    db: DB;
  };
};
