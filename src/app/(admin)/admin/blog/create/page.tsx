import { getServerSessionUser } from "@/features/auth/auth-server";
import { redirect } from "next/navigation";
import BlogForm from "@/features/admin/components/BlogForm";

export default async function CreateBlogPage() {
  const user = await getServerSessionUser();
  if (!user || user.role !== "admin") {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Main content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Create New Blog Post</h1>
          <p className="text-gray-600 mt-2">Write and publish a new blog post</p>
        </header>

        {/* Blog Form */}
        <BlogForm />
      </main>
    </div>
  );
}
