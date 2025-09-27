import { getServerSessionUser } from "@/features/auth/auth-server";
import { redirect } from "next/navigation";
import BlogForm from "@/features/admin/components/BlogForm";
import { BlogFormService } from "@/features/blog/services/blog-form.service";

interface EditBlogPageProps {
  params: {
    id: string;
  };
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const user = await getServerSessionUser();
  if (!user || user.role !== "admin") {
    redirect("/admin/login");
  }

  // Fetch blog post data for editing
  let initialData;
  try {
    const post = await BlogFormService.getBlogPostForEdit(params.id);

    // Transform the data to match BlogFormData interface
    initialData = {
      title: post.title,
      subtitle: post.subtitle || undefined,
      excerpt: post.excerpt || undefined,
      slug: post.slug,
      locale: post.locale,
      heroImage: post.heroImage as any,
      cardImage: post.cardImage as any,
      content: post.content as any,
      taxonomy: post.taxonomy as any,
      authors: post.authors as any,
      status: post.status as "draft" | "published",
      blogType: (post.blogType as "automation" | "manual") || "manual",
      publishedAt: post.publishedAt?.toISOString(),
      featured: post.featured || false,
      seo: post.seo as any,
    };
  } catch (error) {
    console.error("Error fetching blog post:", error);
    // If post not found, redirect to blog list
    redirect("/admin/blog");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Main content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Edit Blog Post</h1>
          <p className="text-gray-600 mt-2">Update your blog post content</p>
        </header>

        {/* Blog Form */}
        <BlogForm initialData={initialData} postId={params.id} />
      </main>
    </div>
  );
}
