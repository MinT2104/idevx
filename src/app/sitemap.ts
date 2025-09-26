// app/sitemap.ts
import { MetadataRoute } from "next";
import { siteConfig } from "@/core/config/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url.base?.replace(/\/$/, "") || "";

  // Static pages
  const staticPages = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/models`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/refund`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/partner`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/talk-to-us`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ];

  try {
    // Dynamic blog posts
    const { prisma } = await import("@/core/database/db");
    const blogPosts = await prisma.blogPost.findMany({
      where: { status: "published" },
      select: { slug: true, updatedAt: true },
    });

    const blogPages = blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt || new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

    // Dynamic models
    const models = await prisma.model.findMany({
      where: { status: "active" },
      select: { slug: true, updatedAt: true },
    });

    const modelPages = models.map((model) => ({
      url: `${baseUrl}/models/${model.slug}`,
      lastModified: model.updatedAt || new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

    // Dynamic solutions
    const solutions = await prisma.solution.findMany({
      select: { key: true, updatedAt: true },
    });

    const solutionPages = solutions.map((solution) => ({
      url: `${baseUrl}/solution/${solution.key}`,
      lastModified: solution.updatedAt || new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

    return [...staticPages, ...blogPages, ...modelPages, ...solutionPages];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return staticPages;
  }
}
