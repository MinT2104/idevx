"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/ui/components/button";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/core/utils/utils";

const Header = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const menuItems = [
    { label: "Products", hasDropdown: true },
    { label: "Solutions", hasDropdown: true },
    { label: "Company", hasDropdown: true },
    { label: "Resources", hasDropdown: true },
  ];

  return (
    <header
      className={cn(
        "z-50 sticky top-2",
        isScrolled
          ? "left-1/2 transform -translate-x-1/2 translate-y-0 bg-black rounded-lg shadow-xl scale-100 opacity-100 w-fit"
          : "bg-white w-full scale-100 opacity-100"
      )}
    >
      <div
        className={cn(
          "mx-auto px-4 sm:px-6 lg:px-8",
          isScrolled ? "max-w-fit" : "max-w-7xl"
        )}
      >
        <div
          className={cn(
            "flex items-center transition-all duration-700 ease-out",
            isScrolled ? "h-16 justify-center" : "h-20 justify-between"
          )}
        >
          <Link href="/">
            {/* Logo */}
            {!isScrolled ? (
              <Image
                src="/images/logo.png"
                alt="Logo"
                height={0}
                width={0}
                className="w-auto h-[32px]"
                sizes="100vw"
              />
            ) : (
              <Image
                src="/images/logo_no_text.png"
                alt="Logo"
                height={0}
                width={0}
                className="w-auto h-[32px]"
                sizes="100vw"
              />
            )}
          </Link>

          {/* Navigation Menu */}
          <nav
            className={cn(
              "hidden md:flex space-x-8 transition-all duration-700 ease-out",
              isScrolled ? "px-6 py-2" : "px-4 sm:px-6 lg:px-8 py-3"
            )}
          >
            {menuItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => isMounted && setActiveDropdown(item.label)}
                onMouseLeave={() => isMounted && setActiveDropdown(null)}
              >
                <button
                  className={cn(
                    "flex items-center font-medium transition-all duration-500 ease-out",
                    isScrolled
                      ? "text-white hover:text-gray-300 transform hover:scale-105"
                      : "text-black hover:text-gray-900"
                  )}
                >
                  {item.label}
                  {item.hasDropdown && <ChevronDown className="ml-1 h-4 w-4" />}
                </button>

                {/* Dropdown placeholder */}
                {isMounted &&
                  activeDropdown === item.label &&
                  item.hasDropdown && (
                    <div
                      className={cn(
                        "absolute top-full left-0 mt-2 w-48 rounded-md shadow-lg border py-2 transition-all duration-500 ease-out transform",
                        isScrolled
                          ? "bg-gray-800 border-gray-600 scale-100 opacity-100"
                          : "bg-white border-gray-200 scale-95 opacity-0"
                      )}
                    >
                      <div
                        className={cn(
                          "px-4 py-2 text-sm transition-all duration-500 ease-out",
                          isScrolled ? "text-gray-300" : "text-gray-500"
                        )}
                      >
                        Dropdown menu items
                      </div>
                    </div>
                  )}
              </div>
            ))}
          </nav>

          <div className="flex-shrink-0">
            <Button
              className={cn(
                "cursor-pointer px-6 py-2 font-medium transition-all duration-500 ease-out rounded-none",
                isScrolled
                  ? "bg-white text-black hover:bg-gray-100"
                  : "bg-orange-500 hover:bg-orange-600 text-white"
              )}
            >
              Book a Demo
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              className={cn(
                "transition-all duration-500 ease-out",
                isScrolled
                  ? "text-white hover:text-gray-300 transform hover:scale-110"
                  : "text-gray-700 hover:text-gray-900"
              )}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
