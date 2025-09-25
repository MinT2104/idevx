"use client";

// import { Button } from "@/ui/components/button";
import CompaniesSection from "./CompaniesSection";
import { MultiModelSection } from "@/features/models/components";
import { mockModels, mockSteps } from "@/features/models/data/mockData";
import HeroSection from "../common/HeroSection";
import GridOfBox from "@/features/home/components/GridOfBox";
import WhatClientSay from "@/features/home/components/WhatClientSay";
import ExporeDevxToday from "@/features/models/components/ExporeDevxToday";
import OurBlog from "@/features/home/components/OurBlog";
import { useRouter } from "next/navigation";

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

// WhatClientSay data configuration
const testimonialsData = [
  // Top row - Statistics
  {
    id: "cushman-wakefield",
    type: "statistic" as const,
    statistic: {
      value: "70%",
      description:
        "70% faster content creation using GenAI for blogs & product descriptions.",
    },
    company: {
      name: "Cushman & Wakefield",
      logo: "/images/home/cusman.png",
      imageClass: "w-auto h-5",
    },
  },
  {
    id: "opella",
    type: "statistic" as const,
    statistic: {
      value: "12,000+",
      description: "12,000+ hours saved annually through AI-driven automation.",
    },
    company: {
      name: "Opella",
      logo: "/images/home/opella.png",
      imageClass: "h-5 w-auto",
    },
  },
  {
    id: "pgim",
    type: "quote" as const,
    quote: {
      text: "DevX AI transformed our legal research speed—cutting hours of work into minutes.",
      person: "Peter So",
      position: "VP of Digital Innovation",
      image: "/images/testimonials/peter-so.png",
    },
    company: {
      name: "PGIM",
      logo: "/images/home/pgim.png",
      imageClass: "h-5 w-auto",
    },
    client: {
      name: "Peter So",
      logo: "/images/home/peter.png",
    },
  },
  // Bottom row
  {
    id: "epam",
    type: "quote" as const,
    quote: {
      text: "In healthcare, accuracy matters. DevX delivered 95%+ reliable transcription for patient data.",
      person: "Elaina Shekhter",
      position: "Director of Company",
      image: "/images/testimonials/elaina-shekhter.png",
    },
    company: {
      name: "EPAM",
      logo: "/images/home/epam.png",
      imageClass: "h-6 w-auto",
    },
    client: {
      name: "Elaina So",
      logo: "/images/home/elaina.png",
    },
  },
  {
    id: "anthropologie",
    type: "statistic" as const,
    statistic: {
      value: "70%",
      description:
        "70% boost in student learning outcomes: Rural students get instant answers to questions they can't always ask in class.",
    },
    company: {
      name: "Anthropologie",
      logo: "/images/home/anthropologies.png",
      imageClass: "w-auto h-2",
    },
  },
  {
    id: "adidas",
    type: "statistic" as const,
    statistic: {
      value: "8,500 Products",
      description: "8,500 product listings auto-generated in 24 hours.",
    },
    company: {
      name: "Adidas",
      logo: "/images/home/adidas.png",
      imageClass: "w-auto h-10",
    },
  },
];

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
      customModelButtonLink: "/agent/research",
    },
    {
      id: "customer-support-agents",
      title: "Customer Support Agents",
      description: "Handle 24/7 client queries with empathy & accuracy.",
      buttonText: "Learn More",
      customModelButtonLink: "/agent/customer-support",
    },
    {
      id: "workflow-agents",
      title: "Workflow Agents",
      description: "Automate repetitive office tasks end-to-end.",
      buttonText: "Learn More",
      customModelButtonLink: "/agent/workflow",
    },
    {
      id: "ops-agents",
      title: "Ops Agents",
      description: "Monitor, predict, and optimize operations in real-time.",
      buttonText: "Learn More",
      customModelButtonLink: "/agent/ops",
    },
    {
      id: "finance-agents",
      title: "Finance Agents",
      description: "Automate reports, forecasting, and compliance checks.",
      buttonText: "Learn More",
      customModelButtonLink: "/agent/finance",
    },
    {
      id: "creative-agents",
      title: "Creative Agents",
      description:
        "Assist content creators, vloggers, and marketers with fresh ideas",
      buttonText: "Learn More",
      customModelButtonLink: "/agent/creative",
    },
  ],
  customModelTitle: "Text-to-Song Agents",
  customModelDescription:
    "Turn words into music. Convert lyrics or prompts into full songs with vocals, instruments, and styles—powered by generative music AI (similar to Suno.com). Perfect for creators, ads, and immersive experiences.",
  customModelButtonText: "Learn More",
  customModelButtonLink: "/agent/text-to-song",
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
}

export default function Hero({ blogs = [], models = [] }: HeroProps) {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Grid background pattern */}
      {/* Content */}
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
            link: "/",
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

      <CompaniesSection />

      <MultiModelSection
        title="Multi-Model AI for Every Challenge"
        subtitle="DevX connects leading AI models like GPT, Claude, Gemini, and LLaMA into one platform. 
Our flexible multi-model setup ensures speed, accuracy, and the right AI for every business need."
        models={models || []}
        steps={mockSteps}
        onModelAction={(modelSlug) => {
          console.log("modelSlug", modelSlug);
          const src = (models || []).find((m) => m.slug === modelSlug);
          router.push(src?.customModelButtonLink || `/models/${modelSlug}`);
        }}
        onLearnMore={() => {
          router.push("/models");
        }}
        onContactExpert={() => {
          router.push("/talk-to-us");
        }}
      />

      <GridOfBox
        title={gridBoxData.title}
        subtitle={gridBoxData.subtitle}
        gridItems={gridBoxData.gridItems}
        customModelTitle={gridBoxData.customModelTitle}
        customModelDescription={gridBoxData.customModelDescription}
        customModelButtonText={gridBoxData.customModelButtonText}
        customModelButtonLink={gridBoxData.customModelButtonLink}
      />

      <WhatClientSay
        title="What Our Clients Say"
        testimonials={testimonialsData}
      />

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

      <ExporeDevxToday className="bg-gray-50 my-10" />

      <OurBlog title="Our Blog" blogs={blogs} />
    </div>
  );
}
