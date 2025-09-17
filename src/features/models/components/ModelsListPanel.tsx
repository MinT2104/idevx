import { Button } from "@/ui/components/button";
import ModelListItem from "./ModelListItem";

interface Model {
  id: string;
  icon: string;
  name: string;
  actionType?: 'try' | 'explore';
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
  onModelAction
}: ModelsListPanelProps) {
  return (
    <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-6 shadow-sm h-full flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800">
            {title}
          </h3>
          <Button
            size="sm"
            className="text-xs px-4 py-2 h-8 bg-white text-black border border-gray-300 hover:bg-gray-50 font-medium"
            onClick={onLearnMore}
          >
            Learn More
          </Button>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Models List */}
      <div className="space-y-1 flex-1">
        {models.map((model) => (
          <ModelListItem
            key={model.id}
            icon={model.icon}
            name={model.name}
            actionType={model.actionType}
            onTry={() => onModelAction?.(model.id, 'try')}
            onExplore={() => onModelAction?.(model.id, 'explore')}
          />
        ))}
      </div>
    </div>
  );
}
