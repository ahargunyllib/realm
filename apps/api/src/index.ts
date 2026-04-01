import { createContext, trpcRouter } from "@realm/api";
import type { D1Database } from "@realm/db";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
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
    origin: ["*"],
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.get("/", (c) => c.text("Hello World"));
app.get("/health", (c) => c.json({ status: "ok" }));

app.use("/trpc/*", async (c) => {
  const response = await fetchRequestHandler({
    endpoint: "/trpc",
    req: c.req.raw,
    router: trpcRouter,
    createContext: (fetchCreateContextFnOptions) =>
      createContext({
        env: {
          db: c.env.DB,
        },
        fetchCreateContextFnOptions,
      }),
  });

  return response;
});

export default {
  fetch: app.fetch,
};
