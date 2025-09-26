// Dynamic imports for code splitting
import React, { ComponentType } from "react";
import dynamic from "next/dynamic";

// Heavy components - only load when needed
export const DataTable = dynamic(
  () => import("@/features/admin/components/DataTable"),
  {
    loading: () => {
      return React.createElement("div", {
        className: "animate-pulse bg-gray-200 h-64 rounded",
      });
    },
    ssr: false,
  }
);

export const FeedbackTable = dynamic(
  () => import("@/features/admin/components/FeedbackTable"),
  {
    loading: () => {
      return React.createElement("div", {
        className: "animate-pulse bg-gray-200 h-64 rounded",
      });
    },
    ssr: false,
  }
);

// Utility function for dynamic imports with error boundaries
export const createDynamicComponent = <P extends object>(
  importFunc: () => Promise<{ default: ComponentType<P> }>,
  fallback?: ComponentType<P>
) => {
  return dynamic(importFunc, {
    loading: () => {
      return React.createElement(
        "div",
        {
          className: "animate-pulse bg-gray-200 rounded p-4",
        },
        "Loading..."
      );
    },
    ssr: false,
  });
};

// Preload critical components
export const preloadCriticalComponents = () => {
  if (typeof window !== "undefined") {
    // Preload admin components if user is likely to access them
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    if (isAdmin) {
      import("@/app/(admin)/admin/page");
      import("@/features/admin/components/DataTable");
    }
  }
};
