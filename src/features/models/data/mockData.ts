export const mockModels = [
  {
    id: "1",
    image: "/images/models/deepseek.png",
    name: "DeepSeek v3",
    actionType: "try" as const,
    customModelButtonLink: "/models/deepseek-v3",
  },
  {
    id: "2",
    image: "/images/models/deepseek.png",
    name: "DeepSeek R1",
    actionType: "try" as const,
    customModelButtonLink: "/models/deepseek-r1",
  },
  {
    id: "3",
    image: "/images/models/meta.png",
    name: "LLaMA Maverick",
    actionType: "try" as const,
    customModelButtonLink: "/models/llama-maverick",
  },
  {
    id: "4",
    image: "/images/models/meta.png",
    name: "LLaMA Scout",
    actionType: "try" as const,
    customModelButtonLink: "/models/llama-scout",
  },
  {
    id: "5",
    image: "/images/models/idevx.png",
    name: "Explore the model Library",
    actionType: "explore" as const,
    customModelButtonLink: "/models/explore-the-model-library",
  },
];

export const mockSteps = [
  {
    id: "1",
    title: "Choose Your Model",
    description:
      "Select from our comprehensive suite of AI models tailored for your specific needs.",
  },
  {
    id: "2",
    title: "Configure Parameters",
    description:
      "Customize model settings and parameters to optimize performance for your use case.",
  },
  {
    id: "3",
    title: "Deploy & Scale",
    description:
      "Deploy your model and scale it across your infrastructure with our robust platform.",
  },
];
