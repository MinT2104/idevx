import { prisma } from "@/core/database/db";
import { siteConfig } from "@/core/config/site";

export default async function sitemap() {
  const baseUrl = siteConfig.url.base?.replace(/\/$/, "") || "";

  let blog: Array<{ slug: string; updatedAt: Date | null; status: string }> = [];
  try {
    blog = await prisma.blogPost.findMany({
      select: { slug: true, updatedAt: true, status: true },
      where: { status: "published" },
      orderBy: { updatedAt: "desc" },
    });
  } catch (error) {
    console.warn("Failed to fetch blog posts for sitemap:", error);
    // Use empty array as fallback
    blog = [];
  }

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
