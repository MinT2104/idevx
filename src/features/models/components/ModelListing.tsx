"use client";
import { Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/ui/components/button";
import ModelSection from "./ModelSection";
import ExporeDevxToday from "./ExporeDevxToday";

const ModelListing = () => {
  const [mounted, setMounted] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  const filterCategories = [
    "All",
    "LLM",
    "Transcription",
    "Text To Speech",
    "Image Generation",
    "Embedding",
    "Speech To Text",
    "Image Processing",
  ];

  const modelSections = [
    {
      title: "Trending models",
      models: [
        {
          logo: "S",
          name: "GPT OSS 120B",
          description: "MOE",
          tags: ["MODEL API", "LLM"],
        },
        {
          logo: "S",
          name: "GPT OSS 20B",
          description: "MOE",
          tags: ["LLM"],
        },
        {
          logo: "Q",
          name: "Qwen Image",
          description: "TEXT-TO-IMAGE",
          tags: ["IMAGE GENERATION"],
        },
      ],
    },
    {
      title: "large language models",
      models: [
        {
          logo: "K",
          name: "Kimi K2 0905",
          description: "0905-K2",
          tags: ["LLM"],
        },
        {
          logo: "D",
          name: "DeepSeek V3.1",
          description: "V3.1-B200",
          tags: ["LLM"],
        },
        {
          logo: "Q",
          name: "Qwen3 235B 2507",
          description: "2507",
          tags: ["LLM"],
        },
      ],
      showSeeAll: true,
    },
    {
      title: "DeepSeek models",
      models: [
        {
          logo: "D",
          name: "DeepSeek-R1 Llama 70B",
          description: "R1-LLAMA-TRT-LLM-H100",
          tags: ["LLM"],
        },
        {
          logo: "D",
          name: "DeepSeek V3.1",
          description: "V3.1-B200",
          tags: ["MODEL API", "LLM"],
        },
        {
          logo: "D",
          name: "DeepSeek-R1 Qwen 32B",
          description: "R1-QWEN-TRT-LLM-H100",
          tags: ["LLM"],
        },
      ],
    },
    {
      title: "Text To Speech models",
      models: [
        {
          logo: "S",
          name: "GPT OSS 120B",
          description: "MOE",
          tags: ["MODEL API", "LLM"],
        },
        {
          logo: "S",
          name: "GPT OSS 20B",
          description: "MOE",
          tags: ["LLM"],
        },
        {
          logo: "Q",
          name: "Qwen Image",
          description: "TEXT-TO-IMAGE",
          tags: ["IMAGE GENERATION"],
        },
      ],
    },
    {
      title: "transcription models",
      models: [
        {
          logo: "D",
          name: "DeepSeek-R1 Llama 70B",
          description: "R1-LLAMA-TRT-LLM-H100",
          tags: ["LLM"],
        },
        {
          logo: "D",
          name: "DeepSeek V3.1",
          description: "V3.1-B200",
          tags: ["MODEL API", "LLM"],
        },
        {
          logo: "D",
          name: "DeepSeek-R1 Qwen 32B",
          description: "R1-QWEN-TRT-LLM-H100",
          tags: ["LLM"],
        },
      ],
    },
    {
      title: "Embedding models",
      models: [
        {
          logo: "S",
          name: "GPT OSS 120B",
          description: "MOE",
          tags: ["MODEL API", "LLM"],
        },
        {
          logo: "S",
          name: "GPT OSS 20B",
          description: "MOE",
          tags: ["LLM"],
        },
        {
          logo: "Q",
          name: "Qwen Image",
          description: "TEXT-TO-IMAGE",
          tags: ["IMAGE GENERATION"],
        },
      ],
    },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative bg-white">
      <div className="">
        {/* Filter Categories */}
        <div className="max-w-7xl mx-auto flex justify-center gap-2 overflow-x-auto px-4 sm:px-6 lg:px-8 py-12 mb-5">
          {filterCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-3 py-2 text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                activeFilter === category
                  ? "bg-[#E15929] text-white"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300"
              }`}
            >
              {category}
            </button>
          ))}

          {/* Filter Button */}
          <button className="flex items-center gap-1 px-3 py-2 bg-white text-gray-700 border border-gray-200 hover:border-gray-300 transition-colors duration-200 text-sm whitespace-nowrap">
            <Filter className="h-3 w-3" />
            Filter by
          </button>
        </div>

        {/* Model Sections */}
        {modelSections.map((section, sectionIndex) => (
          <ModelSection
            key={sectionIndex}
            title={section.title}
            models={section.models}
            showSeeAll={section.showSeeAll || false}
            sectionIndex={sectionIndex}
          />
        ))}

        <ExporeDevxToday />
      </div>
    </div>
  );
};

export default ModelListing;
