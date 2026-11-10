// @ts-check
import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

// Pages that are reachable by direct link only (also marked noindex)
const hiddenPages = ["/services"];

export default defineConfig({
  site: "https://ahargunyllib.dev",
  adapter: cloudflare(),
  integrations: [
    mdx(),
    sitemap({
      filter: (page) =>
        !hiddenPages.some((path) => new URL(page).pathname.startsWith(path)),
    }),
  ],
  redirects: {
    "/analytics": "https://cloud.umami.is/share/eRIQq2WDxJVgvbcV",
  },
});
