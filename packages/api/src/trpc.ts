import { AppError } from "@realm/core";
import { initTRPC, TRPCError } from "@trpc/server";
import SuperJSON from "superjson";
import type { Context } from "./context";

const t = initTRPC.context<Context>().create({
  transformer: SuperJSON,
});

const baseProcedure = t.procedure.use(async (opts) => {
  const { next } = opts;

  const response = await next();
  if (response.ok) {
    return response;
  }

  // TODO: Add logging here

  const { error } = response;
  if (error.cause instanceof AppError) {
    const appError = error.cause;
    throw new TRPCError({
      code: appError.code,
      message: appError.message,
      cause: appError,
    });
  }

  throw error;
});

export const createTRPCRouter = t.router;
export const publicProcedure = baseProcedure;
