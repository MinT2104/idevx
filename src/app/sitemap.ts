import { prisma } from "@/core/database/db";
import { siteConfig } from "@/core/config/site";

export default async function sitemap() {
  const baseUrl = siteConfig.url.base?.replace(/\/$/, "") || "";

  const blog = await prisma.blogPost.findMany({
    select: { slug: true, updatedAt: true, status: true },
    where: { status: "published" },
    orderBy: { updatedAt: "desc" },
  });

  const staticRoutes = [
    "",
    "/models",
    "/blog",
    "/privacy",
    "/terms",
    "/refund",
  ].map((path) => ({
    url: `${baseUrl}${path || "/"}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const blogRoutes = blog.map((b) => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified: b.updatedAt || new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...blogRoutes];
}
