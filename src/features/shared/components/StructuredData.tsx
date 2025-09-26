"use client";

import { siteConfig } from "@/core/config/site";

interface StructuredDataProps {
  type?: "website" | "organization" | "article" | "product";
  data?: any;
}

export default function StructuredData({
  type = "website",
  data,
}: StructuredDataProps) {
  const baseStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url.base,
    logo: `${siteConfig.url.base}/images/logo.png`,
    sameAs: [
      siteConfig.links.github,
      siteConfig.links.twitter,
      siteConfig.links.linkedin,
    ].filter(Boolean),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "contact@idevx.com",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
    },
    foundingDate: "2024",
    numberOfEmployees: "10-50",
    industry: "Artificial Intelligence",
    services: [
      "AI Consulting",
      "Custom AI Development",
      "AI Integration",
      "Machine Learning Solutions",
      "Business Intelligence",
      "AI for Education",
      "AI for Healthcare",
      "AI for Legal",
      "AI for Travel",
    ],
  };

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url.base,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url.base}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const getStructuredData = () => {
    switch (type) {
      case "organization":
        return baseStructuredData;
      case "website":
        return websiteStructuredData;
      case "article":
        return {
          "@context": "https://schema.org",
          "@type": "Article",
          ...data,
        };
      case "product":
        return {
          "@context": "https://schema.org",
          "@type": "Product",
          ...data,
        };
      default:
        return baseStructuredData;
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData()),
      }}
    />
  );
}
