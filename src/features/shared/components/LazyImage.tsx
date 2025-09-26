"use client";

import { useState, useRef, useEffect } from "react";
import OptimizedImage from "./OptimizedImage";

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
  quality?: number;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  threshold?: number;
  rootMargin?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export default function LazyImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  sizes,
  fill = false,
  quality,
  placeholder = "empty",
  blurDataURL,
  threshold = 0.1,
  rootMargin = "50px",
  onLoad,
  onError,
}: LazyImageProps) {
  const [isVisible, setIsVisible] = useState(priority);
  const [hasLoaded, setHasLoaded] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority || isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority, isVisible, threshold, rootMargin]);

  const handleLoad = () => {
    setHasLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasLoaded(true);
    onError?.();
  };

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {!isVisible ? (
        // Placeholder while not visible
        <div
          className="bg-gray-200 animate-pulse w-full h-full"
          style={{ width, height }}
        ></div>
      ) : (
        <OptimizedImage
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={className}
          priority={priority}
          sizes={sizes}
          fill={fill}
          quality={quality}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </div>
  );
}
