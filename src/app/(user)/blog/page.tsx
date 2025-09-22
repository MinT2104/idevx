import BlogView from "@/features/blog/view/BlogView";
import { prisma } from "@/core/database/db";

// Force dynamic rendering to avoid build-time issues
export const dynamic = "force-dynamic";
export const revalidate = 60;

const page = async () => {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  });
  return <BlogView posts={posts as any} />;
};

export default page;
