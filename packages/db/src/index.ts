import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema/index";

export * from "./schema/index";
export * as queries from "./queries/index";
export { schema };

export const createDb = (d1: D1Database) => drizzle(d1, { schema });
export type Db = ReturnType<typeof createDb>;
