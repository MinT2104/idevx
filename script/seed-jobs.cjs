#!/usr/bin/env node
/* eslint-disable */
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const jobs = [
  {
    title: "Senior AI Engineer",
    slug: "senior-ai-engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    level: "Senior",
    salaryRange: { min: 3000, max: 5000, currency: "USD" },
    postedAt: new Date("2025-09-26"),
    applicationDeadline: new Date("2025-10-31"),
    description:
      "Lead the development of our AI model infrastructure and optimization systems.",
    responsibilities: [
      "Design and implement scalable AI pipelines",
      "Optimize model training and inference performance",
      "Collaborate with product managers and data scientists",
      "Mentor junior engineers",
    ],
    requirements: [
      "5+ years in Machine Learning/AI Engineering",
      "Proficiency in Python and PyTorch/TensorFlow",
      "Experience with cloud platforms",
      "Strong problem-solving skills",
    ],
    niceToHave: ["Experience with MLOps", "Research publications"],
    benefits: [
      "Remote-first culture",
      "Flexible working hours",
      "Learning budget",
      "Health insurance",
      "Stock options",
    ],
    howToApply: "Send CV to careers@company.com",
    status: "open",
  },
  {
    title: "Frontend Developer",
    slug: "frontend-developer",
    department: "Engineering",
    location: "Ho Chi Minh City, Vietnam",
    type: "Full-time",
    level: "Mid",
    salaryRange: { min: 1200, max: 2000, currency: "USD" },
    postedAt: new Date("2025-09-20"),
    applicationDeadline: new Date("2025-10-15"),
    description:
      "Work on building responsive and interactive web applications with React/Next.js.",
    responsibilities: [
      "Develop new user-facing features",
      "Ensure high performance and responsiveness",
      "Collaborate with backend engineers and designers",
    ],
    requirements: [
      "3+ years in frontend development",
      "Experience with React, Next.js, TypeScript",
      "Strong knowledge of HTML/CSS/JavaScript",
    ],
    niceToHave: ["TailwindCSS", "UI/UX experience"],
    benefits: ["13th-month salary", "Annual bonus", "Hybrid work mode"],
    howToApply: "Apply via https://company.com/careers/frontend-developer",
    status: "open",
  },
  {
    title: "Product Manager",
    slug: "product-manager",
    department: "Product",
    location: "Singapore",
    type: "Full-time",
    level: "Senior",
    salaryRange: { min: 4000, max: 6500, currency: "USD" },
    postedAt: new Date("2025-09-18"),
    applicationDeadline: new Date("2025-10-20"),
    description:
      "Drive the vision, strategy, and execution of our core SaaS product.",
    responsibilities: [
      "Define product roadmap",
      "Work with cross-functional teams",
      "Conduct market research and competitor analysis",
      "Measure success with KPIs",
    ],
    requirements: [
      "5+ years in product management",
      "Excellent communication and leadership",
      "Experience in SaaS or B2B products",
    ],
    niceToHave: ["Background in UX design", "MBA degree"],
    benefits: ["Stock options", "Annual company trip", "Flexible leave policy"],
    howToApply: "Email portfolio and CV to hr@company.com",
    status: "open",
  },
  {
    title: "Marketing Specialist",
    slug: "marketing-specialist",
    department: "Marketing",
    location: "Hanoi, Vietnam",
    type: "Full-time",
    level: "Junior",
    salaryRange: { min: 800, max: 1500, currency: "USD" },
    postedAt: new Date("2025-09-10"),
    applicationDeadline: new Date("2025-10-05"),
    description:
      "Support marketing campaigns, manage social media channels, and assist in content creation.",
    responsibilities: [
      "Plan and execute digital campaigns",
      "Track and analyze performance metrics",
      "Coordinate with design and content teams",
    ],
    requirements: [
      "1+ years in digital marketing",
      "Knowledge of SEO/SEM",
      "Strong communication skills",
    ],
    niceToHave: ["Experience with Google Analytics", "Copywriting"],
    benefits: ["Career growth opportunities", "Performance bonus"],
    howToApply: "Submit resume at careers@company.com",
    status: "open",
  },
  {
    title: "HR Manager",
    slug: "hr-manager",
    department: "Human Resources",
    location: "Remote",
    type: "Full-time",
    level: "Manager",
    salaryRange: { min: 2500, max: 4000, currency: "USD" },
    postedAt: new Date("2025-09-05"),
    applicationDeadline: new Date("2025-10-10"),
    description: "Oversee recruitment, employee engagement, and HR policies.",
    responsibilities: [
      "Manage end-to-end recruitment process",
      "Develop HR strategies aligned with company goals",
      "Ensure compliance with labor laws",
    ],
    requirements: [
      "5+ years in HR management",
      "Experience with HR software",
      "Strong leadership skills",
    ],
    niceToHave: ["Knowledge of labor laws in multiple countries"],
    benefits: ["Remote-friendly", "Annual training budget"],
    howToApply: "Apply at https://company.com/hr-manager",
    status: "open",
  },
];

async function main() {
  for (const job of jobs) {
    await prisma.jobPosting.upsert({
      where: { slug: job.slug },
      update: job,
      create: job,
    });
  }
  console.log(`Seeded ${jobs.length} jobs`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
