import { trpcServer } from "@hono/trpc-server";
import { createContext, trpcRouter } from "@realm/api";
import type { D1Database } from "@realm/db";
import { createLogger } from "@realm/logger";
import { createNanoId } from "@realm/utils";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

const app = new Hono<{
  Bindings: {
    DB: D1Database;
  };
}>();

app.use(logger());
app.use(
  "/*",
  cors({
    origin: (origin) => {
      const allowedOrigins = [
        "localhost",
        "ahargunyllib.dev",
        "ahargunyllib.workers.dev",
      ];
      if (
        allowedOrigins.some((allowedOrigin) => origin.includes(allowedOrigin))
      ) {
        return origin;
      }
    },
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization", "trpc-accept"],
    credentials: true,
  })
);

app.get("/", (c) => c.text("Hello World"));
app.get("/health", (c) => c.json({ status: "ok" }));

app.use(
  "/trpc/*",
  trpcServer({
    router: trpcRouter,
    createContext: (opts, c) => {
      const requestId = createNanoId();
      const customLogger = createLogger({ requestId });

      return createContext({
        env: {
          db: c.env.DB,
        },
        fetchCreateContextFnOptions: opts,
        logger: customLogger,
        requestId,
      });
    },
  })
);

export default {
  fetch: app.fetch,
};
