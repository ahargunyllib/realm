import { queryClient } from "@/shared/lib/query-client";
import { trpc } from "@/shared/lib/trpc";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
});

export const useCreateTodoForm = () => {
  const mutation = useMutation(trpc.todoRouter.createTodo.mutationOptions());

  const form = useForm({
    defaultValues: {
      title: "",
    },
    validators: {
      onSubmit: schema,
      onBlur: schema,
      onChange: schema,
    },
    onSubmit: async ({ value }) => {
      await mutation.mutateAsync(value, {
        onSuccess: () => {
          form.reset();
          queryClient.invalidateQueries({
            queryKey: trpc.todoRouter.getAllTodos.queryKey(),
          });
          toast.success("Todo created successfully");
        },
        onError: (error) => {
          toast.error("Error creating todo", {
            description: error.message,
          });
        },
      });
    },
  });

  return {
    form,
  };
};
