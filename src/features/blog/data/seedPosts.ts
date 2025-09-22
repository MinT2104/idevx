import { ALLOWED_BLOG_CATEGORIES } from "@/features/blog/constants";

type NewPost = {
  slug: string;
  locale?: "en";
  title: string;
  subtitle?: string;
  excerpt?: string;
  heroImage?: any;
  cardImage?: any;
  gallery?: any[];
  taxonomy: { categories: string[]; tags?: string[] };
  authors: Array<{ id: string; name: string; roleOrTitle?: string }>;
  content: { type: "markdown"; body: string };
  richMeta?: Record<string, unknown>;
  status: "draft" | "scheduled" | "published" | "archived";
  publishedAt?: string;
  scheduledFor?: string;
  reading?: { readingTimeMinutes?: number; wordCount?: number };
  featured?: boolean;
  pinned?: boolean;
  experimental?: boolean;
  series?: Record<string, unknown>;
  relations?: { relatedSlugs?: string[] };
  seo?: Record<string, unknown>;
  createdBy?: string;
  updatedBy?: string;
  source?: "markdown";
};

const commonAuthor = {
  id: "devx-editor",
  name: "DevX Editorial",
  avatar: {
    url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    alt: "DevX Editorial Avatar",
    width: 200,
    height: 200,
  },
};

const lipsum = `# Introduction

Artificial Intelligence (AI) is reshaping industries.

## Key Insights
This article explores practical lessons, engineering trade-offs, and future trends shaping the field.
`;

