const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const feedbackData = [
  {
    name: "John Smith",
    email: "john.smith@techcorp.com",
    phone: "+1 (555) 123-4567",
    company: "TechCorp Solutions",
    skype: "john.smith.tech",
    website: "https://techcorp.com",
    message:
      "We're interested in implementing AI models for our customer service platform. Could you help us understand the best approach for integrating text-to-speech and natural language processing capabilities?",
    status: "new",
  },
  {
    name: "Sarah Johnson",
    email: "sarah.j@innovateai.com",
    phone: "+1 (555) 987-6543",
    company: "InnovateAI",
    skype: "sarah.johnson",
    website: "https://innovateai.com",
    message:
      "Looking for AI solutions to enhance our healthcare platform. We need models that can process medical data and provide insights. Please contact us to discuss potential collaboration.",
    status: "read",
  },
  {
    name: "Michael Chen",
    email: "m.chen@fintechplus.com",
    phone: "+1 (555) 456-7890",
    company: "FinTech Plus",
    skype: "michael.chen.fintech",
    website: "https://fintechplus.com",
    message:
      "Our company is exploring AI integration for fraud detection and risk assessment. We'd like to schedule a demo to see how your models can help improve our security measures.",
    status: "replied",
  },
  {
    name: "Emily Rodriguez",
    email: "emily.r@edutech.com",
    phone: "+1 (555) 321-0987",
    company: "EduTech Solutions",
    skype: "emily.rodriguez",
    website: "https://edutech.com",
    message:
      "We're developing an educational platform and need AI models for personalized learning experiences. Can you provide more information about your text-to-speech and language processing capabilities?",
    status: "new",
  },
  {
    name: "David Kim",
    email: "david.kim@retailtech.com",
    phone: "+1 (555) 654-3210",
    company: "RetailTech Innovations",
    skype: "david.kim.retail",
    website: "https://retailtech.com",
    message:
      "Interested in implementing AI for our e-commerce platform. We need solutions for product recommendations, customer support automation, and inventory management. Please reach out to discuss our requirements.",
    status: "read",
  },
  {
    name: "Lisa Thompson",
    email: "lisa.t@legaltech.com",
    phone: "+1 (555) 789-0123",
    company: "LegalTech Associates",
    skype: "lisa.thompson.legal",
    website: "https://legaltech.com",
    message:
      "Our law firm is looking to integrate AI for document analysis and legal research. We're particularly interested in models that can process and understand legal documents efficiently.",
    status: "archived",
  },
  {
    name: "Robert Wilson",
    email: "robert.w@manufacturing.com",
    phone: "+1 (555) 234-5678",
    company: "Smart Manufacturing Co",
    skype: "robert.wilson.smart",
    website: "https://smartmanufacturing.com",
    message:
      "We're implementing Industry 4.0 solutions and need AI models for predictive maintenance, quality control, and process optimization. Could you provide a detailed proposal?",
    status: "replied",
  },
  {
    name: "Jennifer Lee",
    email: "jennifer.lee@traveltech.com",
    phone: "+1 (555) 567-8901",
    company: "TravelTech Solutions",
    skype: "jennifer.lee.travel",
    website: "https://traveltech.com",
    message:
      "Our travel platform needs AI for personalized recommendations, dynamic pricing, and customer service automation. We'd like to explore how your models can enhance our user experience.",
    status: "new",
  },
  {
    name: "Alex Martinez",
    email: "alex.m@realestate.com",
    phone: "+1 (555) 890-1234",
    company: "RealEstate AI",
    skype: "alex.martinez.real",
    website: "https://realestateai.com",
    message:
      "Looking for AI solutions to improve property valuation, market analysis, and customer matching. We're interested in models that can process real estate data and provide accurate insights.",
    status: "read",
  },
  {
    name: "Maria Garcia",
    email: "maria.g@foodtech.com",
    phone: "+1 (555) 012-3456",
    company: "FoodTech Innovations",
    skype: "maria.garcia.food",
    website: "https://foodtech.com",
    message:
      "Our food delivery platform needs AI for demand forecasting, route optimization, and customer preference analysis. Can you help us implement these solutions?",
    status: "replied",
  },
];

async function seedFeedback() {
  try {
    console.log("🗑️  Deleting existing feedback data...");
    await prisma.feedback.deleteMany({});
    console.log("✅ Existing feedback data deleted");

    console.log("🌱 Seeding new feedback data...");

    for (const feedback of feedbackData) {
      await prisma.feedback.create({
        data: {
          ...feedback,
          createdAt: new Date(
            Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
          ), // Random date within last 30 days
          updatedAt: new Date(),
        },
      });
    }

    console.log(
      `✅ Successfully seeded ${feedbackData.length} feedback records`
    );

    // Display summary
    const totalCount = await prisma.feedback.count();
    const statusCounts = await prisma.feedback.groupBy({
      by: ["status"],
      _count: {
        status: true,
      },
    });

    console.log("\n📊 Feedback Summary:");
    console.log(`Total feedback: ${totalCount}`);
    statusCounts.forEach(({ status, _count }) => {
      console.log(`${status}: ${_count.status}`);
    });
  } catch (error) {
    console.error("❌ Error seeding feedback:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seedFeedback()
  .then(() => {
    console.log("🎉 Feedback seeding completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Feedback seeding failed:", error);
    process.exit(1);
  });
