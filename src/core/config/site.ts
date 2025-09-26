import { SiteConfig } from "@/core/types";

import { env } from "@/core/config/env.mjs";

export const siteConfig: SiteConfig = {
  name: "iDevX - AI Solutions for Business Success",
  author: "iDevX Team",
  description:
    "iDevX empowers businesses with domain-focused AI services and innovative products. From Education, Healthcare, and Law Firms to Travel, Food, Enterprises, and Creators - we deliver cutting-edge AI solutions tailored to your industry needs.",
  keywords: [
    "AI solutions",
    "artificial intelligence",
    "business AI",
    "AI for education",
    "AI for healthcare",
    "AI for legal",
    "AI for travel",
    "AI models",
    "machine learning",
    "automation",
    "business intelligence",
    "AI consulting",
    "custom AI development",
    "AI integration",
    "enterprise AI",
  ],
  url: {
    base: env.NEXT_PUBLIC_APP_URL,
    author: "https://idevx.com",
  },
  links: {
    github: "https://github.com/idevx",
    twitter: "https://twitter.com/idevx",
    linkedin: "https://linkedin.com/company/idevx",
  },
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/images/og-image.jpg`,
};
