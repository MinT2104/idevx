import Hero from "@/features/shared/components/Hero";
import { Metadata } from "next";
import { Suspense } from "react";

const getPrisma = async () => {
  const { prisma } = await import("@/core/database/db");
  return prisma;
};

export const metadata: Metadata = {
  title: "iDevX - AI Solutions for Business Success",
  description:
    "iDevX empowers businesses with domain-focused AI services and innovative products. From Education, Healthcare, and Law Firms to Travel, Food, Enterprises, and Creators - we deliver cutting-edge AI solutions tailored to your industry needs.",
  keywords: [
    "AI solutions",
    "artificial intelligence",
    "business AI",
    "AI for education",
    "AI for healthcare",
    "AI for legal",
    "AI for travel",
    "AI models",
    "machine learning",
    "automation",
    "business intelligence",
    "AI consulting",
    "custom AI development",
    "AI integration",
    "enterprise AI",
  ],
  openGraph: {
    title: "iDevX - AI Solutions for Business Success",
    description:
      "Empowering businesses with domain-focused AI services and innovative products tailored to your industry needs.",
    type: "website",
    locale: "en_US",
    siteName: "iDevX",
    images: [
      {
        url: "/images/og-homepage.jpg",
        width: 1200,
        height: 630,
        alt: "iDevX - AI Solutions for Business Success",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "iDevX - AI Solutions for Business Success",
    description:
      "Empowering businesses with domain-focused AI services and innovative products tailored to your industry needs.",
    images: ["/images/og-homepage.jpg"],
    creator: "@idevx",
  },
  alternates: {
    canonical: "/",
  },
};

// Force dynamic rendering to avoid build-time issues
export const dynamic = "force-dynamic";

export default async function Home() {
  // Server-render: fetch latest posts and map to OurBlog props
  let blogs: Array<{
    id: string;
    title: string;
    description: string;
    logo: string;
    logoAlt: string;
    buttonText?: string;
    slug: string;
  }> = [];
  try {
    const prisma = await getPrisma();

    // First, try to get featured posts
    let featuredPosts = await prisma.blogPost.findMany({
      where: {
        featured: true,
        status: "published",
      },
      orderBy: { createdAt: "desc" },
      take: 4,
    });

    // If we don't have enough featured posts, fill with regular posts
    if (featuredPosts.length < 4) {
      const remainingCount = 4 - featuredPosts.length;
      const featuredSlugs = featuredPosts.map((p) => p.slug);

      const regularPosts = await prisma.blogPost.findMany({
        where: {
          status: "published",
          slug: { notIn: featuredSlugs },
        },
        orderBy: { createdAt: "desc" },
        take: remainingCount,
      });

      featuredPosts = [...featuredPosts, ...regularPosts];
    }

    blogs = (featuredPosts || []).map((p: any, idx: number) => ({
      id: p.slug || String(idx),
      title: p.title || "",
      description: p.excerpt || p.subtitle || "",
      logo: p.cardImage?.url || p.heroImage?.url || "",
      logoAlt: p.title || "",
      buttonText: "Read More",
      slug: p.slug || "",
    }));
  } catch (e) {
    blogs = [];
  }

  // Server-render: fetch models via Prisma
  let models: Array<{
    id: string;
    name: string;
    image: string;
    actionType?: "try" | "explore";
    customModelButtonLink?: string;
  }> = [];
  try {
    const prisma = await getPrisma();
    const items = await prisma.model.findMany({
      orderBy: { createdAt: "desc" },
      take: 4,
      select: {
        id: true,
        name: true,
        logo: true,
        slug: true,
      },
    });
    models = items.map((m: any) => ({
      id: m.id,
      name: m.name || m.brand || "Model",
      image: m.logo || "/images/models/idevx.png",
      slug: m.slug,
      actionType: "try",
      customModelButtonLink: `/models/${m.slug}`,
    }));
    models.push({
      id: "explore-more",
      name: "Explore more models",
      image: "/images/models/idevx.png",
      actionType: "explore",
      customModelButtonLink: "/models",
    });
  } catch (e) {
    models = [];
  }

  // Server-render: fetch testimonials (active, ordered)
  let testimonials: any[] = [];
  try {
    const prisma = await getPrisma();
    const items = await prisma.testimonial.findMany({
      where: { status: "active" },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      take: 6,
      select: {
        id: true,
        type: true,
        statistic: true,
        quote: true,
        client: true,
        company: true,
        order: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    testimonials = items.map((t: any) => ({
      id: t.id,
      type: t.type,
      // Only include the relevant union branch
      statistic:
        t.type === "statistic" && t.statistic
          ? {
              value: String(t.statistic.value || ""),
              description: String(t.statistic.description || ""),
            }
          : undefined,
      quote:
        t.type === "quote" && t.quote
          ? {
              text: String(t.quote.text || ""),
              person: String(t.quote.person || ""),
              position: String(t.quote.position || ""),
              image: t.quote.image ? String(t.quote.image) : undefined,
            }
          : undefined,
      company: {
        name: String(t.company?.name || ""),
        logo: String(t.company?.logo || ""),
        imageClass: String(t.company?.imageClass || "w-auto h-5"),
      },
      client:
        t.client && (t.client.name || t.client.logo)
          ? {
              name: String(t.client.name || ""),
              logo: String(t.client.logo || ""),
            }
          : undefined,
      order: typeof t.order === "number" ? t.order : undefined,
      status: t.status,
      createdAt: t.createdAt,
      updatedAt: t.updatedAt,
    }));
  } catch (e) {
    testimonials = [];
  }

  return <Hero blogs={blogs} models={models} testimonials={testimonials} />;
}
