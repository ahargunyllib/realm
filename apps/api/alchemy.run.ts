import alchemy from "alchemy";
import { Worker } from "alchemy/cloudflare";
import { GitHubComment } from "alchemy/github";
import { CloudflareStateStore } from "alchemy/state";

const app = await alchemy("realm-api", {
  stateStore:
    process.env.NODE_ENV === "production"
      ? (scope) =>
          new CloudflareStateStore(scope, {
            scriptName: "realm-api-state-store",
          })
      : undefined, // Uses default FileSystemStateStore
  password: process.env.ALCHEMY_PASSWORD,
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

if (process.env.PULL_REQUEST) {
  // if this is a PR, add a comment to the PR with the preview URL
  // it will auto-update with each push
  await GitHubComment("preview-comment", {
    owner: "ahargunyllib",
    repository: "realm",
    issueNumber: Number(process.env.PULL_REQUEST),
    body: `### Preview Deployment

**Commit:** \`${process.env.GITHUB_SHA}\`
**Preview URL:** ${worker.url}
**Deployed at:** ${new Date().toUTCString()}`,
  });
}

await app.finalize();
