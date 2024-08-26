"use client";

import { PropsWithChildren } from "react";
import { ThemeProvider } from "@/features/theme/theme-provider";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ModalsContainer } from "@/components/modals/ModalsContainer";

const queryClient = new QueryClient();

export type ProvidersProps = PropsWithChildren;

export const Providers = (props: ProvidersProps) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <ModalsContainer />
        {props.children}
      </QueryClientProvider>
    </ThemeProvider>
  );
};
