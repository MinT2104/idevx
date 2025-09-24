"use client";

import Link from "next/link";
import Image from "next/image";
import { Github, Twitter, Linkedin, Youtube } from "lucide-react";
import { useEffect, useState } from "react";

const Footer = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Helper function to get link href based on section and link text (mirrors Header)
  const getLinkHref = (sectionTitle: string, linkText: string): string => {
    const toSlug = (s: string) =>
      s
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    switch (sectionTitle) {
      case "Products": {
        switch (linkText) {
          case "Study AI":
            return "/product/study-ai";
          case "Healthy AI":
            return "/product/healthy-ai";
          case "Legal AI":
            return "/product/legal-ai";
          case "Travel AI":
            return "/product/travel-ai";
          default:
            return "#";
        }
      }
      case "Solutions": {
        switch (linkText) {
          case "Image Processing":
            return "/solution/image-processing";
          case "Speech to Text":
            return "/solution/speech-to-text";
          case "Text to Speech":
            return "/solution/text-to-speech";
          case "Embedding":
            return "/solution/embedding";
          case "Process Automation":
            return "/solution/process-automation";
          case "AI Agent":
            return "/solution/ai-agent";
          case "Agentic AI":
            return "/solution/agentic-ai";
          case "Text to Song":
            return "/solution/text-to-song";
          default:
            return "#";
        }
      }
      case "Company": {
        switch (linkText) {
          case "Privacy Policy":
            return "/privacy";
          case "Terms and Conditions":
            return "/terms";
          case "Refund Policy":
            return "/refund";
          default:
            return "#";
        }
      }
      case "Resources": {
        switch (linkText) {
          case "Model Library":
            return "/models";
          case "Blog":
            return "/blog";
          case "Partner":
            return "/partner";
          case "Careers":
            return "/careers";
          case "Contact Us":
            return "/talk-to-us";
          default:
            return "#";
        }
      }
      case "Popular models": {
        return `/models/${toSlug(linkText)}`;
      }
      default:
        return "#";
    }
  };

  // Footer sections aligned with Header
  const navigationSections = [
    {
      title: "Products",
      links: ["Study AI", "Healthy AI", "Legal AI", "Travel AI"],
    },
    {
      title: "Solutions",
      links: [
        "Image Processing",
        "Speech to Text",
        "Text to Speech",
        "Embedding",
        "Process Automation",
        "AI Agent",
        "Agentic AI",
        "Text to Song",
      ],
    },
    {
      title: "Company",
      links: ["Privacy Policy", "Terms and Conditions", "Refund Policy"],
    },
    {
      title: "Resources",
      links: ["Model Library", "Blog", "Partner", "Careers", "Contact Us"],
    },
    {
      title: "Popular models",
      links: [
        "Qwen3 Coder 480B",
        "Kimi K2 0905",
        "GPT OSS 20B",
        "Orpheus TTS",
        "Qwen3 8B Embedding",
        "Whisper V3",
        "Explore All",
      ],
    },
  ];

  const socialLinks = [
    { icon: Github, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Linkedin, href: "#" },
    { icon: Youtube, href: "#" },
  ];

  if (!isMounted) {
    return <footer className="bg-black text-white"></footer>;
  }

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row gap-10 items-start">
        {/* Top Section - Logo and Social */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12">
          <div className="mb-8 lg:mb-0">
            <Link href="/">
              <Image
                src="/images/logo_white.png"
                alt="Logo"
                height={0}
                width={0}
                className="w-auto h-[32px]"
                sizes="100vw"
              />
            </Link>
            <div className="flex space-x-4 mt-4">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="text-white hover:text-orange-400 transition-colors duration-200"
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Columns - Pinterest Masonry Layout with Mobile Fix */}
        <div className="columns-2 sm:columns-3 mx-auto md:columns-3 lg:columns-4 gap-6 mb-12 flex-1">
          {navigationSections.map((section, index) => (
            <div key={index} className="break-inside-avoid mb-8">
              <h3 className="font-semibold text-white text-sm mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={getLinkHref(section.title, link)}
                      className="text-gray-300 hover:text-white text-sm transition-colors duration-200"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
      </div>
      <div className="border-t border-gray-800 pt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          {/* System Status */}
          <div className="flex-shrink-0">
            <div className="flex items-center bg-[#E99E83] text-gray-800 px-4 py-2 rounded">
              <div className="w-2 h-2 bg-[#E15929] rounded-full mr-2"></div>
              <span className="text-sm text-[#E15929] font-medium">
                ALL SYSTEM NORMAL
              </span>
            </div>
          </div>

          {/* Copyright and Certifications */}
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
            <div className="text-gray-300 text-sm">© 2025 Dev X</div>
            <div className="flex items-center space-x-4">
              {/* SOC 2 Badge */}
              <Image
                src="/images/footer_image.png"
                alt="SOC 2 Badge"
                height={0}
                width={0}
                className="w-auto h-[32px]"
                sizes="100vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
