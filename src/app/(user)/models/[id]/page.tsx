import ModelDetailView from "@/features/models/view/ModelDetailView";
import { getModelById } from "@/features/models/services/models.service";
import { notFound } from "next/navigation";

const ModelDetailPage = async ({ params }: { params: { id: string } }) => {
  const model = await getModelById(params.id);
  if (!model) return notFound();
  return <ModelDetailView model={model} />;
};

export default ModelDetailPage;
