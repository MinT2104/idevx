import { getServerSessionUser } from "@/features/auth/auth-server";
import { redirect } from "next/navigation";
import JobForm from "@/features/admin/components/JobForm";

export const dynamic = "force-dynamic";

export default async function CreateJobPage() {
  const user = await getServerSessionUser();
  if (!user || user.role !== "admin") redirect("/admin/login");

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Create Job</h1>
      <JobForm mode="create" />
    </div>
  );
}
