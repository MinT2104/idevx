import "@/ui/styles/globals.css";

import type { Metadata } from "next";
import { Jost } from "next/font/google";
import { redirect } from "next/navigation";

import { cn } from "@/core/utils/utils";
import { getServerSessionUser } from "@/features/auth/auth-server";
import { ThemeProvider } from "@/features/shared/components/theme-provider";
import { Providers } from "@/features/shared/components/providers";
import { ToastProvider } from "@/ui/components/toast-provider";
import AdminShell from "@/features/admin/components/AdminShell";

const jost = Jost({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-jost",
});

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Admin Dashboard | iDevX",
  description: "Admin panel for iDevX platform",
};

export default async function AdminLayout({ children }: AdminLayoutProps) {
  // Check if user is admin
  const user = await getServerSessionUser();

  console.log(user);
  // If no user or not admin, redirect to login
  if (!user || user.role !== "admin") {
    redirect("/login");
  }

  const session = user
    ? {
        user,
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
      }
    : null;

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        suppressHydrationWarning
        className={cn("min-h-screen bg-gray-50 antialiased", jost.className)}
      >
        <Providers session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ToastProvider>
              <AdminShell user={user}>{children}</AdminShell>
            </ToastProvider>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
