"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Menu } from "lucide-react";
import { Button } from "@/ui/components/button";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerClose,
} from "@/ui/components/drawer";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/core/utils/utils";

interface DropdownItem {
  label: string;
  href: string;
  category?: string;
}

interface MenuItem {
  label: string;
  hasDropdown: boolean;
  dropdownItems?: DropdownItem[];
}

const Header = () => {
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<
    string | null
  >(null);
  // const [isMounted, setIsMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // setIsMounted(true);

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const menuItems: MenuItem[] = [
    {
      label: "Products",
      hasDropdown: true,
      dropdownItems: [
        { label: "Study AI", href: "/product/study-ai" },
        { label: "Healthy AI", href: "/product/healthy-ai" },
        { label: "Legal AI", href: "/product/legal-ai" },
        { label: "Travel AI", href: "/product/travel-ai" },
      ],
    },
    {
      label: "Solutions",
      hasDropdown: true,
      dropdownItems: [
        // GEN AI section items
        {
          label: "Image Processing",
          href: "/solution/image-processing",
          category: "GEN AI",
        },
        {
          label: "Speech to Text",
          href: "/solution/speech-to-text",
          category: "GEN AI",
        },
        {
          label: "Text to Speech",
          href: "/solution/text-to-speech",
          category: "GEN AI",
        },
        {
          label: "Embedding",
          href: "/solution/embedding",
          category: "GEN AI",
        },
        {
          label: "Process Automation",
          href: "/solution/process-automation",
          category: "GEN AI",
        },
        { label: "AI Agent", href: "/solution/ai-agent", category: "GEN AI" },
        // Agentic AI section items
        {
          label: "Agentic AI",
          href: "/solution/agentic-ai",
          category: "Agentic AI",
        },
        {
          label: "Text to Song",
          href: "/solution/text-to-song",
          category: "Agentic AI",
        },
      ],
    },
    {
      label: "Company",
      hasDropdown: true,
      dropdownItems: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms and Conditions", href: "/terms" },
        { label: "Refund Policy", href: "/refund" },
      ],
    },
    {
      label: "Resources",
      hasDropdown: true,
      dropdownItems: [
        { label: "Model Library", href: "/models" },
        { label: "Blog", href: "/blog" },
        { label: "Partner", href: "/partner" },
        { label: "Careers", href: "/careers" },
        { label: "Contact Us", href: "/talk-to-us" },
      ],
    },
  ];

  return (
    <div
      className={cn(
        "z-50 sticky top-0 flex justify-center px-4",
        isScrolled
          ? "bg-transparent pt-2"
          : "bg-white w-full scale-100 opacity-100"
      )}
    >
      <header
        className={cn(
          "scale-100 opacity-100",
          isScrolled
            ? "bg-black rounded-lg shadow-xl w-full md:w-fit"
            : "bg-white w-full scale-100 opacity-100"
        )}
      >
        <div
          className={cn(
            "mx-auto px-4 sm:px-6 lg:px-8",
            isScrolled ? "max-w-full md:max-w-fit" : "max-w-7xl"
          )}
        >
          <div
            className={cn(
              "flex items-center transition-all duration-700 ease-out",
              isScrolled
                ? "h-16 justify-between md:justify-center"
                : "h-20 justify-between"
            )}
          >
            {/* Logo - Always on the left */}
            <div className="flex-shrink-0">
              {!isScrolled ? (
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
              ) : (
                <Link href="/">
                  <Image
                    src="/images/logo_no_text.png"
                    alt="Logo"
                    height={0}
                    width={0}
                    className="w-auto h-[32px]"
                    sizes="100vw"
                  />
                </Link>
              )}
            </div>

            {/* Desktop Navigation Menu */}
            <nav
              className={cn(
                "hidden md:flex space-x-8 transition-all duration-700 ease-out",
                isScrolled ? "px-6 py-2" : "px-4 sm:px-6 lg:px-8 py-3"
              )}
            >
              {menuItems.map((item) => (
                <div key={item.label} className="relative group">
                  <button
                    className={cn(
                      "flex items-center font-medium transition-all duration-500 ease-out",
                      isScrolled
                        ? "text-white hover:text-gray-300 transform hover:scale-105"
                        : "text-black hover:text-gray-900"
                    )}
                  >
                    {item.label}
                    {item.hasDropdown && (
                      <ChevronDown className="ml-1 h-4 w-4 group-hover:rotate-180 transition-transform duration-200" />
                    )}
                  </button>

                  {/* Dropdown Menu - CSS only with group-hover */}
                  {item.hasDropdown && (
                    <div
                      className={cn(
                        "absolute top-full left-0 mt-2 rounded-md shadow-sm border py-3 px-2 transition-all duration-300 ease-out transform z-50",
                        "opacity-0 invisible group-hover:opacity-100 group-hover:visible",
                        "scale-95 group-hover:scale-100",
                        // Fit content width
                        "w-max min-w-60",
                        isScrolled
                          ? "bg-gray-800 border-gray-600"
                          : "bg-white border-gray-200"
                      )}
                    >
                      <div className="w-max">
                        <p className="text-base font-medium text-gray-500 px-4 py-2 whitespace-nowrap">
                          {item.label}
                        </p>
                      </div>
                      {/* Special layout for Solutions with categories */}
                      {item.label === "Solutions" ? (
                        <div className="grid grid-cols-2 gap-6 w-max">
                          {/* GEN AI Column */}
                          <div className="space-y-1">
                            <div className="px-4 py-2 mb-2">
                              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                                GEN AI
                              </h4>
                            </div>
                            {item.dropdownItems
                              ?.filter((item) => item.category === "GEN AI")
                              .map((dropdownItem, index) => (
                                <Link
                                  key={index}
                                  href={dropdownItem.href}
                                  className={cn(
                                    "block px-4 py-2.5 text-base whitespace-nowrap font-medium transition-all duration-200 ease-out",
                                    isScrolled
                                      ? "text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10"
                                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                                  )}
                                >
                                  {dropdownItem.label}
                                </Link>
                              ))}
                          </div>

                          {/* Agentic AI Column */}
                          <div className="space-y-1">
                            <div className="px-4 py-2 mb-2">
                              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                                Agentic AI
                              </h4>
                            </div>
                            {item.dropdownItems
                              ?.filter((item) => item.category === "Agentic AI")
                              .map((dropdownItem, index) => (
                                <Link
                                  key={index}
                                  href={dropdownItem.href}
                                  className={cn(
                                    "block px-4 py-2.5 text-base whitespace-nowrap font-medium transition-all duration-200 ease-out",
                                    isScrolled
                                      ? "text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10"
                                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                                  )}
                                >
                                  {dropdownItem.label}
                                </Link>
                              ))}
                          </div>
                        </div>
                      ) : (
                        /* Regular layout for other dropdowns - 2 columns if more than 4 items */
                        <div
                          className={cn(
                            "w-max",
                            item.dropdownItems && item.dropdownItems.length > 4
                              ? "grid grid-cols-2 gap-1"
                              : "space-y-1 w-full"
                          )}
                        >
                          {item.dropdownItems?.map((dropdownItem, index) => (
                            <Link
                              key={index}
                              href={dropdownItem.href}
                              className={cn(
                                "block px-4 py-2.5 text-base whitespace-nowrap font-medium transition-all duration-200 ease-out",
                                isScrolled
                                  ? "text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10"
                                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                              )}
                            >
                              {dropdownItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Desktop Book Demo Button */}
            <div className="hidden md:block flex-shrink-0">
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

            {/* Mobile Menu Button - Always on the right */}
            <div className="md:hidden">
              <Drawer>
                <DrawerTrigger asChild>
                  <button
                    className={cn(
                      "transition-all duration-500 ease-out",
                      isScrolled
                        ? "text-white hover:text-gray-300 transform hover:scale-110"
                        : "text-gray-700 hover:text-gray-900"
                    )}
                  >
                    <Menu className="h-6 w-6" />
                  </button>
                </DrawerTrigger>
                <DrawerContent className="bg-white">
                  <div className="px-4 py-6">
                    {/* Logo Section */}
                    <div className="mb-8">
                      <DrawerClose asChild>
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
                      </DrawerClose>
                    </div>

                    {/* Mobile Navigation Items */}
                    <nav className="space-y-2">
                      {menuItems.map((item) => (
                        <div key={item.label}>
                          <button
                            className="flex items-center justify-between w-full text-left font-medium text-gray-900 hover:text-gray-600 py-3 text-lg"
                            onClick={() => {
                              if (item.hasDropdown) {
                                setActiveMobileDropdown(
                                  activeMobileDropdown === item.label
                                    ? null
                                    : item.label
                                );
                              }
                            }}
                          >
                            {item.label}
                            {item.hasDropdown && (
                              <ChevronDown
                                className={cn(
                                  "h-4 w-4 text-gray-900 transition-transform duration-200",
                                  activeMobileDropdown === item.label &&
                                    "rotate-180"
                                )}
                              />
                            )}
                          </button>

                          {/* Mobile Dropdown */}
                          {item.hasDropdown &&
                            activeMobileDropdown === item.label && (
                              <div className="ml-4 mt-2 space-y-2">
                                {item.dropdownItems?.map(
                                  (dropdownItem, index) => (
                                    <DrawerClose asChild key={index}>
                                      <Link
                                        href={dropdownItem.href}
                                        className="block text-base text-gray-600 hover:text-gray-900 py-2 font-medium"
                                      >
                                        {dropdownItem.label}
                                      </Link>
                                    </DrawerClose>
                                  )
                                )}
                              </div>
                            )}
                        </div>
                      ))}
                    </nav>

                    {/* Mobile Book Demo Button */}
                    <div className="mt-6">
                      <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-none">
                        Book a Demo
                      </Button>
                    </div>
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
