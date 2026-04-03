import { Button } from "@realm/ui/components/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@realm/ui/components/card";
import { Checkbox } from "@realm/ui/components/checkbox";
import { Label } from "@realm/ui/components/label";
import { LoaderCircleIcon, TrashIcon } from "lucide-react";
import { useDeleteTodoForm } from "../hooks/use-delete-todo-form";
import { useIsCompleteToggle } from "../hooks/use-is-complete-toggle";

type Props = {
  todo: {
    id: string;
    title: string;
    isCompleted: boolean;
    createdAt: string;
    updatedAt: string;
  };
};

export function TodoCard({ todo }: Props) {
  const { toggle, isCompleted } = useIsCompleteToggle({ todo });
  const { onDelete, isDeleting } = useDeleteTodoForm({ id: todo.id });

  const formattedDate = new Date(todo.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <span className={todo.isCompleted ? "line-through opacity-60" : ""}>
            {todo.title}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={isCompleted}
              id="isCompleted"
              name="isCompleted"
              onCheckedChange={() => {
                toggle();
              }}
            />
            <Label
              className="text-muted-foreground text-xs"
              htmlFor="isCompleted"
            >
              {isCompleted ? "Completed" : "Mark as complete"}
            </Label>
          </div>
          <p className="text-muted-foreground text-xs">
            Created: {formattedDate}
          </p>
        </div>
      </CardContent>
      <CardFooter className="justify-end">
        <Button
          disabled={isDeleting}
          onClick={onDelete}
          size="sm"
          type="button"
          variant="destructive"
        >
          {isDeleting ? (
            <LoaderCircleIcon className="size-4 animate-spin" />
          ) : (
            <TrashIcon className="size-4" />
          )}
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
