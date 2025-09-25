"use client";
import Link from "next/link";
import { Button } from "@/ui/components/button";
import { Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-8xl font-bold text-gray-200 mb-4">404</div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Oops! Page Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            The blog post you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
          <p className="text-gray-500">
            It might be a draft, archived, or the URL might be incorrect.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Link href="/blog">
            <Button className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2">
              <span>Back to Blog</span>
            </Button>
          </Link>

          <Link href="/">
            <Button
              variant="outline"
              className="border-gray-300 text-gray-700 px-6 py-3 transition-colors flex items-center space-x-2"
            >
              <span>Go Home</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
