const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkData() {
  try {
    console.log('Checking database data...');
    
    // Get all models with null names
    const modelsWithNullNames = await prisma.model.findMany({
      where: {
        name: null
      },
      select: {
        id: true,
        name: true,
        brand: true,
        type: true
      }
    });
    
    console.log('Models with null names:', modelsWithNullNames);
    
    // Get all models
    const allModels = await prisma.model.findMany({
      select: {
        id: true,
        name: true,
        brand: true,
        type: true,
        description: true
      }
    });
    
    console.log('All models:', JSON.stringify(allModels, null, 2));
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkData();
