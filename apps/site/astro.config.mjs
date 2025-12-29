// @ts-check
import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://ahargunyllib.dev",
  adapter: cloudflare(),
  integrations: [sitemap()],
});
