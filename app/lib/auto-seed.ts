
import { PrismaClient, QuestionType, Difficulty } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function ensureSeededDatabase() {
  try {
    console.log('🔍 Checking if database needs seeding...');
    
    // Check if admin user exists
    const adminUser = await prisma.user.findUnique({
      where: { username: 'admin' },
    });

    // Check if demo user exists
    const demoUser = await prisma.user.findUnique({
      where: { username: 'demo' },
    });

    // Check if companies exist
    const companyCount = await prisma.company.count();

    const needsSeeding = !adminUser || !demoUser || companyCount === 0;

    if (!needsSeeding) {
      console.log('✅ Database already seeded, skipping auto-seed');
      return { success: true, message: 'Database already seeded' };
    }

    console.log('🌱 Database needs seeding, starting auto-seed...');

    // Create admin user if missing
    if (!adminUser) {
      const adminPassword = await bcrypt.hash('adminadmin', 12);
      await prisma.user.upsert({
        where: { username: 'admin' },
        update: {},
        create: {
          username: 'admin',
          name: 'Admin User',
          password: adminPassword,
          role: 'ADMIN',
          isActive: true,
        },
      });
      console.log('✅ Admin user created');
    }

    // Create demo user if missing
    if (!demoUser) {
      const demoPassword = await bcrypt.hash('demodemo', 12);
      await prisma.user.upsert({
        where: { username: 'demo' },
        update: {},
        create: {
          username: 'demo',
          name: 'Demo User',
          password: demoPassword,
          role: 'USER',
          isActive: true,
        },
      });
      console.log('✅ Demo user created');
    }

    // Seed essential companies if missing
    if (companyCount === 0) {
      const essentialCompanies = [
        { name: 'Google', slug: 'google' },
        { name: 'Meta', slug: 'meta' },
        { name: 'Amazon', slug: 'amazon' },
        { name: 'Apple', slug: 'apple' },
        { name: 'Microsoft', slug: 'microsoft' },
        { name: 'Netflix', slug: 'netflix' },
        { name: 'Tesla', slug: 'tesla' },
        { name: 'OpenAI', slug: 'openai' },
      ];

      for (const company of essentialCompanies) {
        await prisma.company.upsert({
          where: { slug: company.slug },
          update: {},
          create: {
            name: company.name,
            slug: company.slug,
            values: JSON.stringify(['Innovation', 'Excellence', 'Collaboration']),
            evaluationCriteria: JSON.stringify(['Technical Skills', 'Communication', 'Problem Solving']),
            interviewFormat: 'Behavioral + Technical + System Design',
            successTips: JSON.stringify(['Be specific with examples', 'Show your thought process', 'Ask clarifying questions']),
            redFlags: JSON.stringify(['Lack of examples', 'Poor communication', 'No questions about the role']),
          },
        });
      }
      console.log(`✅ ${essentialCompanies.length} essential companies seeded`);
    }

    // Create essential questions
    const questionCount = await prisma.question.count();
    if (questionCount === 0) {
      const essentialQuestions = [
        {
          text: "Tell me about a time you had to work with a difficult stakeholder.",
          category: QuestionType.BEHAVIORAL,
          difficulty: Difficulty.MEDIUM,
        },
        {
          text: "Describe a situation where you had to learn a new technology quickly.",
          category: QuestionType.BEHAVIORAL,
          difficulty: Difficulty.MEDIUM,
        },
        {
          text: "How would you design a URL shortener like bit.ly?",
          category: QuestionType.SYSTEM_DESIGN,
          difficulty: Difficulty.HARD,
        },
        {
          text: "Explain the difference between SQL and NoSQL databases.",
          category: QuestionType.TECHNICAL,
          difficulty: Difficulty.MEDIUM,
        },
        {
          text: "Tell me about a time you made a mistake and how you handled it.",
          category: QuestionType.BEHAVIORAL,
          difficulty: Difficulty.EASY,
        },
      ];

      for (const question of essentialQuestions) {
        await prisma.question.create({
          data: {
            ...question,
            isCritical: Math.random() > 0.5,
            source: 'auto-seed',
            tags: JSON.stringify(['essential']),
          },
        });
      }
      console.log(`✅ ${essentialQuestions.length} essential questions seeded`);
    }

    console.log('🎉 Auto-seeding completed successfully!');
    return { success: true, message: 'Database auto-seeded successfully' };

  } catch (error) {
    console.error('❌ Auto-seeding failed:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  } finally {
    await prisma.$disconnect();
  }
}

// Helper function to run seeding on app startup
export async function runStartupSeeding() {
  if (process.env.NODE_ENV === 'development' || process.env.FORCE_SEED === 'true') {
    console.log('🚀 Running startup seeding...');
    await ensureSeededDatabase();
  }
}
