import "@/ui/styles/globals.css";

import type { Metadata } from "next";
import { Jost } from "next/font/google";

import { cn } from "@/core/utils/utils";
import { ThemeProvider } from "@/features/shared/components/theme-provider";
import { Providers } from "@/features/shared/components/providers";

const jost = Jost({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-jost",
});

interface AdminLoginLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Admin Login | iDevX",
  description: "Admin login for iDevX platform",
};

export default function AdminLoginLayout({ children }: AdminLoginLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        suppressHydrationWarning
        className={cn("min-h-screen bg-gray-50 antialiased", jost.className)}
      >
        <Providers session={null}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
