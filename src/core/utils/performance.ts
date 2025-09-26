"use client";
// Performance utilities and monitoring
import { useEffect, useCallback, useRef, useState } from "react";

// Performance monitoring
export const performanceMonitor = {
  // Measure component render time
  measureRender: (componentName: string) => {
    const start = performance.now();
    return () => {
      const end = performance.now();
      console.log(`${componentName} render time: ${end - start}ms`);
    };
  },

  // Measure API call performance
  measureApiCall: async <T>(
    apiCall: () => Promise<T>,
    endpoint: string
  ): Promise<T> => {
    const start = performance.now();
    try {
      const result = await apiCall();
      const end = performance.now();
      console.log(`API ${endpoint} took: ${end - start}ms`);
      return result;
    } catch (error) {
      const end = performance.now();
      console.error(`API ${endpoint} failed after: ${end - start}ms`, error);
      throw error;
    }
  },

  // Measure database query performance
  measureDbQuery: async <T>(
    query: () => Promise<T>,
    queryName: string
  ): Promise<T> => {
    const start = performance.now();
    try {
      const result = await query();
      const end = performance.now();
      console.log(`DB Query ${queryName} took: ${end - start}ms`);
      return result;
    } catch (error) {
      const end = performance.now();
      console.error(
        `DB Query ${queryName} failed after: ${end - start}ms`,
        error
      );
      throw error;
    }
  },
};

// Debounce hook for performance
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Throttle hook for performance
export const useThrottle = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T => {
  const lastRun = useRef(Date.now());

  return useCallback(
    ((...args) => {
      if (Date.now() - lastRun.current >= delay) {
        callback(...args);
        lastRun.current = Date.now();
      }
    }) as T,
    [callback, delay]
  );
};

// Intersection Observer hook for lazy loading
export const useIntersectionObserver = (
  options: IntersectionObserverInit = {}
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting && !hasIntersected) {
          setHasIntersected(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [options, hasIntersected]);

  return { ref, isIntersecting, hasIntersected };
};

// Virtual scrolling hook
export const useVirtualScroll = (
  itemHeight: number,
  containerHeight: number,
  itemCount: number
) => {
  const [scrollTop, setScrollTop] = useState(0);

  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / itemHeight) + 1,
    itemCount
  );

  const visibleItems = Array.from(
    { length: endIndex - startIndex },
    (_, i) => startIndex + i
  );

  const totalHeight = itemCount * itemHeight;
  const offsetY = startIndex * itemHeight;

  return {
    visibleItems,
    totalHeight,
    offsetY,
    setScrollTop,
  };
};

// Memory usage monitoring
export const useMemoryMonitor = () => {
  const [memoryInfo, setMemoryInfo] = useState<{
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
  } | null>(null);

  useEffect(() => {
    const updateMemoryInfo = () => {
      if ("memory" in performance) {
        const memory = (performance as any).memory;
        setMemoryInfo({
          usedJSHeapSize: memory.usedJSHeapSize,
          totalJSHeapSize: memory.totalJSHeapSize,
          jsHeapSizeLimit: memory.jsHeapSizeLimit,
        });
      }
    };

    updateMemoryInfo();
    const interval = setInterval(updateMemoryInfo, 5000);

    return () => clearInterval(interval);
  }, []);

  return memoryInfo;
};

// Bundle size analyzer
export const analyzeBundleSize = () => {
  if (typeof window !== "undefined" && "performance" in window) {
    const navigation = performance.getEntriesByType(
      "navigation"
    )[0] as PerformanceNavigationTiming;
    const resources = performance.getEntriesByType(
      "resource"
    ) as PerformanceResourceTiming[];

    const jsResources = resources.filter((r) => r.name.includes(".js"));
    const cssResources = resources.filter((r) => r.name.includes(".css"));
    const imageResources = resources.filter(
      (r) =>
        r.name.includes(".jpg") ||
        r.name.includes(".png") ||
        r.name.includes(".webp")
    );

    const totalJS = jsResources.reduce((sum, r) => sum + r.transferSize, 0);
    const totalCSS = cssResources.reduce((sum, r) => sum + r.transferSize, 0);
    const totalImages = imageResources.reduce(
      (sum, r) => sum + r.transferSize,
      0
    );

    console.log("Bundle Analysis:", {
      totalJS: `${(totalJS / 1024).toFixed(2)} KB`,
      totalCSS: `${(totalCSS / 1024).toFixed(2)} KB`,
      totalImages: `${(totalImages / 1024).toFixed(2)} KB`,
      totalSize: `${((totalJS + totalCSS + totalImages) / 1024).toFixed(2)} KB`,
      loadTime: `${navigation.loadEventEnd - navigation.fetchStart}ms`,
    });
  }
};

// Preload critical resources
export const preloadCriticalResources = () => {
  if (typeof window !== "undefined") {
    // Preload critical fonts
    const fontLink = document.createElement("link");
    fontLink.rel = "preload";
    fontLink.href = "/fonts/Neuropolitical Rg.otf";
    fontLink.as = "font";
    fontLink.type = "font/otf";
    fontLink.crossOrigin = "anonymous";
    document.head.appendChild(fontLink);

    // Preload critical images
    const criticalImages = ["/images/logo.png", "/images/logo_white.png"];

    criticalImages.forEach((src) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.href = src;
      link.as = "image";
      document.head.appendChild(link);
    });
  }
};

// Service Worker registration for caching
export const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js");
      console.log("Service Worker registered:", registration);
    } catch (error) {
      console.error("Service Worker registration failed:", error);
    }
  }
};
