"use client";
import { Button } from "@/ui/components/button";
import { useRouter } from "next/navigation";
import React from "react";
import SolutionLink from "@/features/shared/components/SolutionLink";

interface GridBoxItem {
  id: string;
  title: string;
  description: string;
  buttonText: string;
  customModelButtonLink: string;
  solutionKey?: string; // Optional solution key for checking existence
}

interface GridOfBoxProps {
  title: string;
  subtitle: string;
  gridItems: GridBoxItem[];
  customModelTitle: string;
  customModelDescription: string;
  customModelButtonText: string;
  cardColor?: string;
  bgColor?: string;
  customModelButtonLink?: string;
  customModelSolutionKey?: string; // Optional solution key for custom model
}

const GridOfBox: React.FC<GridOfBoxProps> = ({
  title,
  subtitle,
  gridItems,
  customModelTitle,
  customModelDescription,
  customModelButtonText,
  cardColor = "bg-white",
  bgColor = "bg-gray-50",
  customModelButtonLink = "/blog",
  customModelSolutionKey,
}) => {
  const router = useRouter();
  return (
    <div className={`${bgColor} py-8 md:py-16`}>
      <div className="text-center px-4">
        <h2 className="font-neuropolitical text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 md:mb-4 text-wrap">
          {title}
        </h2>
        <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
          {subtitle}
        </p>
      </div>

      {/* AI Services Cards Section */}
      <div className="mt-8 md:mt-16 py-4 md:py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Grid of AI Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6">
            {gridItems.map((item) => (
              <div
                key={item.id}
                className={`${cardColor} p-4 md:p-6 h-full border border-[#A9A9A9]`}
              >
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-3 md:mb-4 text-sm md:text-base">
                  {item.description}
                </p>
                <div className="flex justify-end">
                  {item.solutionKey ? (
                    <SolutionLink
                      solutionKey={item.solutionKey}
                      redirectPath={item.customModelButtonLink}
                      className="px-3 md:px-4 py-2 border rounded-none border-gray-500 text-black font-medium text-xs md:text-sm bg-[#FAFAFA] hover:bg-gray-100 transition-colors"
                    >
                      {item.buttonText}
                    </SolutionLink>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={() => {
                        router.push(item.customModelButtonLink || "");
                      }}
                      className="px-3 md:px-4 py-2 border rounded-none border-gray-500 text-black font-medium text-xs md:text-sm bg-[#FAFAFA]"
                    >
                      {item.buttonText}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Custom Model Card - Full Width */}
          <div className="bg-white p-4 md:p-6 border border-[#A9A9A9]">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">
              {customModelTitle}
            </h3>
            <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base max-w-4xl">
              {customModelDescription}
            </p>
            <div className="flex justify-end">
              {customModelSolutionKey ? (
                <SolutionLink
                  solutionKey={customModelSolutionKey}
                  redirectPath={customModelButtonLink}
                  className="px-3 md:px-4 py-2 border rounded-none border-gray-500 text-black font-medium text-xs md:text-sm bg-[#FAFAFA] hover:bg-gray-100 transition-colors"
                >
                  {customModelButtonText}
                </SolutionLink>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => {
                    router.push(customModelButtonLink);
                  }}
                  className="px-3 md:px-4 py-2 border rounded-none border-gray-500 text-black font-medium text-xs md:text-sm bg-[#FAFAFA]"
                >
                  {customModelButtonText}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridOfBox;
