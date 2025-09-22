import React from "react";
import Link from "next/link";

type BlogCardProps = {
  card: {
    id: number;
    title: string;
    description: string;
    category: string;
    author: string;
    authorCount: number;
    image: string;
    subtitle?: string;
    slug?: string;
  };
};

const BlogCard = ({ card }: BlogCardProps) => {
  return (
    <Link
      href={card?.slug ? `/blog/${card.slug}` : "#"}
      className="block bg-white border border-[#A9A9A9] overflow-hidden cursor-pointer transition-shadow relative"
    >
      {/* Card Content */}
      <div className="p-6">
        {/* Image/Logo Section */}
        <div className="mb-4">
          {card?.image ? (
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-32 object-cover rounded-lg"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <svg
                  className="w-16 h-16 text-gray-400 mx-auto mb-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-sm text-gray-500">Image Placeholder</p>
              </div>
            </div>
          )}
        </div>

        {/* Category Tag */}
        <div className="mb-3">
          <span className="inline-block px-3 py-1 border border-[#A9A9A9 text-gray-700 text-xs font-medium">
            {card?.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {card?.description}
        </h3>

        {/* Author */}
        <div className="flex items-center gap-3">
          <div className="flex -space-x-3">
            {/* Main author profile */}
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-semibold">
              {card?.author.charAt(0)}
            </div>

            {/* Additional author profiles */}
            {card?.authorCount > 0 && (
              <>
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-semibold">
                  {card?.authorCount >= 1 ? "A" : ""}
                </div>
                {card?.authorCount > 1 && (
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-semibold">
                    {card?.authorCount >= 2 ? "B" : ""}
                  </div>
                )}
                {card?.authorCount > 2 && (
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-semibold">
                    {card?.authorCount >= 3 ? "C" : ""}
                  </div>
                )}
                {card?.authorCount > 3 && (
                  <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-semibold">
                    +
                  </div>
                )}
              </>
            )}
          </div>

          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-900">
              {card?.author}
            </span>
            {card.authorCount > 0 && (
              <span className="text-xs text-gray-500">
                +{card.authorCount} other
                {card?.authorCount > 1 ? "s" : ""}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
