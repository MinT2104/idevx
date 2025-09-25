"use client";
import HeroSection from "@/features/shared/common/HeroSection";
import { useMemo, useState, useEffect, useCallback } from "react";
import BlogCard from "../components/BlogCard";
import { Input } from "@/ui/components/input";
import { Button } from "@/ui/components/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ALLOWED_BLOG_CATEGORIES,
  normalizePrimaryCategory,
} from "@/features/blog/constants";

interface BlogCard {
  id: number;
  title: string;
  description: string;
  category: string[];
  author: string;
  authorCount: number;
  image: string;
  subtitle?: string;
  slug?: string;
}

type BlogViewProps = { posts: any[] };

const BlogView = ({ posts: serverPosts }: BlogViewProps) => {
  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");
  const router = useRouter();
  const pageSize = 6;
  const posts = serverPosts;

  const tabs = useMemo(() => {
    // Extract all unique categories from posts
    const allCategories = new Set<string>();
    posts.forEach((post: any) => {
      if (
        post.taxonomy?.categories &&
        Array.isArray(post.taxonomy.categories)
      ) {
        post.taxonomy.categories.forEach((cat: string) => {
          allCategories.add(cat);
        });
      }
    });

    // Convert to array and sort
    const uniqueCategories = Array.from(allCategories).sort();

    return ["All", ...uniqueCategories];
  }, [posts]);

  const blogCards: BlogCard[] = useMemo(
    () =>
      posts.map((p: any, idx: number) => ({
        id: idx + 1,
        title: p.title,
        description: p.excerpt || p.subtitle || p.seo?.metaDescription || "",
        category: p.taxonomy.categories || [],
        author: p.authors[0]?.name || "DevX Editorial",
        authorCount: p.authors.length,
        image: p.cardImage?.url || p.heroImage?.url || "",
        subtitle: p.subtitle,
        slug: p.slug,
      })),
    [posts]
  );

  const filteredCards = useMemo(() => {
    const byCategory =
      activeTab === "All"
        ? blogCards
        : blogCards.filter((card) => {
            // Find the original post to check all categories
            const originalPost = posts.find((p: any) => p.slug === card.slug);
            const postCategories = originalPost?.taxonomy?.categories || [];
            return postCategories.some(
              (cat: string) => cat.toLowerCase() === activeTab.toLowerCase()
            );
          });

    const q = query.trim().toLowerCase();
    if (!q) return byCategory;
    return byCategory.filter((card) => {
      return (
        card.title.toLowerCase().includes(q) ||
        (card.description || "").toLowerCase().includes(q) ||
        (card.author || "").toLowerCase().includes(q)
      );
    });
  }, [activeTab, blogCards, query, posts]);

  const pageCount = Math.max(1, Math.ceil(filteredCards.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, pageCount);
  const pagedCards = filteredCards.slice(
    (safeCurrentPage - 1) * pageSize,
    safeCurrentPage * pageSize
  );

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearchText(searchText), 300);
    return () => clearTimeout(t);
  }, [searchText]);

  const searchResults = useMemo(() => {
    const q = debouncedSearchText.trim().toLowerCase();
    if (!q) return [] as BlogCard[];
    return blogCards
      .filter((card) => (card.title || "").toLowerCase().includes(q))
      .slice(0, 8);
  }, [blogCards, debouncedSearchText]);

  const closeSearch = useCallback(() => {
    setIsSearchOpen(false);
    setSearchText("");
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSearch();
    };
    if (isSearchOpen) {
      window.addEventListener("keydown", onKey);
    }
    return () => window.removeEventListener("keydown", onKey);
  }, [isSearchOpen, closeSearch]);

  const handleSearchSubmit = useCallback(() => {
    const first = searchResults[0];
    if (first?.slug) {
      closeSearch();
      router.push(`/blog/${first.slug}`);
    }
  }, [router, searchResults, closeSearch]);

  return (
    <div>
      <HeroSection
        title="Blog"
        description="Expert guides and engineering deep dives to help you ship faster, scale easier, and learn along the way."
        buttons={[
          {
            text: "Get Started",
            variant: "outline",
            size: "lg",
            link: "/",
          },
          {
            text: "Talk to an Expert",
            variant: "default",
            size: "lg",
            className: "bg-orange-600 hover:bg-orange-700 text-white",
            link: "/talk-to-us",
          },
        ]}
      />

      <div className="w-full bg-white">
        <div className="container mx-auto px-4 py-16 max-w-7xl">
          {/* Navigation Tabs */}
          <div className="flex flex-wrap items-center justify-between mb-8 ">
            <div className="flex flex-wrap gap-4 mb-4 md:mb-0">
              {tabs.map((tab) => (
                <Button
                  variant="outline"
                  key={tab}
                  onClick={() => handleTabClick(tab)}
                  className={`px-4 h-10 py-2 text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? "text-white bg-[#E15929] border-2 border-[#E15929] after:bg-transparent before:bg-transparent"
                      : "text-gray-600 border border-gray-400 hover:text-gray-900"
                  }`}
                >
                  {tab}
                </Button>
              ))}
            </div>

            {/* Search */}
            <div className="flex items-center gap-2 text-gray-600 mt-0">
              <Button
                onClick={() => setIsSearchOpen(true)}
                className="h-10 hover:bg-white flex flex-row items-center justify-center"
                variant="outline"
              >
                Search
              </Button>
            </div>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {pagedCards.map((card) => (
              <BlogCard key={card.id} card={card} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2">
            <button
              className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-40"
              disabled={safeCurrentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15,18 9,12 15,6"></polyline>
              </svg>
            </button>

            {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setCurrentPage(n)}
                className={`px-3 py-2 text-sm font-medium rounded ${
                  n === safeCurrentPage
                    ? "text-white bg-red-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {n}
              </button>
            ))}

            <button
              className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-40"
              disabled={safeCurrentPage === pageCount}
              onClick={() => setCurrentPage((p) => Math.min(pageCount, p + 1))}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9,18 15,12 9,6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 backdrop-blur-sm bg-black/40"
          onClick={closeSearch}
        >
          <div
            className="w-full max-w-xl bg-white text-black rounded-lg shadow-xl p-4 sm:p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              aria-label="Close search"
              className="absolute -right-4 -top-4 p-1 rounded-full bg-gray-100"
              onClick={closeSearch}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <Input
                autoFocus
                placeholder="Search posts by title, author, or text..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearchSubmit();
                }}
                className="h-11 bg-white text-black focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            {searchText && (
              <div className="mt-3 border border-gray-200 rounded-md max-h-96 overflow-auto">
                {searchResults.length === 0 ? (
                  <div className="px-3 py-2 text-sm text-gray-500">
                    No results
                  </div>
                ) : (
                  <ul className="divide-y divide-gray-200">
                    {searchResults.map((r) => (
                      <li
                        key={r.id}
                        className="px-3 py-2 cursor-pointer hover:bg-gray-50"
                        onClick={() => {
                          closeSearch();
                          if (r.slug) router.push(`/blog/${r.slug}`);
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 flex-shrink-0 overflow-hidden rounded">
                            {r.image ? (
                              <Image
                                src={r.image}
                                alt={r.title}
                                width={40}
                                height={40}
                                className="w-10 h-10 object-cover"
                              />
                            ) : (
                              <div className="w-10 h-10 bg-gray-200" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-medium truncate">
                              {r.title}
                            </div>
                            <div className="text-xs text-gray-500 truncate">
                              {r.category} • {r.author}
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogView;
