"use client";

import { Suspense, lazy, ComponentType } from "react";
import { motion } from "framer-motion";
import LoadingTransition from "./PageTransition";

interface LazyPageProps {
  component: () => Promise<{ default: ComponentType<any> }>;
  fallback?: React.ReactNode;
  className?: string;
}

const defaultFallback = (
  <LoadingTransition>
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full mx-auto mb-4"
        />
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  </LoadingTransition>
);

export default function LazyPage({
  component,
  fallback = defaultFallback,
  className = "",
}: LazyPageProps) {
  const LazyComponent = lazy(component);

  return (
    <div className={className}>
      <Suspense fallback={fallback}>
        <LazyComponent />
      </Suspense>
    </div>
  );
}

// Predefined lazy components for common pages
export const LazyHomePage = lazy(() => import("@/app/(user)/page"));
export const LazyModelsPage = lazy(() => import("@/app/(user)/models/page"));
export const LazyBlogPage = lazy(() => import("@/app/(user)/blog/page"));
export const LazyModelDetailPage = lazy(
  () => import("@/app/(user)/models/[slug]/page")
);
export const LazyBlogDetailPage = lazy(
  () => import("@/app/(user)/blog/[slug]/page")
);
export const LazySolutionDetailPage = lazy(
  () => import("@/app/(user)/solution/[slug]/page")
);

// Admin pages
export const LazyAdminDashboard = lazy(
  () => import("@/app/(admin)/admin/page")
);
export const LazyAdminModels = lazy(
  () => import("@/app/(admin)/admin/models/page")
);
export const LazyAdminBlog = lazy(
  () => import("@/app/(admin)/admin/blog/page")
);
export const LazyAdminSolutions = lazy(
  () => import("@/app/(admin)/admin/solutions/page")
);
export const LazyAdminFeedback = lazy(
  () => import("@/app/(admin)/admin/feedback/page")
);
export const LazyAdminNewsletter = lazy(
  () => import("@/app/(admin)/admin/newsletter/page")
);
export const LazyAdminSettings = lazy(
  () => import("@/app/(admin)/admin/settings/page")
);

// Utility function to create lazy page with custom loading
export function createLazyPage(
  component: () => Promise<{ default: ComponentType<any> }>,
  customFallback?: React.ReactNode
) {
  return function LazyPageWrapper(props: any) {
    return (
      <LazyPage component={component} fallback={customFallback} {...props} />
    );
  };
}
