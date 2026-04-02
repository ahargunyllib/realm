import { createTodoService, type TodoService } from "@realm/core";
import type { D1Database } from "@realm/db";
import { createDB, createTodoQueries } from "@realm/db";
import type { LoggerType } from "@realm/logger";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

type CreateContextOptions = {
  env: {
    db: D1Database;
  };
  fetchCreateContextFnOptions: FetchCreateContextFnOptions;
  logger: LoggerType;
  requestId: string;
};

export const createContext = ({
  env,
  logger,
  requestId,
}: CreateContextOptions): Context => {
  const db = createDB(env.db);

  const todoQueries = createTodoQueries(db);

  const todoServices = createTodoService(todoQueries);

  return {
    requestId,
    logger,
    services: {
      todo: todoServices,
    },
  };
};

export type Context = {
  requestId: string;
  logger: LoggerType;
  services: {
    todo: TodoService;
  };
};
