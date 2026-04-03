import { createTodoService, type TodoService } from "@realm/core";
import type { D1Database } from "@realm/db";
import { createDB, createTodoQueries } from "@realm/db";
import {
  createKV,
  createTodoOperations,
  type KVNamespaceType,
  type TodoOperations,
} from "@realm/kv";
import type { LoggerType } from "@realm/logger";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

type CreateContextOptions = {
  env: {
    db: D1Database;
    kv: KVNamespaceType;
  };
  fetchCreateContextFnOptions: FetchCreateContextFnOptions;
  logger: LoggerType;
  requestId: string;
  waitUntil: (promise: Promise<unknown>) => void;
};

export const createContext = ({
  env,
  logger,
  requestId,
  waitUntil,
}: CreateContextOptions): Context => {
  const baseContext = {
    requestId,
    waitUntil,
  };

  const db = createDB(env.db);
  const kv = createKV(env.kv);

  const todoOperations = createTodoOperations(kv);

  const todoQueries = createTodoQueries(db);

  const todoServices = createTodoService({
    ...baseContext,
    logger: logger.child({ service: "todo" }),
    todoQueries,
    todoOperations,
  });

  return {
    requestId,
    logger,
    services: {
      todo: todoServices,
    },
    operations: {
      todo: todoOperations,
    },
    waitUntil,
  };
};

export type Context = {
  requestId: string;
  logger: LoggerType;
  services: {
    todo: TodoService;
  };
  operations: {
    todo: TodoOperations;
  };
  waitUntil: (promise: Promise<unknown>) => void;
};
