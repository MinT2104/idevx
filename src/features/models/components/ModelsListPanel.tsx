import { Button } from "@/ui/components/button";
import ModelListItem from "./ModelListItem";

interface Model {
  id: string;
  image: string;
  name: string;
  actionType?: "try" | "explore";
  customModelButtonLink?: string;
}

interface ModelsListPanelProps {
  title: string;
  description: string;
  models: Model[];
  onLearnMore?: () => void;
  onModelAction?: (modelId: string, actionType: string) => void;
}

export default function ModelsListPanel({
  title,
  description,
  models,
  onLearnMore,
  onModelAction,
}: ModelsListPanelProps) {
  return (
    <div className="bg-[#FDFDFD]/50 border border-dashed border-[#A9A9A9] shadow-sm h-full flex flex-col justify-between">
      {/* Header */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <Button
            size="sm"
            className="text-xs px-4 py-2 h-8 bg-white text-black border border-[#A9A9A9] hover:bg-gray-50 font-medium rounded-none cursor-pointer"
            onClick={onLearnMore}
          >
            Learn More
          </Button>
        </div>
        <p className="text-base text-gray-600 max-w-sm leading-relaxed">
          {description}
        </p>
      </div>

      {/* Models List */}
      <div className="">
        {models.map((model) => (
          <ModelListItem
            key={model.id}
            image={model.image}
            name={model.name}
            actionType={model.actionType}
            onTry={() => onModelAction?.(model.id, "try")}
            onExplore={() => onLearnMore?.()}
          />
        ))}
      </div>
    </div>
  );
}
