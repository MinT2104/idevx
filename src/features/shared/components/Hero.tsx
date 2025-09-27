import { MultiModelSection } from "@/features/models/components";
import { mockModels, mockSteps } from "@/features/models/data/mockData";
import ExporeDevxToday from "@/features/models/components/ExporeDevxToday";
import {
  SlideUp,
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "./ScrollAnimation";
import { CardHover } from "./HoverAnimation";
import HeroSection from "../common/HeroSection";
import CompaniesSection from "./CompaniesSection";
import GridOfBox from "@/features/home/components/GridOfBox";
import WhatClientSay from "@/features/home/components/WhatClientSay";
import OurBlog from "@/features/home/components/OurBlog";
import { Suspense } from "react";
import SolutionLink from "./SolutionLink";

// GridOfBox data configuration
const gridBoxData = {
  title: "Built for Gen AI—Out of the Box",
  subtitle:
    "Custom performance optimizations tailored for Gen AI applications are baked into our Inference Stack.",
  gridItems: [
    {
      id: "image-generation",
      title: "Image Generation",
      description:
        "Create product, ad, and learning visuals instantly with DevX AI.",
      buttonText: "Learn More",
      customModelButtonLink: "/solution/image-processing",
    },
    {
      id: "speech-to-text",
      title: "Speech-to-Text",
      description:
        "Fast, accurate transcription powered by Whisper, Deepgram & more.",
      buttonText: "Learn More",
      customModelButtonLink: "/solution/speech-to-text",
    },
    {
      id: "text-to-speech",
      title: "Text-to-speech",
      description:
        "Human-like voices with DevX, ElevenLabs, Google, Coqui, Bark, Mozilla.",
      buttonText: "Learn More",
      customModelButtonLink: "/solution/text-to-speech",
    },
    {
      id: "embeddings",
      title: "Embeddings",
      description: "Smarter search and retrieval with DevX vector embeddings.",
      buttonText: "Learn More",
      customModelButtonLink: "/solution/embedding",
    },
    {
      id: "process-automation",
      title: "Process Automation",
      description: "Automate multi-step workflows end-to-end with DevX AI.",
      buttonText: "Learn More",
      customModelButtonLink: "/solution/process-automation",
    },
    {
      id: "ai-agents",
      title: "AI Agents",
      description:
        "Deploy intelligent agents for support, research, and operations.",
      customModelButtonLink: "/solution/ai-agent",
      buttonText: "Learn More",
    },
  ],
  customModelTitle: "Custom model",
  customModelDescription:
    "DevX builds fine-tuned AI models on your business data, workflows, and domain expertise—delivering unmatched accuracy, compliance, and performance.",
  customModelButtonText: "Learn More",
  customModelButtonLink: "/solution/custom-model",
};

// WhatClientSay data from API

const gridBoxData2 = {
  title: "Agentic AI & AI Agents: Future Workflows",
  subtitle:
    "Go beyond single tasks. With DevX Agent AI, your business can deploy autonomous, multi-step agents for research, analytics, customer support, and process automation.",
  gridItems: [
    {
      id: "research-agents",
      title: "Research Agents",
      description: "Collect, analyze & summarize data automatically.",
      buttonText: "Learn More",
      customModelButtonLink: "/agentic/research",
      solutionKey: "research",
    },
    {
      id: "customer-support-agents",
      title: "Customer Support Agents",
      description: "Handle 24/7 client queries with empathy & accuracy.",
      buttonText: "Learn More",
      customModelButtonLink: "/agentic/customer-support",
      solutionKey: "customer-support",
    },
    {
      id: "workflow-agents",
      title: "Workflow Agents",
      description: "Automate repetitive office tasks end-to-end.",
      buttonText: "Learn More",
      customModelButtonLink: "/agentic/workflow",
      solutionKey: "workflow",
    },
    {
      id: "ops-agents",
      title: "Ops Agents",
      description: "Monitor, predict, and optimize operations in real-time.",
      buttonText: "Learn More",
      customModelButtonLink: "/agentic/ops",
      solutionKey: "ops",
    },
    {
      id: "finance-agents",
      title: "Finance Agents",
      description: "Automate reports, forecasting, and compliance checks.",
      buttonText: "Learn More",
      customModelButtonLink: "/agentic/finance",
      solutionKey: "finance",
    },
    {
      id: "creative-agents",
      title: "Creative Agents",
      description:
        "Assist content creators, vloggers, and marketers with fresh ideas",
      buttonText: "Learn More",
      customModelButtonLink: "/agentic/creative",
      solutionKey: "creative",
    },
  ],
  customModelTitle: "Text-to-Song Agents",
  customModelDescription:
    "Turn words into music. Convert lyrics or prompts into full songs with vocals, instruments, and styles—powered by generative music AI (similar to Suno.com). Perfect for creators, ads, and immersive experiences.",
  customModelButtonText: "Learn More",
  customModelButtonLink: "/solution/text-to-song",
  customModelSolutionKey: "text-to-song",
};

interface BlogItem {
  id: string;
  title: string;
  description: string;
  logo: string;
  logoAlt: string;
  buttonText?: string;
  slug: string;
}

type ModelItem = {
  id: string;
  name: string;
  slug?: string;
  image: string;
  actionType?: "try" | "explore";
  customModelButtonLink?: string;
};

interface HeroProps {
  blogs?: BlogItem[];
  models?: ModelItem[];
  testimonials?: any[];
}

export default function Hero({
  blogs = [],
  models = [],
  testimonials: testimonialsFromServer = [],
}: HeroProps) {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Grid background pattern */}
      {/* Content */}
      <SlideUp delay={0.1}>
        <HeroSection
          title="AI Solutions"
          description="DevX empowers businesses with domain-focused AI services and innovative products—from Education, Healthcare, 
and Law Firms to Travel, Food, Enterprises, and Creators. Build smarter workflows, automate services, 
and scale processes with our AI-driven solutions."
          buttons={[
            {
              text: "Get Started",
              variant: "outline",
              size: "lg",
              link: "/quotation",
            },
            {
              text: "Talk to an Expert",
              variant: "default",
              size: "lg",
              className: "bg-orange-600 hover:bg-orange-700 text-white",
              link: "/talk-to-us",
            },
          ]}
          subtitle="Built for Your Success"
        />
      </SlideUp>

      <SlideUp delay={0.2}>
        <CompaniesSection />
      </SlideUp>

      <SlideUp delay={0.3}>
        <MultiModelSection
          title="Multi-Model AI for Every Challenge"
          subtitle="DevX connects leading AI models like GPT, Claude, Gemini, and LLaMA into one platform. 
Our flexible multi-model setup ensures speed, accuracy, and the right AI for every business need."
          models={models || []}
          steps={mockSteps}
        />
      </SlideUp>

      <SlideUp delay={0.4}>
        <Suspense fallback={<div>Loading...</div>}>
          <GridOfBox
            title={gridBoxData.title}
            subtitle={gridBoxData.subtitle}
            gridItems={gridBoxData.gridItems}
            customModelTitle={gridBoxData.customModelTitle}
            customModelDescription={gridBoxData.customModelDescription}
            customModelButtonText={gridBoxData.customModelButtonText}
            customModelButtonLink={gridBoxData.customModelButtonLink}
          />
        </Suspense>
      </SlideUp>

      <SlideUp delay={0.5}>
        <Suspense fallback={<div>Loading...</div>}>
          <WhatClientSay
            title="What Our Clients Say"
            testimonials={testimonialsFromServer || []}
          />
        </Suspense>
      </SlideUp>

      <SlideUp delay={0.6}>
        <Suspense fallback={<div>Loading...</div>}>
          <GridOfBox
            title={gridBoxData2.title}
            subtitle={gridBoxData2.subtitle}
            gridItems={gridBoxData2.gridItems}
            customModelTitle={gridBoxData2.customModelTitle}
            customModelDescription={gridBoxData2.customModelDescription}
            customModelButtonText={gridBoxData2.customModelButtonText}
            cardColor="bg-gray-50"
            bgColor="bg-white"
            customModelButtonLink={gridBoxData2.customModelButtonLink}
          />
        </Suspense>
      </SlideUp>

      <SlideUp delay={0.7}>
        <ExporeDevxToday className="bg-gray-50 my-10" />
      </SlideUp>

      <SlideUp delay={0.8}>
        <Suspense fallback={<div>Loading...</div>}>
          <OurBlog title="Our Blog" blogs={blogs} />
        </Suspense>
      </SlideUp>
    </div>
  );
}
