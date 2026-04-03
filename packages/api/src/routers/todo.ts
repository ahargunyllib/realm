import z from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

const getAllTodos = publicProcedure.query(async ({ ctx }) => {
  const todos = await ctx.services.todo.getAllTodos();

  return todos;
});

const createTodo = publicProcedure
  .input(
    z.object({
      title: z.string().min(1, "Title is required"),
    })
  )
  .mutation(async ({ ctx, input }) => {
    await ctx.services.todo.createTodo({
      title: input.title,
    });
  });

const updateTodo = publicProcedure
  .input(
    z.object({
      id: z.string().min(1, "ID is required"),
      title: z.string().optional(),
      isCompleted: z.boolean().optional(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    await ctx.services.todo.updateTodo(input.id, {
      title: input.title,
      isCompleted: input.isCompleted,
    });
  });

const deleteTodo = publicProcedure
  .input(z.object({ id: z.string().min(1, "ID is required") }))
  .mutation(async ({ ctx, input }) => {
    await ctx.services.todo.deleteTodo(input.id);
  });

export const todoRouter = createTRPCRouter({
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
});
