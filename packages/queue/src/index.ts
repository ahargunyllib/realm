export type QueueMessage<T = unknown> = {
  type: string;
  payload: T;
  timestamp: number;
};

export class QueueProducer<T = unknown> {
  private readonly queue: Queue<QueueMessage<T>>;

  constructor(queue: Queue<QueueMessage<T>>) {
    this.queue = queue;
  }

  async send(type: string, payload: T): Promise<void> {
    await this.queue.send({ type, payload, timestamp: Date.now() });
  }

  async sendBatch(messages: { type: string; payload: T }[]): Promise<void> {
    await this.queue.sendBatch(
      messages.map((m) => ({
        body: { type: m.type, payload: m.payload, timestamp: Date.now() },
      }))
    );
  }
}

export const createQueue = <T>(queue: Queue<QueueMessage<T>>) =>
  new QueueProducer<T>(queue);
