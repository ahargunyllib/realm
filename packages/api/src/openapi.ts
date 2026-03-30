import {
  OpenApiGeneratorV3,
  OpenAPIRegistry,
} from "@asteasolutions/zod-to-openapi";
import type { OpenAPIObject } from "openapi3-ts/oas30";
import "./dtos/index";

export const registry = new OpenAPIRegistry();

export const generateOpenAPIDocument = (): OpenAPIObject => {
  const generator = new OpenApiGeneratorV3(registry.definitions);
  return generator.generateDocument({
    openapi: "3.0.0",
    info: {
      title: "Realm API",
      version: "0.0.1",
      description: "Realm API — powered by tRPC and Hono on Cloudflare Workers",
    },
    servers: [{ url: "https://api.ahargunyllib.dev" }],
  });
};
