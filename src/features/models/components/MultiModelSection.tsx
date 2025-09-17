import ModelsListPanel from "./ModelsListPanel";
import HowItWorksPanel from "./HowItWorksPanel";

interface Model {
  id: string;
  icon: string;
  name: string;
  actionType?: 'try' | 'explore';
}

interface Step {
  id: string;
  title: string;
  description: string;
}

interface MultiModelSectionProps {
  title: string;
  subtitle: string;
  models: Model[];
  steps: Step[];
  onModelAction?: (modelId: string, actionType: string) => void;
  onLearnMore?: () => void;
  onContactExpert?: () => void;
}

export default function MultiModelSection({
  title,
  subtitle,
  models,
  steps,
  onModelAction,
  onLearnMore,
  onContactExpert
}: MultiModelSectionProps) {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Models List Panel */}
          <div>
            <ModelsListPanel
              title="Available Models"
              description="DevX connects you to a unified AI hub with support for all major LLMs"
              models={models}
              onLearnMore={onLearnMore}
              onModelAction={onModelAction}
            />
          </div>

          {/* How It Works Panel */}
          <div>
            <HowItWorksPanel
              title="How It Works"
              steps={steps}
              onContactExpert={onContactExpert}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