export const seedPosts: NewPost[] = [
  {
    slug: "ai-ethics-in-2025",
    title: "AI Ethics in 2025: Balancing Innovation and Responsibility",
    excerpt:
      "A practical look at fairness, transparency, and accountability in next-gen AI.",
    heroImage: {
      url: "https://plus.unsplash.com/premium_photo-1683121710572-7723bd2e235d?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0",
      alt: "Abstract AI ethics concept",
    },
    cardImage: {
      url: "https://plus.unsplash.com/premium_photo-1683121710572-7723bd2e235d?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.1.0",
      alt: "AI ethics preview",
    },
    gallery: [
      {
        url: "https://plus.unsplash.com/premium_photo-1683121710572-7723bd2e235d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0",
        alt: "Ethics gallery 1",
      },
      {
        url: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0",
        alt: "Ethics gallery 2",
      },
    ],
    taxonomy: { categories: ["Foundation"], tags: ["responsibility", "trust"] },
    authors: [commonAuthor],
    content: { type: "markdown", body: lipsum },
    status: "published",
    publishedAt: "2025-06-01T08:00:00Z",
    source: "markdown",
  },
  {
    slug: "ai-infrastructure-trends",
    title: "AI Infrastructure Trends in 2025",
    excerpt:
      "Spot nodes, liquid cooling, and the rise of ARM CPUs in AI serving.",
    heroImage: {
      url: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0",
      alt: "AI infrastructure servers",
    },
    cardImage: {
      url: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.1.0",
      alt: "Server preview",
    },
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1694903110330-cc64b7e1d21d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0",
        alt: "GPU racks",
      },
      {
        url: "https://images.unsplash.com/photo-1727434032773-af3cd98375ba?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0",
        alt: "Cluster management",
      },
    ],
    taxonomy: { categories: ["Infrastructure"], tags: ["serving", "clusters"] },
    authors: [commonAuthor],
    content: { type: "markdown", body: lipsum },
    status: "published",
    publishedAt: "2025-06-05T08:00:00Z",
    source: "markdown",
  },
  {
    slug: "generative-ai-design",
    title: "Generative AI Design Patterns",
    excerpt:
      "From retrieval-augmented generation to hybrid search, here are the design lessons.",
    heroImage: {
      url: "https://images.unsplash.com/photo-1694903110330-cc64b7e1d21d?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0",
      alt: "Generative AI abstract",
    },
    cardImage: {
      url: "https://images.unsplash.com/photo-1694903110330-cc64b7e1d21d?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.1.0",
      alt: "Generative AI preview",
    },
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1727434032773-af3cd98375ba?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0",
        alt: "Neural network diagram",
      },
      {
        url: "https://images.unsplash.com/photo-1666597107756-ef489e9f1f09?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0",
        alt: "Futuristic AI visualization",
      },
    ],
    taxonomy: {
      categories: ["AI Engineering"],
      tags: ["design patterns", "RAG"],
    },
    authors: [commonAuthor],
    content: { type: "markdown", body: lipsum },
    status: "published",
    publishedAt: "2025-06-10T08:00:00Z",
    source: "markdown",
  },
  {
    slug: "scaling-multi-agent-systems",
    title: "Scaling Multi-Agent Systems",
    excerpt:
      "Coordination strategies and communication overhead in large agent swarms.",
    heroImage: {
      url: "https://images.unsplash.com/photo-1727434032773-af3cd98375ba?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0",
      alt: "Multi-agent system visual",
    },
    cardImage: {
      url: "https://images.unsplash.com/photo-1727434032773-af3cd98375ba?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.1.0",
      alt: "Multi-agent preview",
    },
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1655393001768-d946c97d6fd1?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0",
        alt: "AI network nodes",
      },
      {
        url: "https://images.unsplash.com/photo-1666597107756-ef489e9f1f09?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0",
        alt: "Agents collaboration",
      },
    ],
    taxonomy: {
      categories: ["Foundation"],
      tags: ["multi-agent", "coordination"],
    },
    authors: [commonAuthor],
    content: { type: "markdown", body: lipsum },
    status: "published",
    publishedAt: "2025-06-15T08:00:00Z",
    source: "markdown",
  },
  {
    slug: "ai-security-challenges",
    title: "AI Security Challenges in 2025",
    excerpt:
      "Adversarial prompts, model extraction, and supply chain risks for AI systems.",
    heroImage: {
      url: "https://images.unsplash.com/photo-1666597107756-ef489e9f1f09?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0",
      alt: "Cyber security with AI code",
    },
    cardImage: {
      url: "https://images.unsplash.com/photo-1666597107756-ef489e9f1f09?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.1.0",
      alt: "AI security preview",
    },
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1655393001768-d946c97d6fd1?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0",
        alt: "Security firewall visualization",
      },
      {
        url: "https://images.unsplash.com/photo-1694903089438-bf28d4697d9a?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0",
        alt: "AI intrusion detection",
      },
    ],
    taxonomy: {
      categories: ["Infrastructure"],
      tags: ["adversarial", "threats"],
    },
    authors: [commonAuthor],
    content: { type: "markdown", body: lipsum },
    status: "published",
    publishedAt: "2025-06-20T08:00:00Z",
    source: "markdown",
  },
  {
    slug: "ai-healthcare-revolution",
    title: "AI in Healthcare: The 2025 Revolution",
    excerpt:
      "From drug discovery to personalized treatment — AI is reshaping healthcare.",
    heroImage: {
      url: "https://images.unsplash.com/photo-1655393001768-d946c97d6fd1?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0",
      alt: "Medical AI visualization",
    },
    cardImage: {
      url: "https://images.unsplash.com/photo-1655393001768-d946c97d6fd1?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.1.0",
      alt: "Healthcare AI preview",
    },
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1694903089438-bf28d4697d9a?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0",
        alt: "AI-assisted diagnostics",
      },
      {
        url: "https://images.unsplash.com/photo-1727434032792-c7ef921ae086?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0",
        alt: "Futuristic healthcare tech",
      },
    ],
    taxonomy: {
      categories: ["AI Engineering"],
      tags: ["healthcare", "drug discovery"],
    },
    authors: [commonAuthor],
    content: { type: "markdown", body: lipsum },
    status: "published",
    publishedAt: "2025-06-25T08:00:00Z",
    source: "markdown",
  },
  {
    slug: "retrieval-augmented-generation",
    title: "RAG: Retrieval-Augmented Generation at Scale",
    excerpt:
      "Designing scalable pipelines for enterprise-grade knowledge assistants.",
    heroImage: {
      url: "https://images.unsplash.com/photo-1694903089438-bf28d4697d9a?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0",
      alt: "Retrieval augmented generation",
    },
    cardImage: {
      url: "https://images.unsplash.com/photo-1694903089438-bf28d4697d9a?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.1.0",
      alt: "RAG preview",
    },
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1727434032792-c7ef921ae086?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0",
        alt: "Knowledge graph",
      },
      {
        url: "https://images.unsplash.com/photo-1718241905696-cb34c2c07bed?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0",
        alt: "Enterprise AI systems",
      },
    ],
    taxonomy: {
      categories: ["AI Engineering"],
      tags: ["RAG", "knowledge graph"],
    },
    authors: [commonAuthor],
    content: { type: "markdown", body: lipsum },
    status: "published",
    publishedAt: "2025-06-28T08:00:00Z",
    source: "markdown",
  },
  {
    slug: "ai-in-finance",
    title: "AI in Finance: Automating Decisions and Risk Management",
    excerpt:
      "Exploring credit scoring, fraud detection, and autonomous trading with AI.",
    heroImage: {
      url: "https://images.unsplash.com/photo-1727434032792-c7ef921ae086?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0",
      alt: "Financial AI abstract",
    },
    cardImage: {
      url: "https://images.unsplash.com/photo-1727434032792-c7ef921ae086?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.1.0",
      alt: "Finance AI preview",
    },
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1718241905696-cb34c2c07bed?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0",
        alt: "Banking automation",
      },
      {
        url: "https://images.unsplash.com/photo-1636690513351-0af1763f6237?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0",
        alt: "Finance dashboard",
      },
    ],
    taxonomy: {
      categories: ["Applications"],
      tags: ["finance", "risk management"],
    },
    authors: [commonAuthor],
    content: { type: "markdown", body: lipsum },
    status: "published",
    publishedAt: "2025-07-01T08:00:00Z",
    source: "markdown",
  },
  {
    slug: "ai-for-creative-industries",
    title: "AI for Creative Industries",
    excerpt:
      "Music, art, and film: how AI tools are changing creative workflows.",
    heroImage: {
      url: "https://images.unsplash.com/photo-1718241905696-cb34c2c07bed?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0",
      alt: "Creative AI concept",
    },
    cardImage: {
      url: "https://images.unsplash.com/photo-1718241905696-cb34c2c07bed?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.1.0",
      alt: "Creative preview",
    },
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1636690513351-0af1763f6237?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0",
        alt: "Film editing AI",
      },
      {
        url: "https://images.unsplash.com/photo-1717501218385-55bc3a95be94?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0",
        alt: "Music AI composition",
      },
    ],
    taxonomy: {
      categories: ["Applications"],
      tags: ["creative AI", "art", "music"],
    },
    authors: [commonAuthor],
    content: { type: "markdown", body: lipsum },
    status: "published",
    publishedAt: "2025-07-05T08:00:00Z",
    source: "markdown",
  },
  {
    slug: "ai-energy-optimization",
    title: "AI for Energy Optimization",
    excerpt:
      "Using AI to balance grids, forecast demand, and reduce carbon footprint.",
    heroImage: {
      url: "https://images.unsplash.com/photo-1636690513351-0af1763f6237?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0",
      alt: "Energy grid AI",
    },
    cardImage: {
      url: "https://images.unsplash.com/photo-1636690513351-0af1763f6237?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.1.0",
      alt: "Energy AI preview",
    },
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1717501218385-55bc3a95be94?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0",
        alt: "Green energy dashboard",
      },
      {
        url: "https://images.unsplash.com/photo-1674027444454-97b822a997b6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0",
        alt: "Smart grid visualization",
      },
    ],
    taxonomy: {
      categories: ["Infrastructure"],
      tags: ["energy", "optimization"],
    },
    authors: [commonAuthor],
    content: { type: "markdown", body: lipsum },
    status: "published",
    publishedAt: "2025-07-10T08:00:00Z",
    source: "markdown",
  },
  {
    slug: "future-of-ai-education",
    title: "The Future of AI in Education",
    excerpt:
      "Adaptive learning systems, AI tutors, and personalized curriculum design.",
    heroImage: {
      url: "https://images.unsplash.com/photo-1717501218385-55bc3a95be94?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0",
      alt: "AI education concept",
    },
    cardImage: {
      url: "https://images.unsplash.com/photo-1717501218385-55bc3a95be94?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.1.0",
      alt: "AI education preview",
    },
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1674027444454-97b822a997b6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0",
        alt: "Smart classroom",
      },
      {
        url: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0",
        alt: "Students with AI tutors",
      },
    ],
    taxonomy: {
      categories: ["Applications"],
      tags: ["education", "personalized learning"],
    },
    authors: [commonAuthor],
    content: { type: "markdown", body: lipsum },
    status: "published",
    publishedAt: "2025-07-15T08:00:00Z",
    source: "markdown",
  },
  {
    slug: "ai-for-climate-change",
    title: "AI for Climate Change Mitigation",
    excerpt:
      "Modeling weather patterns, optimizing agriculture, and reducing emissions.",
    heroImage: {
      url: "https://images.unsplash.com/photo-1674027444454-97b822a997b6?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0",
      alt: "AI climate visualization",
    },
    cardImage: {
      url: "https://images.unsplash.com/photo-1674027444454-97b822a997b6?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.1.0",
      alt: "Climate preview",
    },
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0",
        alt: "Agriculture optimization",
      },
      {
        url: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0",
        alt: "Renewable energy farms",
      },
    ],
    taxonomy: {
      categories: ["Foundation"],
      tags: ["climate", "sustainability"],
    },
    authors: [commonAuthor],
    content: { type: "markdown", body: lipsum },
    status: "published",
    publishedAt: "2025-07-18T08:00:00Z",
    source: "markdown",
  },
  {
    slug: "ai-and-human-creativity",
    title: "AI and Human Creativity: Collaboration not Competition",
    excerpt:
      "Exploring the synergy between human imagination and machine generation.",
    heroImage: {
      url: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0",
      alt: "Creative AI collaboration",
    },
    cardImage: {
      url: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.1.0",
      alt: "Creativity preview",
    },
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0",
        alt: "Artists using AI tools",
      },
      {
        url: "https://plus.unsplash.com/premium_photo-1683121710572-7723bd2e235d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0",
        alt: "Digital creative workspace",
      },
    ],
    taxonomy: {
      categories: ["Community"],
      tags: ["creativity", "collaboration"],
    },
    authors: [commonAuthor],
    content: { type: "markdown", body: lipsum },
    status: "published",
    publishedAt: "2025-07-22T08:00:00Z",
    source: "markdown",
  },
  {
    slug: "robotics-and-ai",
    title: "Robotics and AI: Smarter Machines for Everyday Life",
    excerpt:
      "From warehouses to homes, AI-powered robots are becoming ubiquitous.",
    heroImage: {
      url: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0",
      alt: "AI robotics concept",
    },
    cardImage: {
      url: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.1.0",
      alt: "Robotics preview",
    },
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0",
        alt: "Robotic arms",
      },
      {
        url: "https://images.unsplash.com/photo-1694903110330-cc64b7e1d21d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0",
        alt: "Industrial robots",
      },
    ],
    taxonomy: {
      categories: ["Applications"],
      tags: ["robotics", "automation"],
    },
    authors: [commonAuthor],
    content: { type: "markdown", body: lipsum },
    status: "published",
    publishedAt: "2025-07-25T08:00:00Z",
    source: "markdown",
  },
  {
    slug: "ai-governance-2025",
    title: "AI Governance in 2025",
    excerpt:
      "What regulations and frameworks are emerging globally to govern AI?",
    heroImage: {
      url: "https://plus.unsplash.com/premium_photo-1683121710572-7723bd2e235d?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0",
      alt: "AI governance abstract",
    },
    cardImage: {
      url: "https://plus.unsplash.com/premium_photo-1683121710572-7723bd2e235d?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.1.0",
      alt: "Governance preview",
    },
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1674027444454-97b822a997b6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0",
        alt: "Policy makers at work",
      },
      {
        url: "https://images.unsplash.com/photo-1666597107756-ef489e9f1f09?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0",
        alt: "AI regulation symbol",
      },
    ],
    taxonomy: {
      categories: ["Foundation"],
      tags: ["governance", "regulation"],
    },
    authors: [commonAuthor],
    content: { type: "markdown", body: lipsum },
    status: "published",
    publishedAt: "2025-07-28T08:00:00Z",
    source: "markdown",
  },
  {
    slug: "human-centered-ai",
    title: "Human-Centered AI",
    excerpt: "Why AI should augment humans, not replace them.",
    heroImage: {
      url: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0",
      alt: "Human-centered AI",
    },
    cardImage: {
      url: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.1.0",
      alt: "Human-centered preview",
    },
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1727434032773-af3cd98375ba?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0",
        alt: "Human + AI collaboration",
      },
      {
        url: "https://images.unsplash.com/photo-1655393001768-d946c97d6fd1?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0",
        alt: "Assistive technology",
      },
    ],
    taxonomy: {
      categories: ["Community"],
      tags: ["human-centered", "collaboration"],
    },
    authors: [commonAuthor],
    content: { type: "markdown", body: lipsum },
    status: "published",
    publishedAt: "2025-07-30T08:00:00Z",
    source: "markdown",
  },
  {
    slug: "scaling-reasoning-models",
    title: "Scaling Reasoning Models",
    excerpt:
      "Techniques for improving logical reasoning in large language models.",
    heroImage: {
      url: "https://images.unsplash.com/photo-1694903110330-cc64b7e1d21d?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0",
      alt: "Reasoning AI",
    },
    cardImage: {
      url: "https://images.unsplash.com/photo-1694903110330-cc64b7e1d21d?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.1.0",
      alt: "Reasoning preview",
    },
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1727434032773-af3cd98375ba?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0",
        alt: "Symbolic + neural mix",
      },
      {
        url: "https://images.unsplash.com/photo-1636690513351-0af1763f6237?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0",
        alt: "Logic visualization",
      },
    ],
    taxonomy: { categories: ["Foundation"], tags: ["reasoning", "logic"] },
    authors: [commonAuthor],
    content: { type: "markdown", body: lipsum },
    status: "published",
    publishedAt: "2025-08-02T08:00:00Z",
    source: "markdown",
  },
  {
    slug: "ai-in-manufacturing",
    title: "AI in Manufacturing",
    excerpt:
      "How AI is driving predictive maintenance, quality control, and robotics.",
    heroImage: {
      url: "https://images.unsplash.com/photo-1727434032792-c7ef921ae086?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0",
      alt: "AI in manufacturing",
    },
    cardImage: {
      url: "https://images.unsplash.com/photo-1727434032792-c7ef921ae086?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.1.0",
      alt: "Manufacturing preview",
    },
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1718241905696-cb34c2c07bed?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0",
        alt: "Factory robots",
      },
      {
        url: "https://images.unsplash.com/photo-1655393001768-d946c97d6fd1?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0",
        alt: "Quality inspection",
      },
    ],
    taxonomy: {
      categories: ["AI Engineering"],
      tags: ["manufacturing", "automation"],
    },
    authors: [commonAuthor],
    content: { type: "markdown", body: lipsum },
    status: "published",
    publishedAt: "2025-08-05T08:00:00Z",
    source: "markdown",
  },
  {
    slug: "ai-safety-red-teaming",
    title: "AI Safety: Red Teaming at Scale",
    excerpt:
      "Building scalable red-team pipelines to stress-test generative models.",
    heroImage: {
      url: "https://images.unsplash.com/photo-1636690513351-0af1763f6237?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0",
      alt: "AI safety red team",
    },
    cardImage: {
      url: "https://images.unsplash.com/photo-1636690513351-0af1763f6237?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.1.0",
      alt: "Safety preview",
    },
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1717501218385-55bc3a95be94?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0",
        alt: "Security operations center",
      },
      {
        url: "https://images.unsplash.com/photo-1674027444454-97b822a997b6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0",
        alt: "Testing environments",
      },
    ],
    taxonomy: {
      categories: ["Infrastructure"],
      tags: ["red-teaming", "alignment"],
    },
    authors: [commonAuthor],
    content: { type: "markdown", body: lipsum },
    status: "published",
    publishedAt: "2025-08-08T08:00:00Z",
    source: "markdown",
  },
  {
    slug: "next-gen-ai-chips",
    title: "Next-Gen AI Chips",
    excerpt: "Exploring the new wave of custom silicon for AI acceleration.",
    heroImage: {
      url: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0",
      alt: "Next-gen AI chips",
    },
    cardImage: {
      url: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.1.0",
      alt: "Chip preview",
    },
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0",
        alt: "GPU chip close-up",
      },
      {
        url: "https://images.unsplash.com/photo-1694903089438-bf28d4697d9a?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0",
        alt: "Custom AI silicon",
      },
    ],
    taxonomy: { categories: ["Infrastructure"], tags: ["chips", "hardware"] },
    authors: [commonAuthor],
    content: { type: "markdown", body: lipsum },
    status: "published",
    publishedAt: "2025-08-12T08:00:00Z",
    source: "markdown",
  },
];
