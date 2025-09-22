import { MetadataRoute } from "next";
import { prisma } from "@/core/database/db";
import { siteConfig } from "@/core/config/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url.base?.replace(/\/$/, "") || "";

  let blog: Array<{ slug: string; updatedAt: Date | null }> = [];
  try {
    blog = await prisma.blogPost.findMany({
      select: { slug: true, updatedAt: true },
      where: { status: "published" },
      orderBy: { updatedAt: "desc" },
    });
  } catch (error) {
    console.warn("Failed to fetch blog posts for sitemap:", error);
  }

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/models",
    "/blog",
    "/privacy",
    "/terms",
    "/refund",
  ].map((path) => ({
    url: `${baseUrl}${path || "/"}`,
    lastModified: new Date(),
  }));

  const blogRoutes: MetadataRoute.Sitemap = blog.map((b) => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified: b.updatedAt || new Date(),
  }));

  return [...staticRoutes, ...blogRoutes];
}
