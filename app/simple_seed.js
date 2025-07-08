const { PrismaClient } = require('@prisma/client');

// Set the environment variable directly
process.env.DATABASE_URL = "postgresql://role_3c5dabce4:10kqIE2DhI1QUKQLmbN1hO9Eaw5WhOK9@db-3c5dabce4.db001.hosteddb.reai.io:5432/3c5dabce4";

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Starting simple seed...');
    
    // Add Amazon company
    const amazon = await prisma.company.upsert({
      where: { slug: 'amazon' },
      update: {},
      create: {
        name: 'Amazon',
        slug: 'amazon',
        description: 'Amazon is guided by four principles: customer obsession rather than competitor focus, passion for invention, commitment to operational excellence, and long-term thinking.',
        logoUrl: 'https://logo.clearbit.com/amazon.com',
        values: [
          'Customer Obsession',
          'Ownership',
          'Invent and Simplify',
          'Are Right, A Lot',
          'Learn and Be Curious',
          'Hire and Develop the Best'
        ],
        principles: [
          'Customer Obsession',
          'Ownership', 
          'Invent and Simplify',
          'Are Right, A Lot',
          'Learn and Be Curious',
          'Hire and Develop the Best',
          'Insist on the Highest Standards',
          'Think Big',
          'Bias for Action',
          'Frugality',
          'Earn Trust',
          'Dive Deep',
          'Have Backbone; Disagree and Commit',
          'Deliver Results',
          'Strive to be Earth\'s Best Employer',
          'Success and Scale Bring Broad Responsibility'
        ]
      }
    });

    console.log('Amazon company created:', amazon.id);

    // Create categories for Amazon
    const categoryTemplates = [
      {
        name: 'Leadership & People Management',
        slug: 'leadership',
        description: 'Questions about leading teams, managing people, and driving organizational change',
        color: '#3B82F6',
        icon: 'Users',
        order: 1
      },
      {
        name: 'Technical Strategy & Architecture',
        slug: 'technical',
        description: 'System design, technical decision-making, and architectural leadership',
        color: '#10B981',
        icon: 'Code',
        order: 2
      },
      {
        name: 'Product & Business Impact',
        slug: 'product',
        description: 'Product strategy, business metrics, and cross-functional collaboration',
        color: '#F59E0B',
        icon: 'TrendingUp',
        order: 3
      },
      {
        name: 'Culture & Values',
        slug: 'culture',
        description: 'Company-specific culture, values, and behavioral competencies',
        color: '#EF4444',
        icon: 'Heart',
        order: 4
      },
      {
        name: 'Execution & Operations',
        slug: 'execution',
        description: 'Project management, delivery, and operational excellence',
        color: '#8B5CF6',
        icon: 'Zap',
        order: 5
      }
    ];

    for (const template of categoryTemplates) {
      await prisma.category.upsert({
        where: { 
          companyId_slug: {
            companyId: amazon.id,
            slug: template.slug
          }
        },
        update: {},
        create: {
          ...template,
          companyId: amazon.id
        }
      });
    }

    console.log('Amazon categories created');

    // Add Amazon-specific questions
    const amazonQuestions = [
      {
        title: 'Describe a time you had to make a decision that prioritized long-term value over short-term gains.',
        content: 'This question directly relates to Amazon\'s Ownership principle. Show how you think long-term and act on behalf of the entire company.',
        difficulty: 'MEDIUM',
        type: 'BEHAVIORAL',
        categorySlug: 'culture',
        isCritical: true,
        order: 1,
        tips: [
          'Demonstrate long-term thinking and ownership',
          'Show how you considered broader company impact',
          'Explain the trade-offs you evaluated',
          'Highlight the long-term benefits achieved'
        ],
        followUps: [
          'How do you balance short-term pressures with long-term goals?',
          'What frameworks do you use for long-term decision making?',
          'How do you communicate long-term decisions to stakeholders?'
        ]
      },
      {
        title: 'Tell me about a time you had to dive deep into a technical problem to find the root cause.',
        content: 'This question assesses the "Dive Deep" leadership principle. Show your technical depth and investigative skills.',
        difficulty: 'MEDIUM',
        type: 'TECHNICAL',
        categorySlug: 'technical',
        isCritical: true,
        order: 2,
        tips: [
          'Demonstrate technical depth and analytical skills',
          'Show systematic approach to problem-solving',
          'Explain how you validated your findings',
          'Highlight the impact of solving the root cause'
        ],
        followUps: [
          'How do you ensure you\'re solving the right problem?',
          'What tools and techniques do you use for root cause analysis?',
          'How do you prevent similar issues in the future?'
        ]
      }
    ];

    for (const questionData of amazonQuestions) {
      // Create or find the base question
      const question = await prisma.question.upsert({
        where: { title: questionData.title },
        update: {},
        create: {
          title: questionData.title,
          content: questionData.content,
          difficulty: questionData.difficulty,
          type: questionData.type,
          tips: questionData.tips,
          followUps: questionData.followUps
        }
      });

      // Find the category
      const category = await prisma.category.findFirst({
        where: {
          companyId: amazon.id,
          slug: questionData.categorySlug
        }
      });

      if (category) {
        await prisma.companyQuestion.upsert({
          where: {
            questionId_companyId: {
              questionId: question.id,
              companyId: amazon.id
            }
          },
          update: {},
          create: {
            questionId: question.id,
            companyId: amazon.id,
            categoryId: category.id,
            isCritical: questionData.isCritical,
            order: questionData.order
          }
        });
      }
    }

    console.log('Amazon questions created');
    console.log('Simple seed completed successfully!');

  } catch (error) {
    console.error('Error in simple seed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
