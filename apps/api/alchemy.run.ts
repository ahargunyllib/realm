import alchemy from "alchemy";
import { Worker } from "alchemy/cloudflare";

const app = await alchemy("realm-api");

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
