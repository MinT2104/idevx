/* eslint-disable */
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding testimonials...");

  const data = [
    {
      type: "statistic",
      statistic: {
        value: "70%",
        description:
          "70% faster content creation using GenAI for blogs & product descriptions.",
      },
      company: {
        name: "Cushman & Wakefield",
        logo: "/images/home/cusman.png",
        imageClass: "w-auto h-5",
      },
      order: 1,
      status: "active",
    },
    {
      type: "statistic",
      statistic: {
        value: "12,000+",
        description:
          "12,000+ hours saved annually through AI-driven automation.",
      },
      company: {
        name: "Opella",
        logo: "/images/home/opella.png",
        imageClass: "h-5 w-auto",
      },
      order: 2,
      status: "active",
    },
    {
      type: "quote",
      quote: {
        text: "DevX AI transformed our legal research speed—cutting hours of work into minutes.",
        person: "Peter So",
        position: "VP of Digital Innovation",
        image: "/images/testimonials/peter-so.png",
      },
      company: {
        name: "PGIM",
        logo: "/images/home/pgim.png",
        imageClass: "h-5 w-auto",
      },
      client: { name: "Peter So", logo: "/images/home/peter.png" },
      order: 3,
      status: "active",
    },
    {
      type: "quote",
      quote: {
        text: "In healthcare, accuracy matters. DevX delivered 95%+ reliable transcription for patient data.",
        person: "Elaina Shekhter",
        position: "Director of Company",
        image: "/images/testimonials/elaina-shekhter.png",
      },
      company: {
        name: "EPAM",
        logo: "/images/home/epam.png",
        imageClass: "h-6 w-auto",
      },
      client: { name: "Elaina So", logo: "/images/home/elaina.png" },
      order: 4,
      status: "active",
    },
    {
      type: "statistic",
      statistic: {
        value: "70%",
        description:
          "70% boost in student learning outcomes: Rural students get instant answers to questions they can't always ask in class.",
      },
      company: {
        name: "Anthropologie",
        logo: "/images/home/anthropologies.png",
        imageClass: "w-auto h-2",
      },
      order: 5,
      status: "active",
    },
    {
      type: "statistic",
      statistic: {
        value: "8,500 Products",
        description: "8,500 product listings auto-generated in 24 hours.",
      },
      company: {
        name: "Adidas",
        logo: "/images/home/adidas.png",
        imageClass: "w-auto h-10",
      },
      order: 6,
      status: "active",
    },
  ];

  for (const t of data) {
    await prisma.testimonial.create({ data: t });
  }

  console.log("Seeded testimonials:", data.length);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
