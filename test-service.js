const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function testService() {
  try {
    console.log("Testing service directly...");

    // Test getAllModels logic
    const page = 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    const where = {};

    const [models, total] = await Promise.all([
      prisma.model.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.model.count({ where }),
    ]);

    console.log("Found models:", models.length);

    // Test safeParseJson function
    const safeParseJson = (value) => {
      if (!value) return null;
      if (typeof value === "object") return value;
      if (typeof value === "string") {
        try {
          return JSON.parse(value);
        } catch {
          return null;
        }
      }
      return null;
    };

    const processedModels = models.map((model) => ({
      ...model,
      hero: safeParseJson(model.hero),
      pageInfo: safeParseJson(model.pageInfo),
      detailedInfo: safeParseJson(model.detailedInfo),
      whyModelMattersData: safeParseJson(model.whyModelMattersData),
      sidebarData: safeParseJson(model.sidebarData),
      modelListData: safeParseJson(model.modelListData),
      modelSections: safeParseJson(model.modelSections),
    }));

    console.log("Processed successfully!");
    console.log(
      "First processed model:",
      JSON.stringify(processedModels[0], null, 2)
    );
  } catch (error) {
    console.error("Error:", error.message);
    console.error("Stack:", error.stack);
  } finally {
    await prisma.$disconnect();
  }
}

testService();
