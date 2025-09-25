"use client";

import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import EnhancedErrorBoundary from "./EnhancedErrorBoundary";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export default function MarkdownRenderer({
  content,
  className = "",
}: MarkdownRendererProps) {
  const [retryCount, setRetryCount] = useState(0);

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
  };

  console.log(content);

  if (!content || typeof content !== "string") {
    return (
      <div className="text-gray-500 italic p-4 border border-gray-200 rounded-lg bg-gray-50">
        No content available for this post.
      </div>
    );
  }

  return (
    <EnhancedErrorBoundary onRetry={handleRetry}>
      <div className={`w-full ${className}`} key={retryCount}>
        <div className="markdown-content">
          <MDEditor.Markdown
            source={content}
            data-color-mode="light"
            rehypePlugins={[rehypeHighlight]}
            remarkPlugins={[remarkGfm]}
            style={{
              backgroundColor: "transparent",
              fontSize: "16px",
              lineHeight: "1.6",
            }}
          />
        </div>
      </div>
    </EnhancedErrorBoundary>
  );
}
