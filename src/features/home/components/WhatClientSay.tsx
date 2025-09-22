import React from "react";
import Image from "next/image";

interface TestimonialItem {
  id: string;
  type: "statistic" | "quote";
  statistic?: {
    value: string;
    description: string;
  };
  quote?: {
    text: string;
    person: string;
    position: string;
    image: string;
  };
  company: {
    name: string;
    logo: string;
    imageClass: string;
  };
  client?: {
    name: string;
    logo: string;
  };
}

interface WhatClientSayProps {
  title?: string;
  testimonials?: TestimonialItem[];
}

const WhatClientSay: React.FC<WhatClientSayProps> = ({
  title = "What Our Clients Say",
  testimonials = [],
}) => {
  const renderStatisticCard = (item: TestimonialItem) => (
    <div className="bg-gray-100 col-span-1 w-full h-[220px] relative group cursor-pointer border border-[#A9A9A9]">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="text-3xl font-bold text-gray-900 mb-2 py-3 px-4 border-b border-[#A9A9A9]">
            {item.statistic?.value}
          </div>
          <p className="text-gray-700 text-sm leading-relaxed p-3 pxx-6">
            {item.statistic?.description}
          </p>
        </div>
      </div>
    </div>
  );

  const renderQuoteCard = (item: TestimonialItem) => (
    <div className="bg-gray-100 w-full col-span-2 h-[220px] flex relative group cursor-pointer border border-[#A9A9A9]">
      <div className="h-full aspect-square p-4">
        <Image
          src={item.client?.logo || ""}
          alt={item.client?.name || ""}
          width={0}
          height={0}
          sizes="100%"
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex flex-col justify-between items-start mb-4 p-4">
        <p className="text-gray-700 text-sm leading-relaxed mb-4">
          &ldquo;{item.quote?.text}&rdquo;
        </p>
        <div className="flex-1 flex items-end">
          <Image
            src={item.company.logo}
            alt={item.company.name}
            width={0}
            height={0}
            sizes="100%"
            className={item.company.imageClass}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((item) =>
            item.type === "statistic" ? (
              <div key={item.id} className="col-span-1">
                {renderStatisticCard(item)}
              </div>
            ) : (
              <div key={item.id} className="md:col-span-2">
                {renderQuoteCard(item)}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default WhatClientSay;
