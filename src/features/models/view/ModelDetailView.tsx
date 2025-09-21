"use client";
import React from "react";
import { Button } from "@/ui/components/button";
import HeroSection from "@/features/shared/common/HeroSection";
import ModelSection from "../components/ModelSection";
import ExporeDevxToday from "../components/ExporeDevxToday";

// Pricing data structure
const pricingData = [
  {
    id: "gpt-5-standard",
    variant: "GPT-5 (Standard)",
    bestFor: "Full reasoning, coding, multimodal tasks",
    pricing: {
      input: "$1.25 (cached: $0.125)",
      output: "$10.00",
    },
    provider: "OpenAI",
  },
  {
    id: "gpt-5-mini",
    variant: "GPT-5 Mini",
    bestFor: "Faster, cost-efficient tasks",
    pricing: {
      input: "$0.25 (cached: $0.025)",
      output: "$2.00",
    },
    provider: "OpenAI",
  },
  {
    id: "gpt-5-nano",
    variant: "GPT-5 Nano",
    bestFor: "Ultra-low latency, simple classifications",
    pricing: {
      input: "$0.05 (cached: $0.005)",
      output: "$0.40",
    },
    provider: "OpenAI",
  },
];

// Code examples data structure
const codeExamples = [
  {
    id: "python-example",
    title: "Python",
    language: "Python",
    code: `from openai import OpenAI

client = OpenAI(api_key="YOUR_API_KEY")
resp = client.chat.completions.create(
    model="gpt-5",
    messages=[{"role": "user", "content": "Generate a responsive Pomodoro timer UI in HTML/CSS/JS."}]
)
print(resp.choices[0].message["content"])`,
  },
  {
    id: "nodejs-example",
    title: "Node.js (REST API)",
    language: "js",
    code: `const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: [
        "Authorization": "Bearer \${API_KEY}",
        "Content-Type": "application/json"
    ],
    body: JSON.stringify({
        model: "gpt-5-mini",
        messages: [{"role": "user", "content": "Explain blockchain for beginners."}]
    })
});
const data = await res.json();
console.log(data.choices[0].message.content);`,
  },
  {
    id: "curl-example",
    language: "base",
    title: "Curl",
    code: `curl https://api.openai.com/v1/chat/completions \\
  -H "Authorization: Bearer $API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"model": "gpt-5-nano", "messages":[{"role":"user", "content": "Summarize AI ethics in 3 lines."}]}'`,
  },
];

// Why GPT-5 Matters data structure
const whyGPT5MattersData = {
  title: "Why GPT-5 Matters",
  points: [
    {
      id: "versatility",
      title: "Unmatched Versatility:",
      description:
        "Ideal for developers, analysts, and enterprise users working with code, documents, and tools.",
    },
    {
      id: "efficiency",
      title: "Cost & Performance Efficiency:",
      description:
        "Mini and Nano variants unlock flexibility for fast, scalable production without breaking the bank.",
    },
    {
      id: "safety",
      title: "Safer Outputs:",
      description:
        "Hallucination rates significantly lower; better at partial answers than blunt refusal.",
    },
    {
      id: "integration",
      title: "Enterprise Integration:",
      description:
        "Available via API, ChatGPT tiers (including free), and Microsoft Copilot Studio for enterprise agents.",
    },
  ],
  ctaButton: {
    text: "Read Official OpenAI Docs",
    link: "https://openai.com/docs",
  },
};

// Sidebar model details data structure
const sidebarData = {
  title: "Model Details",
  details: [
    {
      id: "developed-by",
      label: "Developed by",
      value: "DeepSeek",
    },
    {
      id: "model-family",
      label: "Model Family",
      value: "DeepSeek",
    },
    {
      id: "use-case",
      label: "Use case",
      value: "Large language",
    },
    {
      id: "version",
      label: "Version",
      value: "R1",
    },
    {
      id: "variant",
      label: "Variant",
      value: "0528",
    },
    {
      id: "size",
      label: "Size",
      value: "671B",
    },
    {
      id: "hardware",
      label: "Hardware",
      value: "B200",
    },
    {
      id: "license",
      label: "License",
      value: "DeepSeek License Agreement",
    },
    {
      id: "readme",
      label: "Readme",
      value: "View",
      hasLink: true,
    },
  ],
  button: {
    text: "View Repository",
    link: "https://github.com",
  },
};

// Model list data structure
const modelListData = [
  {
    id: "gpt-5",
    name: "GPT-5",
    isActive: true,
  },
  {
    id: "o4-mini",
    name: "o4-Mini",
    isActive: false,
  },
  {
    id: "o3-series",
    name: "o3-Mini / o3 / o3-Pro",
    isActive: false,
  },
  {
    id: "o1-series",
    name: "o1 / o1-Pro",
    isActive: false,
  },
  {
    id: "gpt-4o",
    name: "GPT-4o (Omni)",
    isActive: false,
  },
  {
    id: "gpt-3-5-turbo",
    name: "GPT-3.5-Turbo",
    isActive: false,
  },
  {
    id: "gpt-3-series",
    name: "GPT-3 (Ada → Davinci)",
    isActive: false,
  },
];

