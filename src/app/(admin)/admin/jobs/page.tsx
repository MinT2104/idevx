import { getServerSessionUser } from "@/features/auth/auth-server";
import { redirect } from "next/navigation";
import JobsTable from "@/features/admin/components/JobsTable";

export const dynamic = "force-dynamic";

export default async function AdminJobsPage() {
  const user = await getServerSessionUser();
  if (!user || user.role !== "admin") {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <main className="flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Jobs</h1>
          <p className="text-gray-600 mt-2">Manage job postings</p>
        </header>
        <JobsTable />
      </main>
    </div>
  );
}
