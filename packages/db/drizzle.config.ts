import { defineConfig } from "drizzle-kit";

const requireEnv = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

export default defineConfig({
  schema: "./src/schema/index.ts",
  out: "./drizzle",
  dialect: "sqlite",
  driver: "d1-http",
  dbCredentials: {
    accountId: requireEnv("CLOUDFLARE_ACCOUNT_ID"),
    databaseId: requireEnv("CLOUDFLARE_D1_DATABASE_ID"),
    token: requireEnv("CLOUDFLARE_D1_TOKEN"),
  },
});
