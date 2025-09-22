const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testGetAllModels() {
  try {
    console.log('Testing getAllModels function...');
    
    // Simulate the getAllModels function logic
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
    
    console.log('Raw models from DB:', models.length);
    console.log('First model:', JSON.stringify(models[0], null, 2));
    
    // Test JSON parsing
    const processedModels = models.map((model) => {
      try {
        return {
          ...model,
          hero: model.hero ? JSON.parse(model.hero) : null,
          pageInfo: model.pageInfo ? JSON.parse(model.pageInfo) : null,
          detailedInfo: model.detailedInfo ? JSON.parse(model.detailedInfo) : null,
          whyModelMattersData: model.whyModelMattersData ? JSON.parse(model.whyModelMattersData) : null,
          sidebarData: model.sidebarData ? JSON.parse(model.sidebarData) : null,
          modelListData: model.modelListData ? JSON.parse(model.modelListData) : null,
          modelSections: model.modelSections ? JSON.parse(model.modelSections) : null,
        };
      } catch (parseError) {
        console.error('JSON parse error for model:', model.id, parseError.message);
        return {
          ...model,
          hero: null,
          pageInfo: null,
          detailedInfo: null,
          whyModelMattersData: null,
          sidebarData: null,
          modelListData: null,
          modelSections: null,
        };
      }
    });
    
    console.log('Processed models:', processedModels.length);
    console.log('Success!');
    
  } catch (error) {
    console.error('Error:', error.message);
    console.error('Full error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testGetAllModels();
