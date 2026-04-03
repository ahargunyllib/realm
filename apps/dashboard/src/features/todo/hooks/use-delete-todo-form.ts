import { queryClient } from "@/shared/lib/query-client";
import { trpc } from "@/shared/lib/trpc";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteTodoForm = ({ id }: { id: string }) => {
  const mutation = useMutation(trpc.todoRouter.deleteTodo.mutationOptions());

  const onDelete = () => {
    mutation.mutate(
      { id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: trpc.todoRouter.getAllTodos.queryKey(),
          });
          toast.success("Todo deleted successfully");
        },
        onError: (error) => {
          toast.error("Error deleting todo", {
            description: error.message,
          });
        },
      }
    );
  };

  return {
    onDelete,
    isDeleting: mutation.isPending,
  };
};
