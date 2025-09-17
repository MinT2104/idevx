"use client";

import { Button } from "@/ui/components/button";
import CompaniesSection from "./CompaniesSection";
import { MultiModelSection } from "@/features/models/components";
import { mockModels, mockSteps } from "@/features/models/data/mockData";

export default function Hero() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Grid background pattern */}
      <div className="absolute inset-0 hero-grid"></div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-start px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Main heading */}
        <h1 className="text-gray-800 mb-4 font-['Neuropolitical'] text-center" style={{
          fontFamily: 'Neuropolitical',
          fontWeight: 400,
          fontStyle: 'Regular',
          fontSize: 'clamp(40px, 6vw, 75px)',
          lineHeight: '100%',
          letterSpacing: '0%',
          textAlign: 'center',
          verticalAlign: 'middle'
        }}>
          AI Solutions
          <br />
          Built for Your Success
        </h1>
        
        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-4xl mx-auto mb-6 sm:mb-8 leading-relaxed px-2">
          DevX empowers businesses with domain-focused AI services and innovative products—from Education, Healthcare, and Law Firms to Travel, Food, Enterprises, and Creators. Build smarter workflows, automate services, and scale processes with our AI-driven solutions.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center w-full sm:w-auto">
          <Button 
            size="sm"
            className="w-full sm:w-auto px-6 sm:px-8 py-2 text-sm sm:text-base font-medium bg-white text-black border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Get Started
          </Button>
          <Button 
            size="sm"
            className="w-full sm:w-auto px-6 sm:px-8 py-2 text-sm sm:text-base font-medium bg-orange-500 hover:bg-orange-600 text-white border-0 transition-colors"
          >
            Talk to an Expert
          </Button>
        </div>
      </div>
      
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
          console.log('Learn More clicked');
        }}
        onContactExpert={() => {
          console.log('Contact Expert clicked');
        }}
      />
    </div>
  );
}
