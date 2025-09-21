import { Button } from "@/ui/components/button";
import React from "react";

const ExporeDevxToday = () => {
  return (
    <div className="text-center py-16">
      <h2 className="text-5xl font-neuropolitical text-center font-normal text-gray-900 mb-8">
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
  );
};

export default ExporeDevxToday;
