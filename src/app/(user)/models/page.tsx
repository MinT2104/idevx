import type { Metadata } from "next";
import ModelsView from "@/features/models/view/ModelsView";
import {
  getModelsForView,
  getTypes,
} from "@/features/models/services/models.service";

export const metadata: Metadata = {
  title: "AI Models - iDevX",
  description:
    "Explore our comprehensive collection of AI models for various industries. From LLM and transcription to image generation and speech processing - find the perfect AI solution for your business needs.",
  keywords: [
    "AI models",
    "LLM",
    "transcription",
    "text to speech",
    "image generation",
    "embedding",
    "speech to text",
    "image processing",
    "machine learning models",
    "AI tools",
  ],
  openGraph: {
    title: "AI Models - iDevX",
    description:
      "Explore our comprehensive collection of AI models for various industries and business needs.",
    type: "website",
    images: [
      {
        url: "/images/og-models.jpg",
        width: 1200,
        height: 630,
        alt: "AI Models - iDevX",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Models - iDevX",
    description:
      "Explore our comprehensive collection of AI models for various industries and business needs.",
    images: ["/images/og-models.jpg"],
  },
  alternates: {
    canonical: "/models",
  },
};

// Force dynamic rendering to avoid build-time issues
export const dynamic = "force-dynamic";

const page = async () => {
  try {
    // Fetch data server-side - sử dụng hàm tối ưu hóa
    const [modelsData, types] = await Promise.all([
      getModelsForView(1, 1000), // page 1, limit 1000 - chỉ fetch fields cần thiết
      getTypes(),
    ]);

    console.log(types);

    return (
      <ModelsView
        initialModels={modelsData.models}
        totalModels={modelsData.total}
        currentPage={modelsData.page}
        totalPages={modelsData.totalPages}
      />
    );
  } catch (error) {
    console.error("Error fetching models data:", error);
    // Fallback với empty data
    return (
      <ModelsView
        initialModels={[]}
        totalModels={0}
        currentPage={1}
        totalPages={0}
      />
    );
  }
};

export default page;
