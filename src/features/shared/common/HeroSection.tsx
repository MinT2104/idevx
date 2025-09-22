"use client";
import React from "react";
import { Button } from "@/ui/components/button";
import { useRouter } from "next/navigation";

const HeroSection = ({
  title,
  description,
  ctaButton,
  ctaButton2,
  subtitle,
  link1,
  link2,
}: {
  title: string;
  description: string;
  ctaButton: string;
  ctaButton2: string;
  subtitle?: string;
  link1: string;
  link2: string;
}) => {
  const router = useRouter();
  return (
    <>
      <div className="min-h-[30vh] md:min-h-[40vh] relative z-10 gap-6 flex flex-col items-center justify-start px-4 sm:px-6 lg:px-8 text-center pt-20 mb-10 md:mb-20">
        {/* Main heading */}
        <h1
          className="text-gray-800 mb-4 font-['Neuropolitical'] text-center"
          style={{
            fontFamily: "Neuropolitical",
            fontWeight: 400,
            fontStyle: "Regular",
            fontSize: "clamp(32px, 4.5vw, 60px)",
            lineHeight: "100%",
            letterSpacing: "0%",
            textAlign: "center",
            verticalAlign: "middle",
          }}
        >
          {title}
          <br />
          {subtitle && subtitle}
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-5xl mx-auto mb-6 sm:mb-8 leading-relaxed px-2">
          {description}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center w-full sm:w-auto">
          <Button
            size="sm"
            className="w-full sm:w-auto px-6 sm:px-8 py-2 text-sm sm:text-base font-medium bg-white text-black border border-gray-300 hover:bg-gray-50 transition-colors rounded-none"
            onClick={() => router.push("/")}
          >
            {ctaButton}
          </Button>
          <Button
            size="sm"
            className="w-full sm:w-auto px-6 sm:px-8 py-2 text-sm sm:text-base font-medium bg-orange-500 hover:bg-orange-600 text-white border-0 transition-colors rounded-none"
            onClick={() => router.push("/talk-to-us")}
          >
            {ctaButton2}
          </Button>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
