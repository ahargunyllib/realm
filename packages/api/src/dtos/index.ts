import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

// DTOs go here. Use .openapi() to add OpenAPI metadata.
// Example:
// export const CreateUserDto = z.object({
//   name: z.string().openapi({ description: "User name", example: "John Doe" }),
//   email: z.string().email().openapi({ description: "User email" }),
// }).openapi("CreateUserDto");
