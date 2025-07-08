
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function fixCompanyLogos() {
  try {
    console.log('Fixing company logo URLs...');
    
    // Get all companies with logoUrl
    const companies = await prisma.company.findMany({
      where: {
        logoUrl: {
          not: null
        }
      }
    });
    
    console.log(`Found ${companies.length} companies with logo URLs`);
    
    for (const company of companies) {
      if (company.logoUrl) {
        // Remove curly braces if they exist
        let cleanUrl = company.logoUrl;
        if (cleanUrl.startsWith('{') && cleanUrl.endsWith('}')) {
          cleanUrl = cleanUrl.slice(1, -1);
        }
        
        console.log(`Updating ${company.name}: ${company.logoUrl} -> ${cleanUrl}`);
        
        await prisma.company.update({
          where: { id: company.id },
          data: { logoUrl: cleanUrl }
        });
      }
    }
    
    console.log('✅ Company logo URLs fixed successfully!');
    
    // Verify the fix
    const updatedCompanies = await prisma.company.findMany({
      select: {
        name: true,
        logoUrl: true
      }
    });
    
    console.log('\nUpdated company logos:');
    updatedCompanies.forEach(company => {
      console.log(`- ${company.name}: ${company.logoUrl || 'NULL'}`);
    });
    
  } catch (error) {
    console.error('Error fixing company logos:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixCompanyLogos();
