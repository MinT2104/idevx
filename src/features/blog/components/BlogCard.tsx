import React from "react";
import Link from "next/link";
import LazyImage from "@/features/shared/components/LazyImage";

type BlogCardProps = {
  card: {
    id: number;
    title: string;
    description: string;
    category: string[];
    author: string;
    authorCount: number;
    image: string;
    subtitle?: string;
    slug?: string;
  };
};

const BlogCard = ({ card }: BlogCardProps) => {
  console.log(card);
  return (
    <Link
      href={card?.slug ? `/blog/${card.slug}` : "#"}
      className="block bg-white border border-[#A9A9A9] overflow-hidden cursor-pointer transition-shadow relative"
    >
      {/* Card Content */}
      <div className="p-6">
        {/* Image/Logo Section */}
        <div className="mb-4 overflow-hidden rounded-lg h-32">
          {card?.image ? (
            <LazyImage
              src={card.image}
              alt={card.title}
              width={400}
              height={128}
              className="w-full h-32 object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              quality={85}
              threshold={0.1}
              rootMargin="100px"
            />
          ) : (
            <div className="w-full h-32 bg-gray-200"></div>
          )}
        </div>

        {/* Category Tag */}
        <div className="mb-3 space-x-2">
          {card?.category?.map((category, index) => (
            <span
              key={`${category}-${index}`}
              className="inline-block px-3 py-1 border border-[#A9A9A9] text-gray-700 text-xs font-medium"
            >
              {category}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {card?.title}
        </h3>

        {/* Author */}
        <div className="flex items-center gap-3">
          <div className="flex -space-x-3">
            {/* Main author profile */}
            <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
              <img
                src="/images/client_2.png"
                alt={card?.author || "Author"}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Additional author profiles */}
            {card?.authorCount > 1 && (
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-semibold">
                +{card.authorCount - 1}
              </div>
            )}
          </div>

          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-900">
              {card?.author || "DevX Editorial"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
