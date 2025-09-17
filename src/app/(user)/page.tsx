import { Metadata } from "next";
import Hero from "@/features/shared/components/Hero";

export const metadata: Metadata = {
  title: "DevX | AI Solutions Built for Your Success",
  description:
    "DevX empowers businesses with domain-focused AI services and innovative products—from Education, Healthcare, and Law Firms to Travel, Food, Enterprises, and Creators.",
};

export default function Home() {
  return <Hero />;
}
