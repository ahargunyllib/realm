import type { LoggerType } from "@realm/logger";

export type BaseContext = {
  waitUntil: (promise: Promise<unknown>) => void;
  logger: LoggerType;
  requestId: string;
};
