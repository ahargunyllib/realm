import { TodoContainer } from "@/features/todo/components/todo-container";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/todo")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="min-h-screen w-sm border py-20">
        <TodoContainer />
      </div>
    </main>
  );
}
