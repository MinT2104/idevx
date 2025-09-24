/**
 * Utility functions for handling model slugs and URLs
 *
 * This module provides utilities for working with slug-based model URLs.
 * Models can now be accessed via both ID-based URLs (/models/[id]) and
 * slug-based URLs (/models/[slug]).
 *
 * Usage examples:
 * - getModelUrl({ slug: "qwen-image", id: "123" }) -> "/models/qwen-image"
 * - getModelUrl({ slug: null, id: "123" }) -> "/models/123"
 * - getModelUrlBySlug("qwen-image") -> "/models/qwen-image"
 *
 * API endpoints:
 * - GET /api/models/slug/[slug] - Get model by slug
 * - GET /api/models/[id] - Get model by ID (existing)
 */

/**
 * Converts a string to a URL-friendly slug
 * @param text - The text to convert to slug
 * @returns URL-friendly slug
 */
export const toSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

/**
 * Generates a slug from model name and brand
 * @param name - Model name
 * @param brand - Model brand
 * @returns Generated slug
 */
export const generateModelSlug = (name: string, brand?: string): string => {
  const baseText = brand ? `${brand}-${name}` : name;
  return toSlug(baseText);
};

/**
 * Creates a model detail URL using slug
 * @param slug - Model slug
 * @returns Model detail URL
 */
export const getModelUrlBySlug = (slug: string): string => {
  return `/models/slug/${slug}`;
};

/**
 * Creates a model detail URL using ID (fallback)
 * @param id - Model ID
 * @returns Model detail URL
 */
export const getModelUrlById = (id: string): string => {
  return `/models/${id}`;
};

/**
 * Gets the appropriate model URL (prefers slug if available)
 * @param model - Model object with slug and id
 * @returns Model detail URL
 */
export const getModelUrl = (model: {
  slug?: string | null;
  id: string;
}): string => {
  return model.slug ? getModelUrlBySlug(model.slug) : getModelUrlById(model.id);
};

/**
 * Extracts slug from model URL
 * @param url - Model URL
 * @returns Slug if found, null otherwise
 */
export const extractSlugFromUrl = (url: string): string | null => {
  const slugMatch = url.match(/\/models\/slug\/([^\/]+)/);
  return slugMatch ? slugMatch[1] : null;
};

/**
 * Checks if a URL is a slug-based model URL
 * @param url - Model URL
 * @returns True if it's a slug-based URL
 */
export const isSlugBasedUrl = (url: string): boolean => {
  return url.includes("/models/slug/");
};
