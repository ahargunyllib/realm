export class KVStore {
  private readonly ns: KVNamespace;

  constructor(ns: KVNamespace) {
    this.ns = ns;
  }

  async get<T>(key: string): Promise<T | null> {
    const raw = await this.ns.get(key, "json");
    return raw as T | null;
  }

  async set<T>(
    key: string,
    value: T,
    options?: KVNamespacePutOptions
  ): Promise<void> {
    await this.ns.put(key, JSON.stringify(value), options);
  }

  async delete(key: string): Promise<void> {
    await this.ns.delete(key);
  }
}

export const createKV = (ns: KVNamespace) => new KVStore(ns);
