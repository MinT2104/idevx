"use client";

import { ReactNode } from "react";
import { checkSolutionAndRedirect } from "@/core/utils/solution-redirect";

interface SolutionLinkProps {
  solutionKey: string;
  redirectPath: string;
  fallbackPath?: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

/**
 * Component that checks if a solution exists before redirecting
 * If solution doesn't exist, redirects to quotation page
 */
export default function SolutionLink({
  solutionKey,
  redirectPath,
  fallbackPath = "/talk-to-us",
  children,
  className,
  onClick,
}: SolutionLinkProps) {
  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();

    // Call custom onClick if provided
    if (onClick) {
      onClick();
    }

    // Check solution and redirect
    await checkSolutionAndRedirect(solutionKey, redirectPath, fallbackPath);
  };

  return (
    <button className={className} onClick={handleClick} type="button">
      {children}
    </button>
  );
}
