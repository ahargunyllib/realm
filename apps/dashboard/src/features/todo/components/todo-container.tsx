import { trpc } from "@/shared/lib/trpc";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@realm/ui/components/alert";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@realm/ui/components/empty";
import { useQuery } from "@tanstack/react-query";
import { CreateTodoForm } from "./create-todo-form";
import { TodoCard } from "./todo-card";

export function TodoContainer() {
  const { data, error } = useQuery(trpc.todoRouter.getAllTodos.queryOptions());

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="font-bold font-heading text-2xl">Todo List</h1>
      <CreateTodoForm />
      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      )}
      {data?.length === 0 && (
        <Empty>
          <EmptyHeader>
            <EmptyTitle>No todos yet</EmptyTitle>
            <EmptyDescription>
              Get started by adding a new todo.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}
      {data?.map((todo) => (
        <TodoCard key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
