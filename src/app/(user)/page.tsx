import { Metadata } from "next";
import Hero from "@/features/shared/components/Hero";
// import OurBlog from "@/features/home/components/OurBlog";
// import { headers } from "next/headers";

// Dynamic import for Prisma to avoid build-time issues
const getPrisma = async () => {
  const { prisma } = await import("@/core/database/db");
  return prisma;
};

export const metadata: Metadata = {
  title: "DevX | AI Solutions Built for Your Success",
  description:
    "DevX empowers businesses with domain-focused AI services and innovative products—from Education, Healthcare, and Law Firms to Travel, Food, Enterprises, and Creators.",
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
    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: "desc" },
      take: 4,
    });
    blogs = (posts || []).map((p: any, idx: number) => ({
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
        brand: true,
        logo: true,
        link: true,
      },
    });
    models = items.map((m: any) => ({
      id: m.id,
      name: m.name || m.brand || "Model",
      image: m.logo || "/images/models/idevx.png",
      actionType: "try",
      customModelButtonLink: `/models/${m.id}`,
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

  return <Hero blogs={blogs} models={models} />;
}
