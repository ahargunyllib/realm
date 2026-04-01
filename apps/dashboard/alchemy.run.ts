import alchemy from "alchemy";
import { Vite } from "alchemy/cloudflare";
import { GitHubComment } from "alchemy/github";
import { CloudflareStateStore } from "alchemy/state";

const app = await alchemy("realm-dashboard", {
  stateStore:
    process.env.NODE_ENV === "production"
      ? (scope) =>
          new CloudflareStateStore(scope, {
            scriptName: "realm-api-state-store",
          })
      : undefined, // Uses default FileSystemStateStore
  password: process.env.ALCHEMY_PASSWORD,
});

const worker = await Vite("dashboard", {
  name: `realm-dashboard-${app.stage}`,
  bindings: {
    VITE_PUBLIC_API_URL: process.env.API_URL || "http://localhost:3000",
  },
  domains: app.stage === "prod" ? ["dash.ahargunyllib.dev"] : undefined,
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

console.log(`Dashboard deployed at: ${worker.url}`);

await app.finalize();
