import CareersTable from "@/features/admin/components/CareersTable";

export const dynamic = "force-dynamic";

export default function AdminCareersPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Career Applications
        </h1>
        <p className="text-sm text-gray-500">
          Manage incoming job applications.
        </p>
      </div>
      <CareersTable />
    </div>
  );
}
