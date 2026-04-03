import { Toaster } from "@realm/ui/components/sonner";
import { ThemeProvider } from "@realm/ui/components/theme-provider";
import { TooltipProvider } from "@realm/ui/components/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import ReactDOM from "react-dom/client";
import { routeTree } from "./routeTree.gen";
import { queryClient } from "./shared/lib/query-client";

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultPendingComponent: () => <div>Loading...</div>,
  defaultNotFoundComponent: () => <div>Not Found</div>,
  Wrap({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <TooltipProvider>
            {children}
            <Toaster richColors />
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    );
  },
});

declare module "@tanstack/react-router" {
  // biome-ignore lint/style/useConsistentTypeDefinitions: false positive
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<RouterProvider router={router} />);
}
