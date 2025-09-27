"use client";

import BlogTable from "@/features/admin/components/BlogTable";
import SimpleCronjobManager from "@/features/admin/components/SimpleCronjobManager";
import { Button } from "@/ui/components/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function BlogPageClient() {
  const [activeTab, setActiveTab] = useState<"all" | "automation" | "manual">(
    "all"
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Blog Posts
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your blog content and articles
            </p>
          </div>
          <Link href="/admin/blog/create">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 w-full sm:w-auto">
              <span>Create New Post</span>
            </Button>
          </Link>
        </header>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex flex-wrap space-x-4 sm:space-x-8">
              <button
                onClick={() => setActiveTab("all")}
                className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === "all"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                All Posts
              </button>
              <button
                onClick={() => setActiveTab("manual")}
                className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === "manual"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Manual Posts
              </button>
              <button
                onClick={() => setActiveTab("automation")}
                className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === "automation"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Automation Posts
              </button>
            </nav>
          </div>
        </div>

        {/* Content based on active tab */}
        <div className="space-y-6">
          {activeTab === "automation" && (
            <div className="space-y-6">
              <SimpleCronjobManager />
            </div>
          )}
          <BlogTable blogType={activeTab} />
        </div>
      </main>
    </div>
  );
}
