"use client";

import { useState, useEffect, useMemo } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/ui/components/button";
import { ModelViewRecord } from "../services/models.service";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getModelUrl } from "../utils/slug.utils";

interface ModelHeroProps {
  models: ModelViewRecord[];
}

const ModelHero = ({ models }: ModelHeroProps) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(".search-container")) {
        setShowResults(false);
      }
    };

    if (showResults) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showResults]);

  // Debounced search với useMemo
  const filteredModels = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase().trim();
    return models
      .filter((model) => {
        const name = model.name?.toLowerCase() || "";
        const description = model.description?.toLowerCase() || "";
        const type = model.type?.toLowerCase() || "";
        const slug = model.slug?.toLowerCase() || "";

        return (
          name.includes(query) ||
          description.includes(query) ||
          type.includes(query) ||
          slug.includes(query)
        );
      })
      .slice(0, 8); // Giới hạn 8 kết quả
  }, [searchQuery, models]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowResults(value.trim().length > 0);
  };

  // Handle model click
  const handleModelClick = (model: ModelViewRecord) => {
    if (model.id) {
      const modelUrl = getModelUrl(model);
      router.push(modelUrl);
    } else if (model.slug) {
      window.open(model.slug, "_blank");
    }
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
    setShowResults(false);
  };

  if (!isMounted) {
    return (
      <div className="relative min-h-fit bg-white">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12 animate-pulse">
            <div className="mx-auto mb-6 h-12 md:h-14 w-3/4 bg-gray-200" />
            <div className="mx-auto mb-3 h-4 w-2/3 bg-gray-200" />
            <div className="mx-auto mb-8 h-4 w-1/2 bg-gray-200" />
            <div className="mx-auto h-10 w-56 bg-gray-200" />
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="h-12 w-full bg-gray-200 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-fit bg-white">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-white">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-7xl font-neuropolitical md:text-6xl font-normal text-gray-900 mb-6">
            Model Library
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Browse our library of open source models that are ready to deploy
            behind an API endpoint in seconds.
          </p>

          {/* CTA Button */}
          <Button className="bg-[#E15929] hover:bg-[#C54A1F] text-white px-8 py-4 text-lg font-medium rounded-none transition-colors duration-200">
            Deploy your Own Models
          </Button>
        </div>

        {/* Search Section */}
        <div className="max-w-4xl mx-auto">
          <div className="relative search-container">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Find A Model"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => searchQuery.trim() && setShowResults(true)}
              className="w-full pl-12 pr-12 py-3 text-lg border focus:outline-none focus:ring-2 focus:ring-[#E15929] focus:border-transparent bg-white text-black"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-4 flex items-center  rounded-r"
              >
                <X className="h-5 w-5 text-gray-400" />
              </button>
            )}

            {/* Search Results Dropdown */}
            {showResults && (
              <div className="absolute top-full mt-1 left-0 right-0 bg-white border border-gray-200 rounded-b-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                {filteredModels.length > 0 ? (
                  <div className="p-2">
                    {filteredModels.map((model) => (
                      <div
                        key={model.id}
                        onClick={() => handleModelClick(model)}
                        className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                      >
                        {/* Model Logo */}
                        <div className="w-10 h-10 flex items-center justify-center mr-3 flex-shrink-0">
                          {model.logo &&
                          (model.logo.startsWith("/") ||
                            model.logo.startsWith("https")) ? (
                            <Image
                              src={model.logo}
                              alt={model.name || "Model"}
                              width={40}
                              height={40}
                              className="rounded"
                            />
                          ) : (
                            <div className="w-10 h-10 bg-gray-200 flex items-center justify-center text-gray-600 font-semibold text-sm rounded">
                              {model.logo ||
                                model.name?.charAt(0).toUpperCase() ||
                                "M"}
                            </div>
                          )}
                        </div>

                        {/* Model Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-gray-900 truncate">
                            {model.name || "Unknown Model"}
                          </h3>
                          <p className="text-xs text-gray-500 truncate">
                            {model.description ||
                              model.type ||
                              "No description"}
                          </p>
                          {model.type && (
                            <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded mt-1">
                              {model.type}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}

                    {searchQuery.trim() && (
                      <div className="p-3 text-center text-sm text-gray-500 border-t border-gray-100">
                        Showing {filteredModels.length} result
                        {filteredModels.length !== 1 ? "s" : ""}
                        {filteredModels.length === 8 &&
                          " (limited to 8 results)"}
                      </div>
                    )}
                  </div>
                ) : searchQuery.trim() ? (
                  <div className="p-4 text-center text-gray-500">
                    <p>No models found for &ldquo;{searchQuery}&rdquo;</p>
                    <p className="text-sm mt-1">
                      Try searching with different keywords
                    </p>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelHero;
