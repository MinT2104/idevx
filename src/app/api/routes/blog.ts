import { Hono } from "hono";
import { z } from "zod";
import { prisma } from "@/core/database/db";
import {
  ALLOWED_BLOG_CATEGORIES,
  areCategoriesValid,
} from "@/features/blog/constants";

const app = new Hono();

const contentSchema = z.object({
  type: z.literal("markdown"),
  body: z.string(),
});
const imageSchema = z.object({
  url: z.string(),
  alt: z.string(),
  width: z.number().optional(),
  height: z.number().optional(),
  mimeType: z.string().optional(),
  blurDataURL: z.string().optional(),
  caption: z.string().optional(),
  focalPoint: z.object({ x: z.number(), y: z.number() }).optional(),
});
const authorSchema = z.object({
  id: z.string(),
  name: z.string(),
  avatar: imageSchema.optional(),
  roleOrTitle: z.string().optional(),
  bio: z.string().optional(),
  url: z.string().optional(),
  socials: z
    .object({
      twitter: z.string().optional(),
      linkedin: z.string().optional(),
      github: z.string().optional(),
      website: z.string().optional(),
    })
    .partial()
    .optional(),
});

const taxonomySchema = z.object({
  categories: z.array(z.string()).nonempty(),
  tags: z.array(z.string()).optional(),
});

const baseSchema = z.object({
  slug: z.string(),
  locale: z.literal("en").optional(),
  title: z.string(),
  subtitle: z.string().optional(),
  excerpt: z.string().optional(),
  heroImage: imageSchema.optional(),
  cardImage: imageSchema.optional(),
  gallery: z.array(imageSchema).optional(),
  taxonomy: taxonomySchema,
  authors: z.array(authorSchema).nonempty(),
  content: contentSchema,
  richMeta: z.record(z.any()).optional(),
  status: z.enum(["draft", "scheduled", "published", "archived"]),
  publishedAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
  scheduledFor: z.string().datetime().optional(),
  reading: z.record(z.any()).optional(),
  featured: z.boolean().optional(),
  pinned: z.boolean().optional(),
  experimental: z.boolean().optional(),
  series: z.record(z.any()).optional(),
  relations: z.record(z.any()).optional(),
  seo: z.record(z.any()).optional(),
  createdBy: z.string().optional(),
  updatedBy: z.string().optional(),
  source: z.literal("markdown").optional(),
});

function validateCategoriesOrThrow(categories: string[]) {
  if (!areCategoriesValid(categories)) {
    throw new Error(
      `Invalid categories. Allowed: ${ALLOWED_BLOG_CATEGORIES.join(", ")}`
    );
  }
}

app.get("/", async (c) => {
  const items = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  });
  return c.json(items);
});

app.get("/:slug", async (c) => {
  const slug = c.req.param("slug");
  const item = await prisma.blogPost.findUnique({ where: { slug } });
  if (!item) return c.json({ message: "Not found" }, 404);
  return c.json(item);
});

// GET /api/blog/:slug/related
app.get("/:slug/related", async (c) => {
  const slug = c.req.param("slug");
  const limitParam = c.req.query("limit");
  const limit = Math.min(12, Math.max(1, Number(limitParam) || 6));

  const item = await prisma.blogPost.findUnique({ where: { slug } });
  if (!item) return c.json({ message: "Not found" }, 404);

  const relations = (item.relations as any) || {};
  let related = [] as any[];

  if (
    Array.isArray(relations.relatedSlugs) &&
    relations.relatedSlugs.length > 0
  ) {
    related = await prisma.blogPost.findMany({
      where: { slug: { in: relations.relatedSlugs, not: slug } },
      take: limit,
      orderBy: { createdAt: "desc" },
    });
  }

  // Fallback: same primary category if explicit related not provided or insufficient
  if (related.length < limit) {
    const needed = limit - related.length;
    const taxonomy = (item.taxonomy as any) || {};
    const primaryCategory: string | undefined = Array.isArray(
      taxonomy.categories
    )
      ? taxonomy.categories[0]
      : undefined;

    if (primaryCategory) {
      const sameCategory = await prisma.blogPost.findMany({
        where: {
          slug: { notIn: [slug, ...related.map((r: any) => r.slug)] },
          // Mongo Prisma filter for JSON: use equals on object structure; we store taxonomy as Json
          // We'll fetch more and filter in memory due to limitations
        },
        take: needed * 3, // overfetch then filter
        orderBy: { createdAt: "desc" },
      });

      const filtered = sameCategory.filter((p: any) => {
        const t = (p.taxonomy as any) || {};
        const cat = Array.isArray(t.categories) ? t.categories[0] : undefined;
        return cat === primaryCategory;
      });

      related = [...related, ...filtered.slice(0, needed)];
    }
  }

  return c.json(related.slice(0, limit));
});

app.post("/", async (c) => {
  const body = await c.req.json();
  const parsed = baseSchema.parse(body);
  validateCategoriesOrThrow(parsed.taxonomy.categories);

  const created = await prisma.blogPost.create({
    data: {
      slug: parsed.slug,
      locale: "en",
      title: parsed.title,
      subtitle: parsed.subtitle,
      excerpt: parsed.excerpt,
      heroImage: parsed.heroImage ?? null,
      cardImage: parsed.cardImage ?? null,
      gallery: parsed.gallery ?? null,
      taxonomy: parsed.taxonomy,
      authors: parsed.authors,
      content: parsed.content,
      richMeta: parsed.richMeta ?? null,
      status: parsed.status,
      publishedAt: parsed.publishedAt ? new Date(parsed.publishedAt) : null,
      scheduledFor: parsed.scheduledFor ? new Date(parsed.scheduledFor) : null,
      reading: parsed.reading ?? null,
      featured: parsed.featured ?? false,
      pinned: parsed.pinned ?? false,
      experimental: parsed.experimental ?? false,
      series: parsed.series ?? null,
      relations: parsed.relations ?? null,
      seo: parsed.seo ?? null,
      createdBy: parsed.createdBy ?? null,
      updatedBy: parsed.updatedBy ?? null,
      source: "markdown",
    },
  });
  return c.json(created, 201);
});

app.patch("/:slug", async (c) => {
  const slug = c.req.param("slug");
  const body = await c.req.json();
  const parsed = baseSchema.partial().parse(body);
  if (parsed.taxonomy?.categories)
    validateCategoriesOrThrow(parsed.taxonomy.categories);

  const updated = await prisma.blogPost.update({
    where: { slug },
    data: {
      ...parsed,
      publishedAt: parsed.publishedAt
        ? new Date(parsed.publishedAt)
        : undefined,
      scheduledFor: parsed.scheduledFor
        ? new Date(parsed.scheduledFor)
        : undefined,
    },
  });
  return c.json(updated);
});

app.delete("/:slug", async (c) => {
  const slug = c.req.param("slug");
  await prisma.blogPost.delete({ where: { slug } });
  return c.json({ ok: true });
});

export default app;
