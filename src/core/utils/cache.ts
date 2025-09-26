// Caching utilities for performance optimization
import { cache } from "react";

// In-memory cache for server components
const memoryCache = new Map<
  string,
  { data: any; timestamp: number; ttl: number }
>();

// Cache configuration
const CACHE_TTL = {
  SHORT: 5 * 60 * 1000, // 5 minutes
  MEDIUM: 30 * 60 * 1000, // 30 minutes
  LONG: 60 * 60 * 1000, // 1 hour
  VERY_LONG: 24 * 60 * 60 * 1000, // 24 hours
};

// Generic cache function
export const getCachedData = <T>(key: string): T | null => {
  const cached = memoryCache.get(key);
  if (!cached) return null;

  const now = Date.now();
  if (now - cached.timestamp > cached.ttl) {
    memoryCache.delete(key);
    return null;
  }

  return cached.data;
};

export const setCachedData = <T>(
  key: string,
  data: T,
  ttl: number = CACHE_TTL.MEDIUM
): void => {
  memoryCache.set(key, {
    data,
    timestamp: Date.now(),
    ttl,
  });
};

// React cache for server components
export const getCachedModels = cache(async () => {
  const { prisma } = await import("@/core/database/db");
  return prisma.model.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
});

export const getCachedBlogPosts = cache(async () => {
  const { prisma } = await import("@/core/database/db");
  return prisma.blogPost.findMany({
    where: {
      status: "published",
    },
    orderBy: {
      createdAt: "desc",
    },
  });
});

export const getCachedSolutions = cache(async () => {
  const { prisma } = await import("@/core/database/db");
  return prisma.solution.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
});

export const getCachedModelBySlug = cache(async (slug: string) => {
  const { prisma } = await import("@/core/database/db");
  return prisma.model.findUnique({
    where: { slug },
  });
});

export const getCachedBlogPostBySlug = cache(async (slug: string) => {
  const { prisma } = await import("@/core/database/db");
  return prisma.blogPost.findUnique({
    where: { slug },
  });
});

export const getCachedSolutionBySlug = cache(async (slug: string) => {
  const { prisma } = await import("@/core/database/db");
  return prisma.solution.findFirst({
    where: { id: slug },
  });
});

// Cache invalidation
export const invalidateCache = (pattern?: string) => {
  if (pattern) {
    const keys = Array.from(memoryCache.keys()).filter((key) =>
      key.includes(pattern)
    );
    keys.forEach((key) => memoryCache.delete(key));
  } else {
    memoryCache.clear();
  }
};

// Specific cache invalidation functions
export const invalidateModelCache = () => {
  invalidateCache("models_");
  invalidateCache("model_slug_");
  invalidateCache("model_id_");
  console.log("Model cache invalidated");
};

export const invalidateBlogCache = () => {
  invalidateCache("blog_");
  invalidateCache("blogpost_");
  console.log("Blog cache invalidated");
};

export const invalidateSolutionCache = () => {
  invalidateCache("solution_");
  console.log("Solution cache invalidated");
};

export const invalidateAllCache = () => {
  memoryCache.clear();
  browserCache.clear();
  console.log("All cache invalidated");
};

// Cache statistics
export const getCacheStats = () => {
  const now = Date.now();
  let validEntries = 0;
  let expiredEntries = 0;

  memoryCache.forEach((entry) => {
    if (now - entry.timestamp > entry.ttl) {
      expiredEntries++;
    } else {
      validEntries++;
    }
  });

  return {
    totalEntries: memoryCache.size,
    validEntries,
    expiredEntries,
    memoryUsage: JSON.stringify(Array.from(memoryCache.entries())).length,
  };
};

// Browser cache utilities
export const browserCache = {
  set: (key: string, data: any, ttl: number = CACHE_TTL.MEDIUM) => {
    if (typeof window === "undefined") return;

    const item = {
      data,
      timestamp: Date.now(),
      ttl,
    };

    try {
      localStorage.setItem(`cache_${key}`, JSON.stringify(item));
    } catch (error) {
      console.warn("Failed to cache data:", error);
    }
  },

  get: <T>(key: string): T | null => {
    if (typeof window === "undefined") return null;

    try {
      const cached = localStorage.getItem(`cache_${key}`);
      if (!cached) return null;

      const item = JSON.parse(cached);
      const now = Date.now();

      if (now - item.timestamp > item.ttl) {
        localStorage.removeItem(`cache_${key}`);
        return null;
      }

      return item.data;
    } catch (error) {
      console.warn("Failed to retrieve cached data:", error);
      return null;
    }
  },

  remove: (key: string) => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(`cache_${key}`);
  },

  clear: () => {
    if (typeof window === "undefined") return;

    const keys = Object.keys(localStorage).filter((key) =>
      key.startsWith("cache_")
    );
    keys.forEach((key) => localStorage.removeItem(key));
  },
};

// Cache warming
export const warmCache = async () => {
  try {
    // Pre-fetch critical data
    await Promise.all([
      getCachedModels(),
      getCachedBlogPosts(),
      getCachedSolutions(),
    ]);

    console.log("Cache warmed successfully");
  } catch (error) {
    console.error("Failed to warm cache:", error);
  }
};

// Cache cleanup
export const cleanupExpiredCache = () => {
  const now = Date.now();
  const expiredKeys: string[] = [];

  memoryCache.forEach((entry, key) => {
    if (now - entry.timestamp > entry.ttl) {
      expiredKeys.push(key);
    }
  });

  expiredKeys.forEach((key) => memoryCache.delete(key));

  if (expiredKeys.length > 0) {
    console.log(`Cleaned up ${expiredKeys.length} expired cache entries`);
  }
};

// Auto cleanup every 5 minutes
if (typeof window !== "undefined") {
  setInterval(cleanupExpiredCache, 5 * 60 * 1000);
}
