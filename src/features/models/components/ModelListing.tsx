"use client";
import { Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/ui/components/button";

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
          <div
            key={sectionIndex}
            className={`py-16 ${sectionIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-5xl font-neuropolitical text-center font-normal text-gray-900 mb-8 capitalize">
                {section.title}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {section.models.map((model, modelIndex) => (
                  <div
                    key={modelIndex}
                    className={`border border-gray-300 p-6 hover:shadow-lg transition-shadow duration-200 ${
                      sectionIndex % 2 === 1 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    {/* Logo */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-gray-100 flex items-center justify-center">
                        <span className="text-xl font-bold text-gray-700">
                          {model.logo}
                        </span>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {model.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Model Info */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {model.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {model.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* See All Button */}
              {section.showSeeAll && (
                <div className="text-center">
                  <button className="px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                    See All
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Explore DevX Today Section */}
        <div className="text-center py-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Explore DevX Today
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              className="px-8 py-3 text-lg border-gray-300 rounded-none"
            >
              Get Started
            </Button>
            <Button className="bg-[#E15929] hover:bg-[#C54A1F] text-white px-8 py-3 text-lg rounded-none">
              Talk to an Engineer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelListing;
