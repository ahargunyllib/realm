export class R2Storage {
  private readonly bucket: R2Bucket;

  constructor(bucket: R2Bucket) {
    this.bucket = bucket;
  }

  upload(
    key: string,
    body: ReadableStream | ArrayBuffer | string,
    options?: R2PutOptions
  ): Promise<R2Object> {
    return this.bucket.put(key, body, options);
  }

  download(key: string): Promise<R2ObjectBody | null> {
    return this.bucket.get(key);
  }

  remove(key: string): Promise<void> {
    return this.bucket.delete(key);
  }

  list(prefix?: string): Promise<R2Objects> {
    return this.bucket.list(prefix ? { prefix } : undefined);
  }
}

export const createStorage = (bucket: R2Bucket) => new R2Storage(bucket);
