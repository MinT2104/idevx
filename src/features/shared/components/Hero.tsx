"use client";

import { Button } from "@/ui/components/button";
import CompaniesSection from "./CompaniesSection";
import { MultiModelSection } from "@/features/models/components";
import { mockModels, mockSteps } from "@/features/models/data/mockData";
import HeroSection from "../common/HeroSection";

export default function Hero() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Grid background pattern */}
      <div className="absolute inset-0 hero-grid"></div>

      {/* Content */}
      <HeroSection
        title="AI Solutions"
        description="DevX empowers businesses with domain-focused AI services and innovative products—from Education, Healthcare, 
and Law Firms to Travel, Food, Enterprises, and Creators. Build smarter workflows, automate services, 
and scale processes with our AI-driven solutions."
        ctaButton="Get Started"
        ctaButton2="Talk to an Expert"
        subtitle="Built for Your Success"
        link1="https://www.google.com"
        link2="https://www.google.com"
      />

      {/* Spacing between Hero and Companies */}
      <div className="py-4"></div>

      {/* Companies Section */}
      <CompaniesSection />

      {/* Multi-Model AI Section */}
      <MultiModelSection
        title="Multi-Model AI for Every Challenge"
        subtitle="DevX connects leading AI models like GPT, Claude, Gemini, and LLaMA into one platform. 
Our flexible multi-model setup ensures speed, accuracy, and the right AI for every business need."
        models={mockModels}
        steps={mockSteps}
        onModelAction={(modelId, actionType) => {
          console.log(`Model ${modelId} - Action: ${actionType}`);
        }}
        onLearnMore={() => {
          console.log("Learn More clicked");
        }}
        onContactExpert={() => {
          console.log("Contact Expert clicked");
        }}
      />
    </div>
  );
}
