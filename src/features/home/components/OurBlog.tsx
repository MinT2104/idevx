"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/ui/components/button";

interface BlogItem {
  id: string;
  title: string;
  description: string;
  logo: string;
  logoAlt: string;
  buttonText?: string;
  slug: string;
}

interface OurBlogProps {
  title?: string;
  blogs?: BlogItem[];
}

const OurBlog: React.FC<OurBlogProps> = ({
  title = "Our Blog",
  blogs = [],
}) => {
  const router = useRouter();
  return (
    <div className="py-8 md:py-16 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
            {title}
          </h2>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white border border-[#A9A9A9] p-4 md:p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex h-[150px] items-start space-x-3 md:space-x-4">
                {/* Logo */}
                <div className="flex-shrink-0 h-full">
                  <div className="aspect-square h-full bg-[#A9A9A9] flex items-center justify-center">
                    <Image
                      src={blog.logo}
                      alt={blog.logoAlt}
                      width={0}
                      height={0}
                      sizes="100%"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between h-full w-full">
                  <div className="flex-1">
                    <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1 md:mb-2 line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 text-xs md:text-sm line-clamp-2 min-h-[2.5rem]">
                      {blog.description || "No description available"}
                    </p>
                  </div>

                  {/* Read More Button */}
                  <div
                    onClick={() => {
                      router.push(`/blog/${blog.slug}`);
                    }}
                    className="flex justify-end mt-3 md:mt-4"
                  >
                    <Button
                      variant="outline"
                      className="px-3 md:px-4 py-1.5 md:py-2 border border-gray-500 text-black font-medium text-xs md:text-sm rounded-none"
                    >
                      {blog.buttonText}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurBlog;
