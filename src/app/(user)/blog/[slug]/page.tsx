import BlogDetailView from "@/features/blog/view/BlogDetailView";
import { notFound } from "next/navigation";
import StructuredData from "@/features/shared/components/StructuredData";

// Force dynamic rendering to avoid build-time issues
export const dynamic = "force-dynamic";
export const revalidate = 60;

const page = async ({ params }: { params: { slug: string } }) => {
  const { prisma } = await import("@/core/database/db");
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug },
  });

  // If post doesn't exist or status is not published, show 404
  if (!post || post.status !== "published") {
    notFound();
  }
  const relations = (post?.relations as any) || {};
  let related: any[] = [];

  if (relations.relatedSlugs && Array.isArray(relations.relatedSlugs)) {
    related = await prisma.blogPost.findMany({
      where: {
        slug: { in: relations.relatedSlugs || [] },
        status: "published", // Only published posts
      },
    });
  }

  // Fallback: same primary category, excluding current and already selected
  if (post && related.length < 6) {
    const taxonomy = (post.taxonomy as any) || {};
    const primaryCategory: string | undefined = Array.isArray(
      taxonomy.categories
    )
      ? taxonomy.categories[0]
      : undefined;
    if (primaryCategory) {
      const excludeSlugs = new Set<string>([
        post.slug,
        ...related.map((r: any) => r.slug),
      ]);
      const more = await prisma.blogPost.findMany({
        where: {
          // cannot easily filter JSON category with Mongo + Prisma; overfetch and filter in memory
          slug: { notIn: Array.from(excludeSlugs) },
          status: "published", // Only published posts
        },
        orderBy: { createdAt: "desc" },
        take: 24,
      });
      const filtered = more.filter((p: any) => {
        const t = (p.taxonomy as any) || {};
        const cat = Array.isArray(t.categories) ? t.categories[0] : undefined;
        return cat === primaryCategory && !excludeSlugs.has(p.slug);
      });
      related = [...related, ...filtered].slice(0, 6);
    }
  }
  return (
    <>
      <StructuredData
        type="article"
        data={{
          headline: post.title,
          description: post.excerpt || post.subtitle,
          image: (post.cardImage as any)?.url || (post.heroImage as any)?.url,
          datePublished: post.createdAt,
          dateModified: post.updatedAt,
          author: {
            "@type": "Person",
            name: (post.authors as any)?.[0]?.name || "iDevX Team",
          },
          publisher: {
            "@type": "Organization",
            name: "iDevX",
            logo: {
              "@type": "ImageObject",
              url: "/images/logo.png",
            },
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${process.env.NEXT_PUBLIC_APP_URL}/blog/${post.slug}`,
          },
        }}
      />
      <BlogDetailView post={post as any} related={related as any} />
    </>
  );
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { prisma } = await import("@/core/database/db");
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug },
  });

  // If post doesn't exist or status is not published, return basic metadata
  if (!post || post.status !== "published") {
    return { title: "Not Found" } as any;
  }
  const seo = (post.seo as any) || {};
  const title = seo.metaTitle || post.title;
  const description =
    seo.metaDescription || post.excerpt || post.subtitle || undefined;
  const images = seo.ogImage?.url ? [seo.ogImage.url] : undefined;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images,
    },
    twitter: {
      card: seo.twitterCard || "summary_large_image",
      title: seo.twitterTitle || title,
      description: seo.twitterDescription || description,
      images,
    },
  } as any;
}

export async function generateStaticParams() {
  try {
    const { prisma } = await import("@/core/database/db");
    const posts = await prisma.blogPost.findMany({
      select: { slug: true, status: true },
      where: { status: "published" },
    });
    return posts.map((p) => ({ slug: p.slug }));
  } catch (error) {
    console.warn("Failed to generate static params for blog:", error);
    return [];
  }
}

export default page;
