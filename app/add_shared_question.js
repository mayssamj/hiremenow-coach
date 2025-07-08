// Set the environment variable directly
process.env.DATABASE_URL = "postgresql://role_3c5dabce4:10kqIE2DhI1QUKQLmbN1hO9Eaw5WhOK9@db-3c5dabce4.db001.hosteddb.reai.io:5432/3c5dabce4";

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Adding shared question...');
    
    // Create a shared question
    const sharedQuestion = await prisma.question.upsert({
      where: { title: 'Tell me about a time you had to manage a team through a significant change or reorganization.' },
      update: {},
      create: {
        title: 'Tell me about a time you had to manage a team through a significant change or reorganization.',
        content: 'This question assesses your change management skills and ability to maintain team morale during transitions. Focus on communication, transparency, and supporting your team through uncertainty.',
        difficulty: 'MEDIUM',
        type: 'BEHAVIORAL',
        tips: [
          'Use the STAR method to structure your response',
          'Emphasize transparent communication with your team',
          'Show how you addressed individual concerns and fears',
          'Highlight the positive outcomes and lessons learned'
        ],
        followUps: [
          'How did you measure the success of the transition?',
          'What would you do differently if faced with a similar situation?',
          'How did you handle team members who were resistant to change?'
        ]
      }
    });

    console.log('Shared question created:', sharedQuestion.id);

    // Get Amazon and Meta companies
    const amazon = await prisma.company.findUnique({ where: { slug: 'amazon' } });
    const meta = await prisma.company.findUnique({ where: { slug: 'meta' } });

    if (amazon && meta) {
      // Get leadership categories for both companies
      const amazonLeadership = await prisma.category.findFirst({
        where: { companyId: amazon.id, slug: 'leadership' }
      });
      const metaLeadership = await prisma.category.findFirst({
        where: { companyId: meta.id, slug: 'leadership' }
      });

      // Link the question to Amazon
      if (amazonLeadership) {
        await prisma.companyQuestion.upsert({
          where: {
            questionId_companyId: {
              questionId: sharedQuestion.id,
              companyId: amazon.id
            }
          },
          update: {},
          create: {
            questionId: sharedQuestion.id,
            companyId: amazon.id,
            categoryId: amazonLeadership.id,
            isCritical: true,
            order: 10
          }
        });
        console.log('Question linked to Amazon');
      }

      // Link the question to Meta
      if (metaLeadership) {
        await prisma.companyQuestion.upsert({
          where: {
            questionId_companyId: {
              questionId: sharedQuestion.id,
              companyId: meta.id
            }
          },
          update: {},
          create: {
            questionId: sharedQuestion.id,
            companyId: meta.id,
            categoryId: metaLeadership.id,
            isCritical: true,
            order: 10
          }
        });
        console.log('Question linked to Meta');
      }
    }

    console.log('Shared question setup completed!');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
