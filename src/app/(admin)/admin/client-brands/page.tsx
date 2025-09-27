import ClientBrandTable from "@/features/admin/components/ClientBrandTable";

export default function AdminClientBrandsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Client Brands</h1>
          <p className="text-gray-600 mt-2">
            Manage client brand logos and images
          </p>
        </div>
      </div>

      <ClientBrandTable />
    </div>
  );
}
