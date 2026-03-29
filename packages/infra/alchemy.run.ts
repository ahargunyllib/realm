import alchemy from "alchemy";
import {
  D1Database,
  KVNamespace,
  Queue,
  R2Bucket,
  Worker,
} from "alchemy/cloudflare";

const app = alchemy("realm", {
  stage: process.env.ALCHEMY_STAGE ?? "production",
});

const db = await D1Database("db", {
  name: "realm-db",
  migrationsDir: "../db/drizzle",
});

const kv = await KVNamespace("kv", {
  title: "realm-kv",
});

const storage = await R2Bucket("storage", {
  name: "realm-storage",
});

const queue = await Queue("queue", {
  name: "realm-queue",
});

const api = await Worker("api", {
  name: "realm-api",
  entrypoint: "../apps/api/src/index.ts",
  compatibilityDate: "2025-06-15",
  compatibilityFlags: ["nodejs_compat"],
  bindings: {
    DB: db,
    KV: kv,
    STORAGE: storage,
    QUEUE: queue,
  },
  domains: ["api.ahargunyllib.dev"],
  url: true,
});

console.log("API URL:", api.url);

await app.finalize();
