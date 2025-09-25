"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/core/utils/utils";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Lightbulb,
  Settings,
  PanelsTopLeft,
} from "lucide-react";

type NavigationItem = {
  name: string;
  href: string;
  icon: (props: { className?: string }) => JSX.Element;
  description?: string;
};

const navigationItems: NavigationItem[] = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: (p) => <LayoutDashboard {...p} />,
  },
  { name: "Users", href: "/admin/users", icon: (p) => <Users {...p} /> },
  {
    name: "Models",
    href: "/admin/models",
    icon: (p) => <PanelsTopLeft {...p} />,
  },
  { name: "Blog Posts", href: "/admin/blog", icon: (p) => <BookOpen {...p} /> },
  {
    name: "Solutions",
    href: "/admin/solutions",
    icon: (p) => <Lightbulb {...p} />,
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: (p) => <Settings {...p} />,
  },
];

type AdminSidebarProps = {
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
  collapsed?: boolean;
};

export default function AdminSidebar({
  isOpen: externalIsOpen,
  setIsOpen: externalSetIsOpen,
  collapsed = false,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [internalIsOpen, setInternalIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsOpen = externalSetIsOpen || setInternalIsOpen;

  const closeOnNavigate = (href: string) => {
    // Close only on small screens
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setIsOpen(false);
    }
    router.push(href);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-full transform bg-white border-r border-gray-200 overflow-hidden transition-[transform,width] duration-500 ease-in-out lg:translate-x-0",
          collapsed ? "w-16" : "w-64",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center gap-3 px-4 border-b border-gray-200">
          <div
            className={cn(
              "w-9 h-9 rounded-lg flex items-center justify-center",
              collapsed ? "bg-transparent" : "bg-blue-50"
            )}
          >
            <LayoutDashboard className="w-5 h-5 text-blue-600" />
          </div>
          <div
            className={cn(
              "overflow-hidden transition-[max-width,opacity,transform] duration-400 ease-in-out",
              collapsed ? "max-w-0 opacity-0" : "max-w-[160px] opacity-100"
            )}
            aria-hidden={collapsed}
          >
            <h2 className="text-sm font-semibold tracking-wide text-gray-800 whitespace-nowrap">
              Admin Console
            </h2>
          </div>
        </div>

        <nav className="px-2 py-3 space-y-3">
          {navigationItems.map((item) => {
            const isActive = mounted && pathname && pathname === item.href;
            return (
              <button
                key={item.name}
                onClick={() => closeOnNavigate(item.href)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors duration-150 group h-[36px]",
                  isActive
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-gray-900"
                )}
              >
                {item.icon({
                  className: cn(
                    "w-4 h-4 group-hover:text-blue-500",
                    isActive ? "text-blue-600" : "text-gray-500"
                  ),
                })}
                <div
                  className={cn(
                    "flex-1 text-left overflow-hidden transition-[max-width,opacity,transform] duration-400 ease-in-out",
                    collapsed
                      ? "max-w-0 opacity-0 hidden"
                      : "max-w-[200px] opacity-100"
                  )}
                  aria-hidden={collapsed}
                >
                  <span
                    className={cn(
                      "block truncate text-sm group-hover:text-blue-500",
                      isActive ? "font-medium" : "font-normal",
                      collapsed ? "translate-x-2" : "translate-x-0"
                    )}
                  >
                    {item.name}
                  </span>
                </div>
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
