export class R2Storage {
  constructor(private readonly bucket: R2Bucket) {}

  async upload(
    key: string,
    body: ReadableStream | ArrayBuffer | string,
    options?: R2PutOptions,
  ): Promise<R2Object> {
    return this.bucket.put(key, body, options);
  }

  async download(key: string): Promise<R2ObjectBody | null> {
    return this.bucket.get(key);
  }

  async remove(key: string): Promise<void> {
    await this.bucket.delete(key);
  }

  async list(prefix?: string): Promise<R2Objects> {
    return this.bucket.list(prefix ? { prefix } : undefined);
  }
}

export const createStorage = (bucket: R2Bucket) => new R2Storage(bucket);
