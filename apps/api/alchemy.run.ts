import alchemy from "alchemy";
import { Worker } from "alchemy/cloudflare";
import { CloudflareStateStore } from "alchemy/state";

const app = await alchemy("realm-api", {
  stateStore:
    process.env.NODE_ENV === "production"
      ? (scope) =>
          new CloudflareStateStore(scope, {
            scriptName: "realm-api-state-store",
          })
      : undefined, // Uses default FileSystemStateStore
});

export const worker = await Worker("api", {
  name: "realm-api",
  entrypoint: "./src/index.ts",
  url: true,
  adopt: true,
  bindings: {},
  observability: {
    enabled: true,
    logs: {
      enabled: true,
      headSamplingRate: 1,
      invocationLogs: true,
      persist: true,
    },
    traces: {
      enabled: true,
      headSamplingRate: 1,
      persist: true,
    },
  },
  domains: ["api.ahargunyllib.dev"],
  dev: {
    port: 3000,
  },
});

await app.finalize();
