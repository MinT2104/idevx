import ModelDetailView from "@/features/models/view/ModelDetailView";
import { getModelBySlug } from "@/features/models/services/models.service";
import { notFound } from "next/navigation";

// Force dynamic rendering to avoid build-time issues
export const dynamic = "force-dynamic";

const ModelDetailPageBySlug = async ({
  params,
}: {
  params: { slug: string };
}) => {
  try {
    const model = await getModelBySlug(params.slug);
    if (!model) return notFound();
    return <ModelDetailView model={model} />;
  } catch (error) {
    console.warn("Failed to fetch model by slug:", error);
    return notFound();
  }
};

export default ModelDetailPageBySlug;
