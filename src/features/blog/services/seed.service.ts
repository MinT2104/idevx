import { seedPosts } from "@/features/blog/data/seedPosts";
import {
  areCategoriesValid,
  normalizePrimaryCategory,
} from "@/features/blog/constants";

// Dynamic import for Prisma to avoid build-time issues
const getPrisma = async () => {
  const { prisma } = await import("@/core/database/db");
  return prisma;
};

function mapToAllowedCategory(category: string): string {
  const trimmed = (category || "").trim();
  const mapping: Record<string, string> = {
    Applications: "AI Engineering",
    Research: "Foundation",
    Security: "Infrastructure",
    Ethics: "Foundation",
  };
  return mapping[trimmed] || trimmed;
}

export async function seedBlogPosts() {
  const prisma = await getPrisma();
  const results = [] as any[];
  const skipped: Array<{ slug: string; reason: string }> = [];
  let createdCount = 0;
  let updatedCount = 0;

  for (const p of seedPosts) {
    const rawPrimary = normalizePrimaryCategory(p.taxonomy.categories);
    const primary = normalizePrimaryCategory([
      mapToAllowedCategory(rawPrimary),
    ]);
    if (!primary) {
      skipped.push({ slug: p.slug, reason: "Invalid category" });
      continue;
    }
    const sanitized = {
      ...p,
      taxonomy: { ...p.taxonomy, categories: [primary] },
      locale: "en" as const,
      source: "markdown" as const,
    } as typeof p;

    if (!areCategoriesValid(sanitized.taxonomy.categories)) {
      skipped.push({ slug: p.slug, reason: "Category validation failed" });
      continue;
    }

    try {
      const existing = await prisma.blogPost.findUnique({
        where: { slug: p.slug },
      });
      const created = await prisma.blogPost.upsert({
        where: { slug: p.slug },
        update: { ...sanitized, updatedAt: undefined } as any,
        create: {
          ...sanitized,
          publishedAt: p.publishedAt ? new Date(p.publishedAt) : null,
          scheduledFor: p.scheduledFor ? new Date(p.scheduledFor) : null,
        } as any,
      });
      results.push(created);
      if (existing) updatedCount += 1;
      else createdCount += 1;
    } catch (e) {
      console.error("Seed blog error for", p.slug, e);
      skipped.push({ slug: p.slug, reason: (e as Error).message });
    }
  }
  return {
    createdCount,
    updatedCount,
    total: results.length,
    skipped,
    posts: results,
  };
}
