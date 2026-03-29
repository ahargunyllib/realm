import { createDb } from "@realm/db";
import { createEmailService } from "@realm/email";
import { createKV } from "@realm/kv";
import { createQueue } from "@realm/queue";
import { createStorage } from "@realm/storage";
import type { Db } from "@realm/db";
import type { EmailService } from "@realm/email";
import type { KVStore } from "@realm/kv";
import type { QueueProducer } from "@realm/queue";
import type { R2Storage } from "@realm/storage";

export interface Env {
  DB: D1Database;
  KV: KVNamespace;
  STORAGE: R2Bucket;
  QUEUE: Queue;
  BREVO_API_KEY: string;
}

export interface Context {
  db: Db;
  kv: KVStore;
  storage: R2Storage;
  queue: QueueProducer;
  email: EmailService;
  env: Env;
}

export const createContext = (env: Env): Context => ({
  db: createDb(env.DB),
  kv: createKV(env.KV),
  storage: createStorage(env.STORAGE),
  queue: createQueue(env.QUEUE),
  email: createEmailService(env.BREVO_API_KEY),
  env,
});
