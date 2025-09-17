import { Button } from "@/ui/components/button";
import HowItWorksIllustration from "./HowItWorksIllustration";

interface Step {
  id: string;
  title: string;
  description: string;
}

interface HowItWorksPanelProps {
  title: string;
  steps: Step[];
  onContactExpert?: () => void;
  illustrationData?: any;
}

export default function HowItWorksPanel({
  title,
  steps,
  onContactExpert,
  illustrationData
}: HowItWorksPanelProps) {
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
            onClick={onContactExpert}
          >
            Talk to an Expert
          </Button>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-4 mb-6 flex-1">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-medium">
              {index + 1}
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-800 mb-1">
                {step.title}
              </h4>
              <p className="text-sm text-gray-600">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Illustration */}
      <div className="mb-6">
        <HowItWorksIllustration illustrationData={illustrationData} />
      </div>
    </div>
  );
}
