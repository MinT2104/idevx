export const ALLOWED_BLOG_CATEGORIES = [
  "Model Performance",
  "AI Engineering",
  "Infrastructure",
  "News",
  "Community",
  "AI Models",
  "AI Model",
  "Foundation",
] as const;

export type AllowedBlogCategory = (typeof ALLOWED_BLOG_CATEGORIES)[number];

export function areCategoriesValid(categories: string[]): boolean {
  if (!Array.isArray(categories) || categories.length === 0) return false;
  return categories.every((c) =>
    (ALLOWED_BLOG_CATEGORIES as readonly string[]).includes(c)
  );
}

export function normalizePrimaryCategory(categories: string[]): string {
  if (!categories || categories.length === 0) return "";
  const primary = categories[0];
  return (ALLOWED_BLOG_CATEGORIES as readonly string[]).includes(primary)
    ? primary
    : "";
}
