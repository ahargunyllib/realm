import { createNanoIdWithPrefix } from "@realm/utils";
import z from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

const getAllTodos = publicProcedure.query(async ({ ctx }) => {
  const todos = await ctx.services.todo.getAllTodos();

  return todos;
});

const createTodo = publicProcedure
  .input(
    z.object({
      title: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const todo = {
      id: createNanoIdWithPrefix("todo"),
      title: input.title,
      isCompleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await ctx.services.todo.createTodo(todo);
  });

const updateTodo = publicProcedure
  .input(
    z.object({
      id: z.string(),
      title: z.string().optional(),
      isCompleted: z.boolean().optional(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const { id, ...updateData } = input;
    await ctx.services.todo.updateTodo(id, updateData);
  });

const deleteTodo = publicProcedure
  .input(z.object({ id: z.string() }))
  .mutation(async ({ ctx, input }) => {
    await ctx.services.todo.deleteTodo(input.id);
  });

export const todoRouter = createTRPCRouter({
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
});
