import { Button } from "@/ui/components/button";
import HowItWorksIllustration from "./HowItWorksIllustration";

interface Step {
  id: string;
  title: string;
  description: string;
}

interface HowItWorksPanelProps {
  title: string;
  description: string;
  image: string;
  onContactExpert?: () => void;
  illustrationData?: any;
}

export default function HowItWorksPanel({
  title,
  description,
  image,
  onContactExpert,
  illustrationData,
}: HowItWorksPanelProps) {
  return (
    <div className="bg-[#FDFDFD] border border-dashed border-[#A9A9A9] p-6 shadow-sm h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <Button
          size="sm"
          className="text-xs px-4 py-2 h-8 bg-white text-black border border-[#A9A9A9] hover:bg-gray-50 font-medium rounded-none cursor-pointer"
          onClick={onContactExpert}
        >
          Talk to an Expert
        </Button>
      </div>
      <p className="text-base text-gray-600 max-w-sm leading-relaxed">
        {description}
      </p>

      {/* Illustration */}
      <HowItWorksIllustration illustrationData={image} />
    </div>
  );
}
