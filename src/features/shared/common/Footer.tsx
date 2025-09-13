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

  const navigationSections = [
    {
      title: "Product",
      links: ["Dedicated deployments", "Model APIs", "Training"],
    },
    {
      title: "Inference Stack",
      links: ["Model Runtimes", "Infrastructure", "Multi Cloud Capacity"],
    },
    {
      title: "Developer Experience",
      links: ["Chains", "Model Management"],
    },
    {
      title: "Deployment Options",
      links: ["Dev X Cloud", "Self-hosted", "Hybrid"],
    },
    {
      title: "Solutions",
      links: [
        "Transcription",
        "Image generation",
        "Text-to-speech",
        "Large language model",
        "Compound AI",
        "Embeddings",
      ],
    },
    {
      title: "Developer",
      links: ["Documentation", "Model library", "Changelog"],
    },

    {
      title: "Resources",
      links: ["Blog", "Guides", "Events", "Customers", "Careers", "Contact us"],
    },
    {
      title: "Popular model",
      links: [
        "GPT OSS 120B",
        "GPT OSS 20B",
        "Qwen image",
        "Orpheus TTS",
        "Kimi K2",
        "Qwen3 Coder 480B",
        "Explore All",
      ],
    },
    {
      title: "Legal",
      links: [
        "Terms and Conditions",
        "Privacy Policy",
        "Service Level Agreement",
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
    return (
      <footer className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12">
            <div className="mb-8 lg:mb-0">
              <Link href="/">
                <Image
                  src="/images/logo_white.png"
                  alt="Logo"
                  height={0}
                  width={0}
                  className="w-auto h-[50px]"
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
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex items-start gap-6">
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

        {/* Navigation Columns - Pinterest Masonry Layout */}
        <div className="flex-1 w-full columns-2 md:columns-3 lg:columns-4 gap-6 mb-12">
          {navigationSections.map((section, index) => (
            <div key={index} className="break-inside-avoid mb-8">
              <h3 className="font-semibold text-white text-sm mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href="#"
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
      </div>
      {/* Bottom Section */}
      <div className="flex flex-col lg:flex-row justify-between items-center pt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ">
        {/* System Status */}
        <div className="flex-shrink-0">
          <div className="flex items-center bg-[#E99E83] text-gray-800 px-4 py-2">
            <div className="w-2 h-2 bg-[#E15929] rounded-full mr-2"></div>
            <span className="text-sm text-[#E15929] font-medium">
              ALL SYSTEM NORMAL
            </span>
          </div>
        </div>

        {/* Copyright and Certifications */}
        <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-6">
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
    </footer>
  );
};

export default Footer;
