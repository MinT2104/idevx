"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Button } from "@/ui/components/button";

const ModelHero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="relative min-h-fit bg-white">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Model Library
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Browse our library of open source models that are ready to deploy
              behind an API endpoint in seconds.
            </p>
            <Button className="bg-[#E15929] hover:bg-[#C54A1F] text-white px-8 py-4 text-lg font-medium rounded-none transition-colors duration-200">
              Deploy your Own Models
            </Button>
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
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Find A Model"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 text-lg border focus:outline-none focus:ring-2 focus:ring-[#E15929] focus:border-transparent bg-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelHero;
