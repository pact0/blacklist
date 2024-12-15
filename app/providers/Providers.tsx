"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "./ThemeProvider";
import { Toaster } from "@/components/ui/toaster";

const queryClient = new QueryClient();

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ThemeProvider>
        {children}
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default Providers;
