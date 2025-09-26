import type { Metadata } from "next";
import BlogView from "@/features/blog/view/BlogView";

export const metadata: Metadata = {
  title: "AI Blog - Latest Insights & News | iDevX",
  description:
    "Stay updated with the latest AI insights, industry news, and technical articles from iDevX. Discover trends, best practices, and innovative solutions in artificial intelligence.",
  keywords: [
    "AI blog",
    "artificial intelligence news",
    "AI insights",
    "machine learning articles",
    "AI trends",
    "AI best practices",
    "AI industry news",
    "AI technology",
    "AI innovation",
    "AI research",
  ],
  openGraph: {
    title: "AI Blog - Latest Insights & News | iDevX",
    description:
      "Stay updated with the latest AI insights, industry news, and technical articles from iDevX.",
    type: "website",
    images: [
      {
        url: "/images/og-blog.jpg",
        width: 1200,
        height: 630,
        alt: "AI Blog - Latest Insights & News | iDevX",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Blog - Latest Insights & News | iDevX",
    description:
      "Stay updated with the latest AI insights, industry news, and technical articles from iDevX.",
    images: ["/images/og-blog.jpg"],
  },
  alternates: {
    canonical: "/blog",
  },
};

// Dynamic import for Prisma to avoid build-time issues
const getPrisma = async () => {
  const { prisma } = await import("@/core/database/db");
  return prisma;
};

// Force dynamic rendering to avoid build-time issues
export const dynamic = "force-dynamic";
export const revalidate = 60;

const page = async () => {
  const prisma = await getPrisma();
  const posts = await prisma.blogPost.findMany({
    where: { status: "published" },
    orderBy: { createdAt: "desc" },
  });
  return <BlogView posts={posts as any} />;
};

export default page;
