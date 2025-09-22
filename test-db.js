const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testDatabase() {
  try {
    console.log('Testing database connection...');
    
    // Test connection
    await prisma.$connect();
    console.log('✅ Database connected successfully');
    
    // Count models
    const count = await prisma.model.count();
    console.log(`📊 Total models in database: ${count}`);
    
    if (count > 0) {
      // Get sample models
      const models = await prisma.model.findMany({ 
        take: 3,
        select: {
          id: true,
          name: true,
          brand: true,
          type: true,
          description: true
        }
      });
      console.log('📋 Sample models:', JSON.stringify(models, null, 2));
      
      // Get brands
      const brands = await prisma.model.findMany({
        select: { brand: true },
        distinct: ['brand'],
        orderBy: { brand: 'asc' }
      });
      console.log('🏷️ Available brands:', brands.map(b => b.brand));
      
      // Get types
      const types = await prisma.model.findMany({
        select: { type: true },
        distinct: ['type'],
        orderBy: { type: 'asc' }
      });
      console.log('🔧 Available types:', types.map(t => t.type));
    } else {
      console.log('⚠️ No models found in database');
    }
    
  } catch (error) {
    console.error('❌ Database error:', error.message);
    console.error('Full error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabase();
