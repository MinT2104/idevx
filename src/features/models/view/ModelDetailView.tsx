"use client";
import React from "react";
import { useState } from "react";
import { Button } from "@/ui/components/button";
import HeroSection from "@/features/shared/common/HeroSection";
import ModelSection from "../components/ModelSection";
import ExporeDevxToday from "../components/ExporeDevxToday";
import { ModelRecord } from "../services/models.service";
import { getModelUrl } from "../utils/slug.utils";

type ModelDetailViewProps = {
  model: ModelRecord;
};

const ModelDetailView: React.FC<ModelDetailViewProps> = ({ model }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const handleOpenLink = (url: string) => {
    if (typeof window !== "undefined") {
      window.open(url, "_blank");
    }
  };

  const handleCopyPageLink = () => {
    const modelUrl = getModelUrl(model);
    const fullUrl = `${window.location.origin}${modelUrl}`;
    navigator.clipboard.writeText(fullUrl);
  };

  const handleCopyCode = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1500);
    } catch (err) {
      // no-op
    }
  };

  const formatLastUpdated = (value: any): string => {
    if (!value) return "--";
    try {
      // Accept Date, number (ms), or string (ISO or parseable)
      const date = value instanceof Date ? value : new Date(value);
      if (isNaN(date.getTime())) return String(value);
      return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "2-digit",
      });
    } catch {
      return String(value);
    }
  };

  const hero = model.hero || {};
  const pageInfo = model.pageInfo || {};
  const detailedInfo = model.detailedInfo || {};
  const whyModelMattersData = model.whyModelMattersData || {};
  const sidebarData = model.sidebarData || {};
  const modelListData = model.modelListData || [];
  const modelSections = model.modelSections || [];

  // Extract pricing data from detailedInfo
  const pricingData = detailedInfo?.pricing || [];

  // Normalize code examples: supports string, array of strings, or array of { language, code }
  const codeExamples: Array<{ language: string; code: string }> = (() => {
    const raw = (detailedInfo as any)?.codeExample;
    if (!raw) return [];
    const fallbackLanguages = ["Python", "JavaScript", "Curl", "Code"];

    // Single string
    if (typeof raw === "string") {
      return [{ language: "Code", code: raw }];
    }

    // Array
    if (Array.isArray(raw)) {
      // Array of objects or strings
      return raw.map((item: any, index: number) => {
        if (typeof item === "string") {
          return { language: fallbackLanguages[index] || "Code", code: item };
        }
        const language = item?.language || fallbackLanguages[index] || "Code";
        const code = item?.code || "";
        return { language, code };
      });
    }

    // Object with fields python/js/etc.
    if (typeof raw === "object") {
      const entries: Array<{ language: string; code: string }> = [];
      for (const key of Object.keys(raw)) {
        const value = raw[key];
        if (typeof value === "string") {
          entries.push({ language: key, code: value });
        } else if (value && typeof value.code === "string") {
          entries.push({ language: value.language || key, code: value.code });
        }
      }
      return entries;
    }

    return [];
  })();

  return (
    <div className="bg-white min-h-screen">
      <HeroSection
        title={hero?.title || model.name || "Model"}
        description={hero?.description || model.description || ""}
        buttons={
          hero?.buttons || [
            {
              text: "Get Started",
              variant: "outline",
              size: "lg",
              link: "/",
            },
            {
              text: "Talk to an Expert",
              variant: "default",
              size: "lg",
              className: "bg-orange-600 hover:bg-orange-700 text-white",
              link: "/talk-to-us",
            },
          ]
        }
        subtitle={hero?.subtitle}
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
                  <span className="text-sm text-gray-600">
                    {formatLastUpdated(pageInfo?.lastUpdated || "--")}
                  </span>
                </div>
              </div>

              {/* Main title with copy button */}
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-4xl font-semibold text-gray-900">
                  {pageInfo?.title || model.name}
                </h1>
                <Button
                  onClick={handleCopyPageLink}
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
                  {pageInfo?.description || model.description}
                </p>
              </div>
            </div>

            {pricingData.length > 0 && (
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
                    {pricingData.map((item: any, index: number) => (
                      <div
                        key={index}
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
                              Input: {item.input}, Output: {item.output}
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
            )}

            {/* API Usage Examples */}
            {codeExamples.map(({ language, code }, index: number) => {
              const displayCode = (code || "")
                .replace(/\\n/g, "\n")
                .replace(/\\t/g, "\t");

              return (
                <div key={index} className="mb-8">
                  {/* Title outside code block */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {language}
                  </h3>

                  <div className="p-6 bg-[#F0F0F0] rounded-lg">
                    <div className="rounded-lg overflow-hidden">
                      {/* Header with language name and copy button */}
                      <div className="flex items-center justify-between px-6 py-3 border-b-[2px] border-[#929292]">
                        <h4 className="text-lg font-semibold text-[#6C6C6C]">
                          {language}
                        </h4>
                        <button
                          onClick={() => handleCopyCode(displayCode, index)}
                          className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900"
                          title={copiedIndex === index ? "Copied" : "Copy"}
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16 4H7a3 3 0 00-3 3v9"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <rect
                              x="8"
                              y="8"
                              width="12"
                              height="12"
                              rx="2"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                          </svg>
                          {copiedIndex === index ? "Copied" : "Copy"}
                        </button>
                      </div>
                      {/* Code content */}
                      <div className="p-6 overflow-x-auto">
                        <pre className="text-[#6C6C6C] text-lg whitespace-pre-wrap">
                          {displayCode}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {whyModelMattersData?.title && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {whyModelMattersData?.title || "Why this model matters"}
                </h2>

                <ul className="space-y-1 mb-6 list-disc list-outside ps-5">
                  {(whyModelMattersData?.points || []).map((point: any) => (
                    <li key={point.id || point.title} className="text-gray-600">
                      {point.title} {point.description}
                    </li>
                  ))}
                </ul>

                <Button
                  variant="outline"
                  size="sm"
                  className="border-orange-100 border rounded-none text-gray-900 bg-gray-50"
                  onClick={() =>
                    handleOpenLink(whyModelMattersData?.ctaButton?.link || "#")
                  }
                >
                  {whyModelMattersData?.ctaButton?.text || "Learn more"}
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Model List */}
            <div className="mb-6">
              <div className="space-y-1">
                {(modelListData || []).map((m: any) => (
                  <div
                    key={m.id}
                    className={`flex items-center py-2 px-3 cursor-pointer hover:bg-gray-50 ${
                      m.isActive ? "bg-gray-50" : ""
                    }`}
                  >
                    {/* Active indicator bar */}
                    {m.isActive && (
                      <div className="w-1 h-6 bg-black mr-3"></div>
                    )}
                    {!m.isActive && <div className="w-1 h-6 mr-3"></div>}

                    {/* Model name */}
                    <span
                      className={`text-sm ${
                        m.isActive ? "font-bold text-gray-900" : "text-gray-500"
                      }`}
                    >
                      {m.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Model Details */}
            <div className="bg-[#F0F0F0] p-6 sticky top-8">
              <h3 className="text-lg font-bold text-gray-900 mb-6">
                {sidebarData?.title || "Model details"}
              </h3>
              <div className="space-y-4">
                {(sidebarData?.details || []).map((detail: any) => (
                  <div key={detail.id || detail.label}>
                    <div className="text-sm font-bold text-gray-900 mb-1">
                      {detail.label}
                    </div>
                    <div className="text-sm text-gray-600 cursor-pointer">
                      {detail.hasLink ? (
                        <div
                          onClick={() => handleOpenLink(detail.value)}
                          className="flex items-center"
                        >
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
                onClick={() => handleOpenLink(sidebarData?.button?.link || "#")}
              >
                {sidebarData?.button?.text || "View Repository"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {(modelSections || []).map((section: any, index: number) => (
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
