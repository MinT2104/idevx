"use client";
import ModelsListPanel from "@/features/models/components/ModelsListPanel";
import HowItWorksPanel from "@/features/home/components/HowItWorksPanel";
import Image from "next/image";
import { Suspense } from "react";
import { useRouter } from "next/navigation";

interface Model {
  id: string;
  image: string;
  name: string;
  slug?: string;
  actionType?: "try" | "explore";
  customModelButtonLink?: string;
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
}

export default function MultiModelSection({
  title,
  subtitle,
  models,
  steps,
}: MultiModelSectionProps) {
  function AsciiBackground() {
    // Tạo ma trận ký tự ASCII với seed cố định để tránh hydration mismatch
    const chars = ["|", "T", "#", "/"];
    const rows = 120;
    const cols = 120;

    // Seeded random function for consistent generation
    function seededRandom(seed: number) {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    }

    const asciiArt = Array.from({ length: rows }, (_, rowIndex) =>
      Array.from({ length: cols }, (_, colIndex) => {
        const seed = rowIndex * cols + colIndex;
        return chars[Math.floor(seededRandom(seed) * chars.length)];
      }).join("")
    ).join("\n");

    return (
      <Suspense fallback={<div></div>}>
        <div className="absolute opacity-50 border-[1px] ring-[1px] ring-gray-50 inset-0 flex items-center justify-center w-[72%] p-6 aspect-square rounded-full overflow-hidden bg-white mx-auto">
          <pre className="text-gray-400 text-xs font-mono leading-tight opacity-30 whitespace-pre-wrap">
            {asciiArt}
          </pre>
        </div>
        <div className="absolute border-white border-[20px] inset-0 flex items-center justify-center w-[72%] p-6 aspect-square rounded-full bg-transparent mx-auto"></div>
      </Suspense>
    );
  }

  const router = useRouter();

  const onModelAction = (modelSlug: string) => {
    console.log("modelSlug", modelSlug);
    const src = (models || []).find((m) => m.slug === modelSlug);
    router.push(src?.customModelButtonLink || `/models/${modelSlug}`);
  };

  const onLearnMore = () => {
    router.push("/models");
  };
  const onContactExpert = () => {
    router.push("/talk-to-us");
  };

  const onLearnMoreProduct = (item: string) => {
    router.push("/product/" + item);
  };

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center">
          <h2 className="font-neuropolitical text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Multi-Model AI for Every Challenge
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            DevX connects leading AI models like GPT, Claude, Gemini, and LLaMA
            into one platform. Our flexible multi-model setup ensures speed,
            accuracy, and the right AI for every business need.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl px-8">
          {/* Models List Panel */}
          <ModelsListPanel
            title="Available Models"
            description="DevX connects you to a unified AI hub with support for all major LLMs"
            models={models}
            onLearnMore={onLearnMore}
            onModelAction={onModelAction}
          />

          {/* How It Works Panel */}
          <HowItWorksPanel
            title="How It Works"
            description="Upload data with DevX → Train → Smart prompts → Your cloud → Best-fit LLM → Accurate, hallucination-free responses."
            image="/images/svgs/how_it_work/index.png"
            onContactExpert={onContactExpert}
          />
        </div>

        <div className="text-center">
          <h2 className="font-neuropolitical text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            AI That Works Where You Work
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From classrooms to courtrooms, hospitals to travel hubs—DevX
            delivers domain-specific AI that solves real problems with speed,
            accuracy, and intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl px-8">
          {/* How It Works Panel */}
          <HowItWorksPanel
            title="AI for Education"
            image="/images/product/product_study_2.png"
            description="Personalized tutoring, curriculum Q&A, and smart content delivery."
            onContactExpert={() => onLearnMoreProduct("study-ai")}
            buttonText="Learn More"
          />
          {/* How It Works Panel */}
          <HowItWorksPanel
            title="AI for Healthcare"
            image="/images/product/product_health_1.png"
            description="Patient assistance, medical records summarization, and secure clinical insights."
            onContactExpert={() => onLearnMoreProduct("healthy-ai")}
            buttonText="Learn More"
          />
          {/* How It Works Panel */}
          <HowItWorksPanel
            title="AI for Legal"
            image="/images/product/product_law_1.png"
            description="Contract review, case research, and AI-powered legal drafting."
            onContactExpert={() => onLearnMoreProduct("legal-ai")}
            buttonText="Learn More"
          />
          {/* How It Works Panel */}
          <HowItWorksPanel
            image="/images/product/product_travel_1.png"
            title="AI for Travel & Food Creators"
            description="AI trip planners, itinerary builders, and intelligent video/content assistants."
            onContactExpert={() => onLearnMoreProduct("travel-ai")}
            buttonText="Learn More"
          />
        </div>

        <div className="text-center">
          <h2 className="font-neuropolitical text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            AI + Cloud = Scale Without Limits
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            DevX connects your AI services with AWS, Azure, Google Cloud, or
            private servers. Our cloud-native pipelines ensure scalability,
            security, and reliability for any workload.
          </p>
        </div>

        <div className="flex items-center justify-center p-10 pb-0 max-w-7xl mx-auto relative overflow-hidden mb-20 aspect-[2.8/1]">
          {/* Curved background pattern */}
          {AsciiBackground()}

          <div className="absolute -bottom-24 w-full bg-white z-10 h-10" />

          {/* Image with higher z-index */}
          <div className="relative z-10 w-[55%]">
            <Image
              src={"/images/svgs/ai_cloud/index.png"}
              alt="How It Works"
              width={0}
              height={0}
              sizes="100%"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
