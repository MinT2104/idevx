import { getServerSessionUser } from "@/features/auth/auth-server";
import { redirect } from "next/navigation";
import ModelTable from "@/features/admin/components/ModelTable";
import { Button } from "@/ui/components/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function ModelsPage() {
  const user = await getServerSessionUser();
  if (!user || user.role !== "admin") {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">AI Models</h1>
            <p className="text-gray-600 mt-2">
              Manage AI models and their information
            </p>
          </div>
          <Link href="/admin/models/create">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2">
              <span>Add New Model</span>
            </Button>
          </Link>
        </header>
        <ModelTable />
      </main>
    </div>
  );
}