const ModelDetailView = () => {
  const handleOpenLink = (url: string) => {
    if (typeof window !== "undefined") {
      window.open(url, "_blank");
    }
  };

  const modelSections = [
    {
      title: "large language models",
      models: [
        {
          logo: "K",
          name: "Kimi K2 0905",
          description: "0905-K2",
          tags: ["LLM"],
        },
        {
          logo: "D",
          name: "DeepSeek V3.1",
          description: "V3.1-B200",
          tags: ["LLM"],
        },
        {
          logo: "Q",
          name: "Qwen3 235B 2507",
          description: "2507",
          tags: ["LLM"],
        },
      ],
      showSeeAll: true,
    },
    {
      title: "DeepSeek models",
      models: [
        {
          logo: "D",
          name: "DeepSeek-R1 Llama 70B",
          description: "R1-LLAMA-TRT-LLM-H100",
          tags: ["LLM"],
        },
        {
          logo: "D",
          name: "DeepSeek V3.1",
          description: "V3.1-B200",
          tags: ["MODEL API", "LLM"],
        },
        {
          logo: "D",
          name: "DeepSeek-R1 Qwen 32B",
          description: "R1-QWEN-TRT-LLM-H100",
          tags: ["LLM"],
        },
      ],
    },
    {
      title: "Trending models",
      models: [
        {
          logo: "S",
          name: "GPT OSS 120B",
          description: "MOE",
          tags: ["MODEL API", "LLM"],
        },
        {
          logo: "S",
          name: "GPT OSS 20B",
          description: "MOE",
          tags: ["LLM"],
        },
        {
          logo: "Q",
          name: "Qwen Image",
          description: "TEXT-TO-IMAGE",
          tags: ["IMAGE GENERATION"],
        },
      ],
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      <HeroSection
        title="Text Generation Models"
        description="Please read these terms and conditions carefully before using Our Service."
        ctaButton="Get Started"
        ctaButton2="Talk to an Expert"
        subtitle="Open AI"
        link1="https://www.google.com"
        link2="https://www.google.com"
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Header Section */}
            <div className="mb-8">
              {/* Last updated */}
              <div className="mb-4">
                <p className="text-xl font-semibold text-black mb-2">
                  Last updated
                </p>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-sm text-gray-600">Aug 2025</span>
                </div>
              </div>

              {/* Main title with copy button */}
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-4xl font-semibold text-gray-900">
                  GPT-5 — OpenAI's Text Generation
                </h1>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  Copy page
                </Button>
              </div>

              {/* Detail section */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Detail :
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  GPT-5 represents OpenAI's most advanced evolution yet,
                  delivering human-level reasoning, multimodal understanding,
                  and high output quality. Released on August 7, 2025, it's
                  crafted for complex coding, extended context workflows,
                  agentic tasks, and safe, reliable interaction—backed by
                  improved affordability and broader accessibility.
                </p>
              </div>
            </div>

            {/* Model Variants & Pricing */}
            <div className="mb-8 ">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Model Variants & Pricing
              </h2>
              {/* Card-like pricing table */}
              <div className="rounded-lg p-4 bg-[#F0F0F0]">
                {/* Header bar */}
                <div className="grid grid-cols-12 items-center px-6 py-3">
                  <div className="col-span-4 text-sm font-bold text-gray-700">
                    Model Variant
                  </div>
                  <div className="col-span-4 text-sm font-bold text-gray-700">
                    Best for
                  </div>
                  <div className="col-span-4 flex items-center justify-between text-sm font-bold text-gray-700">
                    <span>Pricing(per 1M tokens)</span>
                    <svg
                      className="cursor-pointer"
                      width="25"
                      height="25"
                      viewBox="0 0 35 35"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M30.625 0H10.625C8.25 0 6.25 2 6.25 4.375V6.25H5C2.25 6.25 0 8.5 0 11.25V30C0 32.75 2.25 35 5 35H23.75C26.5 35 28.75 32.75 28.75 30V28.75H30.625C33 28.75 35 26.75 35 24.375V4.375C35 2 33 0 30.625 0ZM26.25 30C26.25 31.375 25.125 32.5 23.75 32.5H5C3.625 32.5 2.5 31.375 2.5 30V11.25C2.5 9.875 3.625 8.75 5 8.75H23.75C25.125 8.75 26.25 9.875 26.25 11.25V30ZM32.5 24.375C32.5 25.375 31.625 26.25 30.625 26.25H28.75V11.25C28.75 8.5 26.5 6.25 23.75 6.25H8.75V4.375C8.75 3.375 9.625 2.5 10.625 2.5H30.625C31.625 2.5 32.5 3.375 32.5 4.375V24.375Z"
                        fill="black"
                      />
                    </svg>
                  </div>
                </div>

                {/* Rows */}
                <div className="divide-y divide-gray-500 bg-[#F0F0F0]">
                  {pricingData.map((item, index) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-12 items-start px-6 py-6 border-t border-gray-500"
                    >
                      <div className="col-span-4">
                        <div className="text-sm font-semibold text-gray-900">
                          {item.variant}
                        </div>
                      </div>
                      <div className="col-span-4">
                        <div className="text-sm text-gray-700">
                          {item.bestFor}
                        </div>
                      </div>
                      <div className="col-span-4">
                        <div className="text-sm text-gray-700">
                          <div>
                            Input: {item.pricing.input}, Output:{" "}
                            {item.pricing.output}
                          </div>
                          <span className="inline-block mt-2 text-xs bg-gray-200 text-gray-700 rounded px-2 py-0.5">
                            {item.provider}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Lead-in sentence before examples */}
            <p className="text-gray-700 text-base mb-4">
              Here’s a simple example using the{" "}
              <span className="font-semibold">Responses API</span>.
            </p>

            {/* API Usage Examples */}
            {codeExamples.map((example) => (
              <div key={example.id} className="mb-8">
                {/* Title outside code block */}
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {example.title}
                </h3>

                <div className="p-6 bg-[#F0F0F0] rounded-lg">
                  <div className="rounded-lg overflow-hidden">
                    {/* Header with language name and copy button */}
                    <div className="flex items-center justify-between px-6 py-3 border-b-[2px] border-[#929292]">
                      <h4 className="text-lg font-semibold text-[#6C6C6C]">
                        {example.language}
                      </h4>
                      <svg
                        className="cursor-pointer"
                        width="25"
                        height="25"
                        viewBox="0 0 35 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M30.625 0H10.625C8.25 0 6.25 2 6.25 4.375V6.25H5C2.25 6.25 0 8.5 0 11.25V30C0 32.75 2.25 35 5 35H23.75C26.5 35 28.75 32.75 28.75 30V28.75H30.625C33 28.75 35 26.75 35 24.375V4.375C35 2 33 0 30.625 0ZM26.25 30C26.25 31.375 25.125 32.5 23.75 32.5H5C3.625 32.5 2.5 31.375 2.5 30V11.25C2.5 9.875 3.625 8.75 5 8.75H23.75C25.125 8.75 26.25 9.875 26.25 11.25V30ZM32.5 24.375C32.5 25.375 31.625 26.25 30.625 26.25H28.75V11.25C28.75 8.5 26.5 6.25 23.75 6.25H8.75V4.375C8.75 3.375 9.625 2.5 10.625 2.5H30.625C31.625 2.5 32.5 3.375 32.5 4.375V24.375Z"
                          fill="black"
                        />
                      </svg>
                    </div>
                    {/* Code content */}
                    <div className="p-6 overflow-x-auto">
                      <pre className="text-[#6C6C6C] text-lg">
                        {example.code}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Why GPT-5 Matters Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {whyGPT5MattersData.title}
              </h2>

              <ul className="space-y-1 mb-6 list-disc list-outside ps-5">
                {whyGPT5MattersData.points.map((point) => (
                  <li key={point.id} className="text-gray-600">
                    {point.title} {point.description}
                  </li>
                ))}
              </ul>

              <Button
                variant="outline"
                size="sm"
                className="border-orange-100 border rounded-none text-gray-900 bg-gray-50"
                onClick={() =>
                  handleOpenLink(whyGPT5MattersData.ctaButton.link)
                }
              >
                {whyGPT5MattersData.ctaButton.text}
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Model List */}
            <div className="mb-6">
              <div className="space-y-1">
                {modelListData.map((model) => (
                  <div
                    key={model.id}
                    className={`flex items-center py-2 px-3 cursor-pointer hover:bg-gray-50 ${
                      model.isActive ? "bg-gray-50" : ""
                    }`}
                  >
                    {/* Active indicator bar */}
                    {model.isActive && (
                      <div className="w-1 h-6 bg-black mr-3"></div>
                    )}
                    {!model.isActive && <div className="w-1 h-6 mr-3"></div>}

                    {/* Model name */}
                    <span
                      className={`text-sm ${
                        model.isActive
                          ? "font-bold text-gray-900"
                          : "text-gray-500"
                      }`}
                    >
                      {model.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Model Details */}
            <div className="bg-[#F0F0F0] p-6 sticky top-8">
              <h3 className="text-lg font-bold text-gray-900 mb-6">
                {sidebarData.title}
              </h3>
              <div className="space-y-4">
                {sidebarData.details.map((detail) => (
                  <div key={detail.id}>
                    <div className="text-sm font-bold text-gray-900 mb-1">
                      {detail.label}
                    </div>
                    <div className="text-sm text-gray-600">
                      {detail.hasLink ? (
                        <div className="flex items-center">
                          <span>{detail.value}</span>
                          <svg
                            className="w-3 h-3 ml-1 text-gray-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      ) : (
                        detail.value
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* View Repository Button */}
              <Button
                className="w-full mt-6 bg-black text-white hover:bg-gray-800 rounded-md py-2"
                onClick={() => handleOpenLink(sidebarData.button.link)}
              >
                {sidebarData.button.text}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {modelSections.map((section, index) => (
        <ModelSection
          key={section.title}
          title={section.title}
          models={section.models}
          showSeeAll={section.showSeeAll || false}
          sectionIndex={index}
        />
      ))}

      <ExporeDevxToday />
    </div>
  );
};

export default ModelDetailView;
