import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { swaggerUI } from "@hono/swagger-ui";
import { Hono } from "hono";
import {
  appRouter,
  createContext,
  generateOpenAPIDocument,
  type Env,
} from "@realm/api";

const app = new Hono<{ Bindings: Env }>();

app.get("/", (c) => c.json({ status: "ok" }));

app.all("/trpc/*", (c) =>
  fetchRequestHandler({
    endpoint: "/trpc",
    req: c.req.raw,
    router: appRouter,
    createContext: () => createContext(c.env),
  })
);

app.get("/swagger/spec", (c) => c.json(generateOpenAPIDocument()));
app.get("/swagger", swaggerUI({ url: "/swagger/spec" }));

export default {
  fetch: app.fetch,
  queue: (batch: MessageBatch, _env: Env) => {
    for (const message of batch.messages) {
      console.log("consumed from queue:", JSON.stringify(message.body));
    }
  },
} satisfies ExportedHandler<Env>;
