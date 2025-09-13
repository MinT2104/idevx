"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/ui/components/button";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const menuItems = [
    { label: "Products", hasDropdown: true },
    { label: "Solutions", hasDropdown: true },
    { label: "Company", hasDropdown: true },
    { label: "Resources", hasDropdown: true },
  ];

  return (
    <header className="bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Logo"
              height={0}
              width={0}
              className="w-auto h-[32px]"
              sizes="100vw"
            />
          </Link>
          {/* Navigation Menu */}
          <nav className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => isMounted && setActiveDropdown(item.label)}
                onMouseLeave={() => isMounted && setActiveDropdown(null)}
              >
                <button className="flex items-center text-black hover:text-gray-900 font-medium transition-colors duration-200">
                  {item.label}
                  {item.hasDropdown && <ChevronDown className="ml-1 h-4 w-4" />}
                </button>

                {/* Dropdown placeholder */}
                {isMounted &&
                  activeDropdown === item.label &&
                  item.hasDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-2">
                      <div className="px-4 py-2 text-sm text-gray-500">
                        Dropdown menu items
                      </div>
                    </div>
                  )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="flex-shrink-0">
            <Button className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-medium transition-colors duration-200">
              Book a Demo
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-gray-900">
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
