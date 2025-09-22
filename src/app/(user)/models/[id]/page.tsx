import ModelDetailView from "@/features/models/view/ModelDetailView";
import { getModelById } from "@/features/models/services/models.service";
import { notFound } from "next/navigation";

// Force dynamic rendering to avoid build-time issues
export const dynamic = "force-dynamic";

const ModelDetailPage = async ({ params }: { params: { id: string } }) => {
  try {
    const model = await getModelById(params.id);
    if (!model) return notFound();
    return <ModelDetailView model={model} />;
  } catch (error) {
    console.warn("Failed to fetch model:", error);
    return notFound();
  }
};

export default ModelDetailPage;
