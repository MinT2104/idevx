import { getServerSessionUser } from "@/features/auth/auth-server";
import { redirect } from "next/navigation";
import ModelForm from "@/features/admin/components/ModelForm";
import { ModelAdminService } from "@/features/models/services/model-admin.service";

interface EditModelPageProps {
  params: {
    id: string;
  };
}

export default async function EditModelPage({ params }: EditModelPageProps) {
  const user = await getServerSessionUser();
  if (!user || user.role !== "admin") {
    redirect("/admin/login");
  }

  // Fetch model data for editing
  let initialData;
  try {
    const model = await ModelAdminService.getModelById(params.id);

    // Transform the data to match ModelFormData interface
    initialData = {
      name: model.name || "",
      slug: model.slug,
      type: model.type || "",
      description: model.description || "",
      logo: model.logo || "",
      status: model.status as "active" | "inactive",
      readme: (model.detailedInfo as any)?.readme || "",
      github: (model.detailedInfo as any)?.github || "",
      developedBy: (model.detailedInfo as any)?.developedBy || "",
      modelFamily: (model.detailedInfo as any)?.modelFamily || "",
      useCase: (model.detailedInfo as any)?.useCase || "",
      variant: (model.detailedInfo as any)?.variant || "",
      size: (model.detailedInfo as any)?.size || "",
      license: (model.detailedInfo as any)?.license || "",
      content: model.content || {
        type: "markdown",
        body: "",
      },
    };
  } catch (error) {
    console.error("Error fetching model:", error);
    // If model not found, redirect to models list
    redirect("/admin/models");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <main className="flex-1 p-8">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Edit AI Model</h1>
          <p className="text-gray-600 mt-2">Update your model information</p>
        </header>
        <ModelForm initialData={initialData} modelId={params.id} />
      </main>
    </div>
  );
}
