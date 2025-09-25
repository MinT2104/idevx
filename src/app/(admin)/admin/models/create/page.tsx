import { getServerSessionUser } from "@/features/auth/auth-server";
import { redirect } from "next/navigation";
import ModelForm from "@/features/admin/components/ModelForm";

export default async function CreateModelPage() {
  const user = await getServerSessionUser();
  if (!user || user.role !== "admin") {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <main className="flex-1 p-8">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Create New AI Model</h1>
          <p className="text-gray-600 mt-2">
            Fill in the details to add a new AI model
          </p>
        </header>
        <ModelForm />
      </main>
    </div>
  );
}
