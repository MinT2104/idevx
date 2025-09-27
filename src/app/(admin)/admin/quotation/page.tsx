import QuotationTable from "@/features/admin/components/QuotationTable";

export default function AdminQuotationPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Quotation Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage quotation requests from potential clients
          </p>
        </div>
      </div>

      <QuotationTable />
    </div>
  );
}
