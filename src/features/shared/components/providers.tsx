"use client";

import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ToastProvider } from "@/ui/components/toast-provider";

interface ProvidersProps {
  children: React.ReactNode;
  session?: Session | null;
}

export function Providers({ children, session }: ProvidersProps) {
  return (
    <SessionProvider
      session={session}
      // Reduce session polling for better performance
      refetchInterval={5 * 60} // 5 minutes
      refetchOnWindowFocus={false}
    >
      <ToastProvider>{children}</ToastProvider>
    </SessionProvider>
  );
}
