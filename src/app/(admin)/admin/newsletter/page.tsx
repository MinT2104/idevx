import { getServerSessionUser } from "@/features/auth/auth-server";
import { redirect } from "next/navigation";
import NewsletterTable from "@/features/admin/components/NewsletterTable";

export default async function NewsletterAdminPage() {
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
            <h1 className="text-3xl font-bold text-gray-900">
              Newsletter Management
            </h1>
            <p className="text-gray-600 mt-2">
              Manage newsletter subscriptions and subscribers
            </p>
          </div>
        </header>

        {/* Newsletter Table */}
        <NewsletterTable />
      </main>
    </div>
  );
}
