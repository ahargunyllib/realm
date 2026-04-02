import { queryClient } from "@/shared/lib/query-client";
import { trpc } from "@/shared/lib/trpc";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export const useIsCompleteToggle = ({
  todo: { id, isCompleted: initialIsCompleted },
}: {
  todo: {
    id: string;
    isCompleted: boolean;
  };
}) => {
  const [isCompleted, setIsCompleted] = useState(initialIsCompleted);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const latestIsCompletedRef = useRef(initialIsCompleted);
  const lastIsCompleted = useRef(initialIsCompleted);

  const mutation = useMutation(trpc.todoRouter.updateTodo.mutationOptions());

  const toggle = () => {
    setIsCompleted((prev) => {
      const newValue = !prev;
      latestIsCompletedRef.current = newValue;
      return newValue;
    });

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      const valueToSync = latestIsCompletedRef.current;

      if (valueToSync === lastIsCompleted.current) {
        return;
      }

      await mutation.mutateAsync(
        { id, isCompleted: valueToSync },
        {
          onSuccess: () => {
            lastIsCompleted.current = valueToSync;
            queryClient.invalidateQueries({
              queryKey: trpc.todoRouter.getAllTodos.queryKey(),
            });
          },
          onError: () => {
            setIsCompleted(lastIsCompleted.current);
            toast.error("Error updating todo", {
              description: "Please try again.",
            });
          },
        }
      );
    }, 500);
  };

  useEffect(
    () => () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    },
    []
  );

  return {
    isCompleted,
    toggle,
  };
};
