import { trpcServer } from "@hono/trpc-server";
import { createContext, trpcRouter } from "@realm/api";
import type { D1Database } from "@realm/db";
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
    origin: "http://localhost:5173",
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
    createContext: (opts, c) =>
      createContext({
        env: {
          db: c.env.DB,
        },
        fetchCreateContextFnOptions: opts,
      }),
  })
);

export default {
  fetch: app.fetch,
};
