import { getServerSessionUser } from "@/features/auth/auth-server";
import { redirect } from "next/navigation";
import BlogTable from "@/features/admin/components/BlogTable";
import { Button } from "@/ui/components/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function BlogPage() {
  const user = await getServerSessionUser();
  if (!user || user.role !== "admin") {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Main content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
            <p className="text-gray-600 mt-2">
              Manage your blog content and articles
            </p>
          </div>
          <Link href="/admin/blog/create">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center flex-row space-x-2">
              <span>Create New Post</span>
            </Button>
          </Link>
        </header>

        {/* Blog Table */}
        <BlogTable />
      </main>
    </div>
  );
}
