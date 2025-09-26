// Cache invalidation utilities for admin operations
import {
  invalidateModelCache,
  invalidateBlogCache,
  invalidateSolutionCache,
  invalidateAllCache,
} from "./cache";

// Call this function after any admin operation that modifies data
export const invalidateCacheAfterOperation = async (
  type: "model" | "blog" | "solution" | "all"
) => {
  try {
    // Invalidate local cache
    switch (type) {
      case "model":
        invalidateModelCache();
        break;
      case "blog":
        invalidateBlogCache();
        break;
      case "solution":
        invalidateSolutionCache();
        break;
      case "all":
        invalidateAllCache();
        break;
    }

    // Call revalidation API to clear Next.js cache
    if (typeof window !== "undefined") {
      // Client-side: call API
      await fetch("/api/revalidate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type }),
      });
    } else {
      // Server-side: import and call directly
      const { revalidatePath, revalidateTag } = await import("next/cache");

      switch (type) {
        case "model":
          revalidateTag("models");
          revalidatePath("/models");
          break;
        case "blog":
          revalidateTag("blog");
          revalidatePath("/blog");
          break;
        case "solution":
          revalidateTag("solutions");
          revalidatePath("/solution");
          break;
        case "all":
          revalidateTag("all");
          revalidatePath("/");
          revalidatePath("/models");
          revalidatePath("/blog");
          revalidatePath("/solution");
          break;
      }
    }

    console.log(`Cache invalidated for type: ${type}`);
  } catch (error) {
    console.error("Failed to invalidate cache:", error);
  }
};

// Hook for React components
export const useCacheInvalidation = () => {
  const invalidateModel = () => invalidateCacheAfterOperation("model");
  const invalidateBlog = () => invalidateCacheAfterOperation("blog");
  const invalidateSolution = () => invalidateCacheAfterOperation("solution");
  const invalidateAll = () => invalidateCacheAfterOperation("all");

  return {
    invalidateModel,
    invalidateBlog,
    invalidateSolution,
    invalidateAll,
  };
};
