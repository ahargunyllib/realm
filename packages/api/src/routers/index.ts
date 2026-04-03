import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { createTRPCRouter } from "../trpc";
import { todoRouter } from "./todo";

export const trpcRouter = createTRPCRouter({
  todoRouter,
});

export type TRPCRouter = typeof trpcRouter;
export type RouterInputs = inferRouterInputs<TRPCRouter>;
export type RouterOutputs = inferRouterOutputs<TRPCRouter>;
