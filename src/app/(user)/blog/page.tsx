import BlogView from "@/features/blog/view/BlogView";

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
    orderBy: { createdAt: "desc" },
  });
  return <BlogView posts={posts as any} />;
};

export default page;
