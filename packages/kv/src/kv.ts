import type { KVNamespace } from "@cloudflare/workers-types";

type KVSetOptions = {
  /**
   * Expiration time in seconds. Defaults to 60 seconds if not provided.
   * @default 60
   * @remarks Expiration targets that are less than 60 seconds into the future are not supported. This is true for both expiration methods.
   */
  expirationTtl?: number;
};

export type KV = {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, options?: KVSetOptions): Promise<void>;
  delete(key: string): Promise<void>;
};

export const createKV = (kv: KVNamespace): KV => ({
  get: async (key) => await kv.get(key),
  set: async (key, value, options = {}) =>
    await kv.put(key, value, {
      expirationTtl: options.expirationTtl || 60,
    }),
  delete: async (key) => await kv.delete(key),
});

export type KVNamespaceType = KVNamespace;
