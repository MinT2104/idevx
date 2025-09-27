import TestimonialsTable from "@/features/admin/components/TestimonialsTable";

export const dynamic = "force-dynamic";

export default function AdminTestimonialsPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Testimonials</h1>
        <p className="text-sm text-gray-500">
          Manage homepage client quotes and statistics.
        </p>
      </div>
      <TestimonialsTable />
    </div>
  );
}
