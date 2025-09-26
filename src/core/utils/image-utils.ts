/**
 * Image optimization utilities
 */

// Common responsive breakpoints
export const BREAKPOINTS = {
  mobile: 640,
  tablet: 768,
  laptop: 1024,
  desktop: 1280,
  wide: 1536,
} as const;

// Generate responsive sizes string for Next.js Image component
export function generateSizes(
  mobile: number = 100,
  tablet: number = 50,
  desktop: number = 33
): string {
  return `(max-width: ${BREAKPOINTS.mobile}px) ${mobile}vw, (max-width: ${BREAKPOINTS.tablet}px) ${tablet}vw, ${desktop}vw`;
}

// Generate device sizes for Next.js config
export function generateDeviceSizes(): number[] {
  return [
    BREAKPOINTS.mobile,
    BREAKPOINTS.tablet,
    BREAKPOINTS.laptop,
    BREAKPOINTS.desktop,
    BREAKPOINTS.wide,
    1920,
    2048,
    3840,
  ];
}

// Generate image sizes for Next.js config
export function generateImageSizes(): number[] {
  return [16, 32, 48, 64, 96, 128, 256, 384, 512, 640, 750, 828, 1080];
}

// Calculate optimal image dimensions based on container
export function calculateImageDimensions(
  containerWidth: number,
  containerHeight: number,
  aspectRatio?: number
): { width: number; height: number } {
  if (aspectRatio) {
    return {
      width: containerWidth,
      height: Math.round(containerWidth / aspectRatio),
    };
  }

  return {
    width: containerWidth,
    height: containerHeight,
  };
}

// Generate blur placeholder data URL
export function generateBlurDataURL(width: number = 10, height: number = 10): string {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    return "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==";
  }

  canvas.width = width;
  canvas.height = height;
  
  // Create a simple gradient blur
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#f3f4f6');
  gradient.addColorStop(1, '#e5e7eb');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  return canvas.toDataURL('image/jpeg', 0.1);
}

// Preload critical images
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

// Check if image is in viewport for lazy loading
export function isInViewport(element: Element): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Generate srcSet for responsive images
export function generateSrcSet(
  baseSrc: string,
  widths: number[] = [640, 750, 828, 1080, 1200, 1920]
): string {
  return widths
    .map(width => `${baseSrc}?w=${width} ${width}w`)
    .join(', ');
}

// Common image quality settings
export const IMAGE_QUALITY = {
  low: 60,
  medium: 75,
  high: 85,
  max: 95,
} as const;

// Common image formats
export const IMAGE_FORMATS = {
  webp: 'image/webp',
  avif: 'image/avif',
  jpeg: 'image/jpeg',
  png: 'image/png',
} as const;
