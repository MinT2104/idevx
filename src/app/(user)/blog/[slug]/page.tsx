import BlogDetailView from "@/features/blog/view/BlogDetailView";
import { prisma } from "@/core/database/db";

export const revalidate = 60;

const page = async ({ params }: { params: { slug: string } }) => {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug },
  });
  const relations = (post?.relations as any) || {};
  let related: any[] = [];

  if (relations.relatedSlugs && Array.isArray(relations.relatedSlugs)) {
    related = await prisma.blogPost.findMany({
      where: { slug: { in: relations.relatedSlugs || [] } },
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
  return <BlogDetailView post={post as any} related={related as any} />;
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug },
  });
  if (!post) return { title: "Blog" } as any;
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
  const posts = await prisma.blogPost.findMany({
    select: { slug: true, status: true },
    where: { status: "published" },
  });
  return posts.map((p) => ({ slug: p.slug }));
}

export default page;
