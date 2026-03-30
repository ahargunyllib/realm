import { drizzle } from "drizzle-orm/d1";

export * from "./schema/index";
export * as queries from "./queries/index";

export const createDb = (d1: D1Database) => drizzle(d1);
export type Db = ReturnType<typeof createDb>;
