"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "@/features/admin/components/AdminSidebar";
import AdminHeader from "@/features/admin/components/AdminHeader";
import { cn } from "@/core/utils/utils";

type AdminUser = {
  id: string;
  name: string | null | undefined;
  email: string | null | undefined;
  image: string | null | undefined;
  role: string | undefined;
};

interface AdminShellProps {
  user: AdminUser;
  children: React.ReactNode;
}

export default function AdminShell({ user, children }: AdminShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <div className="relative min-h-screen bg-gray-50">
      <AdminSidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        collapsed={isCollapsed}
      />

      <AdminHeader
        user={user}
        onToggleSidebar={() => setIsSidebarOpen((v) => !v)}
        isSidebarOpen={isSidebarOpen}
        isCollapsed={isCollapsed}
        onToggleCollapsed={() => setIsCollapsed((v) => !v)}
      />

      <div
        className={cn(
          "transition-[padding] duration-300 ease-in-out",
          // Top padding for fixed header height
          "pt-16",
          // Left padding to avoid fixed sidebar on large screens
          mounted && isCollapsed ? "lg:pl-16" : "lg:pl-64"
        )}
      >
        <main className="min-h-[calc(100vh-4rem)] overflow-x-hidden p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
