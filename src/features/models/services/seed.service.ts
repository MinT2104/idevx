import { createModel } from "@/features/models/services/models.service";
import modelDetailData from "@/features/models/data/modelDetailData.json";

// Function để seed dữ liệu mẫu
export const seedModelData = async () => {
  try {
    console.log("Starting to seed model data...");

    // Tạo model từ dữ liệu JSON hiện tại
    const model = await createModel(modelDetailData as any);

    console.log("Model created successfully:", model.id);
    return model;
  } catch (error) {
    console.error("Error seeding model data:", error);
    throw error;
  }
};

// Function để tạo nhiều models mẫu
export const seedMultipleModels = async () => {
  try {
    console.log("Starting to seed multiple models...");

    // Model 1: GPT-5
    const gpt5Model = await createModel({
      model: {
        name: "GPT-5",
        brand: "OpenAI",
        logo: "https://example.com/openai-logo.png",
        type: "LLM",
        link: "/models/gpt-5",
        description: "OpenAI's most advanced text generation model",
      },
      hero: {
        title: "Text Generation Models",
        description:
          "Please read these terms and conditions carefully before using Our Service.",
        ctaButton: "Get Started",
        ctaButton2: "Talk to an Expert",
        subtitle: "Open AI",
        link1: "https://www.google.com",
        link2: "https://www.google.com",
      },
      pageInfo: {
        lastUpdated: "Aug 2025",
        title: "GPT-5 — OpenAI's Text Generation",
        description:
          "GPT-5 represents OpenAI's most advanced evolution yet, delivering human-level reasoning, multimodal understanding, and high output quality.",
      },
      detailedInfo: {
        title: "GPT-5 | Model library",
        description:
          "OpenAI's most advanced evolution yet, delivering human-level reasoning, multimodal understanding, and high output quality",
        capabilities: [
          "reasoning",
          "coding",
          "creative writing",
          "multimodal understanding",
          "agentic tasks",
        ],
        pricing: [
          {
            variant: "GPT-5 (Standard)",
            bestFor: "Full reasoning, coding, multimodal tasks",
            input: "$1.25 (cached: $0.125)",
            output: "$10.00",
            provider: "OpenAI",
          },
        ],
        tags: ["LLM", "Text Generation", "OpenAI"],
        modelDetails: {
          developedBy: "OpenAI",
          modelFamily: "GPT",
          useCase: "large language",
          variant: "5",
          size: "Unknown",
          license: "OpenAI License Agreement",
        },
        codeExample: [
          'from openai import OpenAI\n\nclient = OpenAI(api_key="YOUR_API_KEY")\nresp = client.chat.completions.create(\n    model="gpt-5",\n    messages=[{"role": "user", "content": "Generate a responsive Pomodoro timer UI in HTML/CSS/JS."}]\n)\nprint(resp.choices[0].message["content"])',
        ],
        hardware: ["H100", "A100", "V100"],
        benchmarks: ["MMLU", "HumanEval", "GSM8K"],
        useCases: ["assistant", "creative writing", "coding", "reasoning"],
        limitations: [
          "May generate inaccurate information",
          "Limited to training data cutoff",
        ],
      },
      whyModelMattersData: {
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
              "Multiple variants unlock flexibility for fast, scalable production without breaking the bank.",
          },
        ],
        ctaButton: {
          text: "Read Official Documentation",
          link: "https://openai.com/docs",
        },
      },
      sidebarData: {
        title: "Model Details",
        details: [
          {
            id: "developed-by",
            label: "Developed by",
            value: "OpenAI",
          },
          {
            id: "model-family",
            label: "Model Family",
            value: "GPT",
          },
        ],
        button: {
          text: "View Repository",
          link: "https://github.com",
        },
      },
      modelListData: [
        {
          id: "gpt-5",
          name: "GPT-5",
          isActive: true,
        },
      ],
      modelSections: [
        {
          title: "large language models",
          models: [
            {
              logo: "K",
              name: "Kimi K2 0905",
              description: "0905-K2",
              tags: ["LLM"],
            },
          ],
          showSeeAll: true,
        },
      ],
    });

    // Model 2: Kimi K2 0905
    const kimiModel = await createModel({
      model: {
        name: "Kimi K2 0905",
        brand: "Kimi",
        logo: "https://www.datocms-assets.com/104802/1753917585-qkx7skgzrs0y5ybbqzcdq.webp",
        type: "LLM",
        link: "/models/kimi-k2-0905",
        description:
          "An updated 1 trillion parameter open source model for agents, code, and creative writing",
      },
      hero: {
        title: "Large Language Models",
        description: "Advanced AI models for various applications",
        ctaButton: "Get Started",
        ctaButton2: "View Documentation",
        subtitle: "Kimi",
        link1: "https://kimi.moonshot.cn",
        link2: "https://kimi.moonshot.cn/docs",
      },
      pageInfo: {
        lastUpdated: "Sep 2025",
        title: "Kimi K2 0905 — Moonshot AI's Advanced Model",
        description:
          "An updated 1 trillion parameter open source model for agents, code, and creative writing",
      },
      detailedInfo: {
        title: "Kimi K2 0905 | Model library",
        description:
          "An updated 1 trillion parameter open source model for agents, code, and creative writing",
        capabilities: [
          "reasoning",
          "coding",
          "creative writing",
          "image generation",
          "transcription",
          "embedding",
        ],
        pricing: [
          {
            variant: "Kimi K2 0905",
            bestFor: "Agents, code, and creative writing",
            input: "$0.50",
            output: "$1.50",
            provider: "Moonshot AI",
          },
        ],
        tags: ["LLM", "Open Source", "Kimi"],
        modelDetails: {
          developedBy: "Moonshot AI",
          modelFamily: "Kimi",
          useCase: "large language",
          variant: "K2",
          size: "1T",
          license: "MIT",
        },
        codeExample: [
          'from openai import OpenAI\n\nclient = OpenAI(\n    api_key="YOUR_API_KEY",\n    base_url="https://inference.baseten.co/v1"\n)\n\nresponse = client.chat.completions.create(\n    model="moonshotai/Kimi-K2-Instruct-0905",\n    messages=[\n        {\n            "role": "user",\n            "content": "Implement Hello World in Python"\n        }\n    ]\n)',
        ],
        hardware: ["t4", "L4", "ram"],
        benchmarks: ["Arc", "Benchmark"],
        useCases: ["assistant", "creative writing", "ner"],
        limitations: ["Warning"],
      },
      whyModelMattersData: {
        title: "Why Kimi K2 0905 Matters",
        points: [
          {
            id: "scale",
            title: "Massive Scale:",
            description:
              "1 trillion parameters provide unprecedented capability for complex reasoning and creative tasks.",
          },
          {
            id: "open-source",
            title: "Open Source Advantage:",
            description:
              "MIT licensed model offers transparency and customization opportunities for enterprise users.",
          },
        ],
        ctaButton: {
          text: "View Kimi Documentation",
          link: "https://kimi.moonshot.cn/docs",
        },
      },
      sidebarData: {
        title: "Model Details",
        details: [
          {
            id: "developed-by",
            label: "Developed by",
            value: "Moonshot AI",
          },
          {
            id: "model-family",
            label: "Model Family",
            value: "Kimi",
          },
        ],
        button: {
          text: "View Repository",
          link: "https://github.com",
        },
      },
      modelListData: [
        {
          id: "kimi-k2",
          name: "Kimi K2 0905",
          isActive: true,
        },
      ],
      modelSections: [
        {
          title: "open source models",
          models: [
            {
              logo: "K",
              name: "Kimi K2 0905",
              description: "0905-K2",
              tags: ["LLM"],
            },
          ],
          showSeeAll: true,
        },
      ],
    });

    console.log("Multiple models created successfully:");
    console.log("- GPT-5:", gpt5Model.id);
    console.log("- Kimi K2 0905:", kimiModel.id);

    return [gpt5Model, kimiModel];
  } catch (error) {
    console.error("Error seeding multiple models:", error);
    throw error;
  }
};
