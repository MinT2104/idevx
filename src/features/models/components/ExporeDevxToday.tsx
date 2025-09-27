"use client";
import { Button } from "@/ui/components/button";
import { useRouter } from "next/navigation";
import React from "react";

interface ExploreProps {
  className?: string;
}

const ExporeDevxToday = ({ className }: ExploreProps) => {
  const router = useRouter();
  return (
    <div className={`${className} text-center py-8 md:py-40 px-4`}>
      <h2 className="text-3xl md:text-5xl font-neuropolitical text-center font-normal text-gray-900 mb-6 md:mb-8">
        Explore DevX Today
      </h2>
      <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center max-w-md mx-auto sm:max-w-none">
        <Button
          variant="outline"
          className="px-6 md:px-8 py-2 md:py-3 text-base md:text-lg bg-white border border-gray-500 text-black rounded-none w-full sm:w-auto"
          onClick={() => router.push("/quotation")}
        >
          Get Started
        </Button>
        <Button
          onClick={() => router.push("/talk-to-us")}
          className="bg-[#E15929] hover:bg-[#C54A1F] text-white px-6 md:px-8 py-2 md:py-3 text-base md:text-lg rounded-none w-full sm:w-auto"
        >
          Talk to an Engineer
        </Button>
      </div>
    </div>
  );
};

export default ExporeDevxToday;
