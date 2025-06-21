
import { PrismaClient, Role, QuestionType, Difficulty } from '@prisma/client';
import bcrypt from 'bcryptjs';
import seedData from '../data/seed_data.json';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  try {
    // Create admin user
    const adminPassword = await bcrypt.hash('adminadmin', 12);
    const admin = await prisma.user.upsert({
      where: { username: 'admin' },
      update: {},
      create: {
        username: 'admin',
        name: 'Admin User',
        password: adminPassword,
        role: Role.ADMIN,
      },
    });
    console.log('✅ Admin user created:', admin.username);

    // Create demo user
    const demoPassword = await bcrypt.hash('demodemo', 12);
    const demo = await prisma.user.upsert({
      where: { username: 'demo' },
      update: {},
      create: {
        username: 'demo',
        name: 'Demo User',
        password: demoPassword,
        role: Role.USER,
      },
    });
    console.log('✅ Demo user created:', demo.username);

    // Seed companies
    const companies = seedData.companies.companies;
    console.log(`🏢 Seeding ${companies.length} companies...`);

    for (const companyData of companies) {
      const slug = companyData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      
      await prisma.company.upsert({
        where: { slug },
        update: {
          name: companyData.name,
          values: companyData.values || [],
          evaluationCriteria: companyData.evaluationCriteria || [],
          interviewFormat: companyData.interviewFormat || '',
          successTips: companyData.successTips || [],
          redFlags: companyData.redFlags || [],
        },
        create: {
          name: companyData.name,
          slug,
          values: companyData.values || [],
          evaluationCriteria: companyData.evaluationCriteria || [],
          interviewFormat: companyData.interviewFormat || '',
          successTips: companyData.successTips || [],
          redFlags: companyData.redFlags || [],
        },
      });
    }
    console.log('✅ Companies seeded successfully');

    // Get all companies for question association
    const allCompanies = await prisma.company.findMany();
    const companyMap = allCompanies.reduce((acc, company) => {
      acc[company.name.toLowerCase()] = company.id;
      return acc;
    }, {} as Record<string, string>);

    // Seed questions from the analysis
    console.log('📝 Seeding questions...');
    
    // Sample questions from the data analysis
    const behavioralQuestions = [
      "Tell me about a time a project you were leading was failing or significantly off-track. What actions did you take?",
      "Share an experience where project requirements were unclear or constantly changing. How did you lead your team through it?",
      "Give an example of a time you had to make an important decision with incomplete or ambiguous information. What was your process?",
      "Give an example of a calculated risk you took where speed was critical. How did you make the decision and manage the risk?",
      "Tell me about a time you had to deliver difficult feedback to a team member. How did you approach it?",
      "Describe a situation where you had to influence someone without having direct authority over them.",
      "Tell me about a time you had to manage conflicting priorities between stakeholders.",
      "Share an example of when you took ownership of a problem that wasn't originally yours to solve.",
      "Describe a time when you learned from a significant failure. What did you change afterward?",
      "Tell me about a time you had to hire and develop team members. What was your approach?",
      "Give an example of how you've built psychological safety within your team.",
      "Describe a situation where you had to handle a major conflict between team members.",
      "Tell me about a time you had to advocate for a technical decision to non-technical stakeholders.",
      "Share an experience where you had to balance technical debt with feature delivery.",
      "Describe how you've approached scaling a team while maintaining quality and culture.",
      "Tell me about a time you had to sunset or deprecate a system or feature.",
      "Give an example of how you've used data to drive a critical engineering decision.",
      "Describe a time when you had to deliver bad news to leadership about a project timeline.",
      "Tell me about your approach to managing engineer career development and growth.",
      "Share an example of how you've improved engineering processes or productivity."
    ];

    const technicalQuestions = [
      "Describe a real-time matching or routing system you've built. How did you handle scale and latency requirements?",
      "How would you design a distributed caching system that can handle millions of requests per second?",
      "Explain how you would implement a recommendation system for a social media platform.",
      "Describe your approach to designing a chat system that supports both 1:1 and group messaging.",
      "How would you architect a system to handle financial transactions with strong consistency guarantees?",
      "Explain how you would design a content delivery network (CDN) from scratch.",
      "Describe how you would implement a rate limiting system for an API gateway.",
      "How would you design a search engine that can index and search through billions of documents?",
      "Explain your approach to designing a real-time analytics system for user behavior tracking.",
      "Describe how you would implement a distributed task queue system.",
      "How would you design a system to handle live video streaming to millions of users?",
      "Explain how you would implement a fault-tolerant payment processing system.",
      "Describe your approach to designing a global DNS system.",
      "How would you architect a system for real-time collaborative editing (like Google Docs)?",
      "Explain how you would design a distributed logging and monitoring system.",
      "Describe how you would implement a machine learning model serving platform.",
      "How would you design a system to handle auction-based bidding in real-time?",
      "Explain your approach to designing a multi-tenant SaaS architecture.",
      "Describe how you would implement a distributed consensus system.",
      "How would you design a system for A/B testing and feature flagging?"
    ];

    const systemDesignQuestions = [
      "Design a URL shortener like bit.ly with analytics capabilities.",
      "Design a distributed file storage system like Dropbox or Google Drive.",
      "Design a real-time chat application like WhatsApp or Slack.",
      "Design a social media feed like Facebook or Twitter timeline.",
      "Design a ride-sharing service like Uber or Lyft.",
      "Design a food delivery system like DoorDash or Uber Eats.",
      "Design a video streaming platform like YouTube or Netflix.",
      "Design a payment system like PayPal or Stripe.",
      "Design a notification system that can handle push, email, and SMS notifications.",
      "Design a search engine like Google with ranking and indexing.",
      "Design a distributed cache system like Redis or Memcached.",
      "Design a database sharding system for a high-traffic application.",
      "Design a rate limiting system for API protection.",
      "Design a monitoring and alerting system for microservices.",
      "Design a recommendation system for an e-commerce platform.",
      "Design a real-time analytics dashboard for business metrics.",
      "Design a content delivery network (CDN) for global content distribution."
    ];

    // Seed behavioral questions
    for (let i = 0; i < behavioralQuestions.length; i++) {
      const question = behavioralQuestions[i];
      const companyNames = Object.keys(companyMap);
      const randomCompany = Math.random() > 0.3 ? companyNames[Math.floor(Math.random() * companyNames.length)] : null;
      
      await prisma.question.create({
        data: {
          text: question,
          category: QuestionType.BEHAVIORAL,
          difficulty: [Difficulty.EASY, Difficulty.MEDIUM, Difficulty.HARD][Math.floor(Math.random() * 3)],
          isCritical: Math.random() > 0.7,
          companyId: randomCompany ? companyMap[randomCompany] : null,
          source: 'seed_data',
          tags: ['leadership', 'teamwork', 'communication', 'problem-solving'].filter(() => Math.random() > 0.5),
        },
      });
    }

    // Seed technical questions
    for (let i = 0; i < technicalQuestions.length; i++) {
      const question = technicalQuestions[i];
      const companyNames = Object.keys(companyMap);
      const randomCompany = Math.random() > 0.3 ? companyNames[Math.floor(Math.random() * companyNames.length)] : null;
      
      await prisma.question.create({
        data: {
          text: question,
          category: QuestionType.TECHNICAL,
          difficulty: [Difficulty.MEDIUM, Difficulty.HARD, Difficulty.EXPERT][Math.floor(Math.random() * 3)],
          isCritical: Math.random() > 0.6,
          companyId: randomCompany ? companyMap[randomCompany] : null,
          source: 'seed_data',
          tags: ['system-design', 'architecture', 'scalability', 'performance'].filter(() => Math.random() > 0.5),
        },
      });
    }

    // Seed system design questions
    for (let i = 0; i < systemDesignQuestions.length; i++) {
      const question = systemDesignQuestions[i];
      const companyNames = Object.keys(companyMap);
      const randomCompany = Math.random() > 0.4 ? companyNames[Math.floor(Math.random() * companyNames.length)] : null;
      
      await prisma.question.create({
        data: {
          text: question,
          category: QuestionType.SYSTEM_DESIGN,
          difficulty: [Difficulty.HARD, Difficulty.EXPERT][Math.floor(Math.random() * 2)],
          isCritical: Math.random() > 0.5,
          companyId: randomCompany ? companyMap[randomCompany] : null,
          source: 'seed_data',
          tags: ['system-design', 'architecture', 'scalability'].filter(() => Math.random() > 0.4),
        },
      });
    }

    console.log('✅ Questions seeded successfully');

    // Create sample tags
    const sampleTags = [
      { name: 'leadership', description: 'Questions about leadership and management', color: '#3B82F6' },
      { name: 'teamwork', description: 'Collaboration and team dynamics', color: '#10B981' },
      { name: 'communication', description: 'Communication and interpersonal skills', color: '#F59E0B' },
      { name: 'problem-solving', description: 'Analytical and problem-solving skills', color: '#EF4444' },
      { name: 'system-design', description: 'System architecture and design', color: '#8B5CF6' },
      { name: 'scalability', description: 'Building scalable systems', color: '#06B6D4' },
      { name: 'performance', description: 'Performance optimization', color: '#84CC16' },
      { name: 'architecture', description: 'Software architecture', color: '#F97316' },
    ];

    for (const tag of sampleTags) {
      await prisma.tag.upsert({
        where: { name: tag.name },
        update: {},
        create: {
          ...tag,
          isGlobal: true,
        },
      });
    }
    console.log('✅ Tags seeded successfully');

    // Create sample story for demo user
    await prisma.story.create({
      data: {
        title: 'Leading a Critical System Migration',
        situation: 'Our legacy payment system was experiencing frequent outages and needed to be migrated to a new architecture within 3 months.',
        task: 'As the engineering manager, I needed to lead a team of 8 engineers to migrate the system while maintaining 99.9% uptime.',
        action: 'I broke down the migration into phases, set up comprehensive monitoring, implemented feature flags for gradual rollout, and established daily standups with clear metrics tracking.',
        result: 'We completed the migration 2 weeks ahead of schedule with zero downtime, reduced latency by 40%, and improved system reliability to 99.99%.',
        reflection: 'I learned the importance of over-communicating during complex migrations and how proper planning can turn a risky project into a success.',
        learnings: 'Breaking down complex projects into smaller, measurable milestones helps maintain team confidence and stakeholder trust.',
        userId: demo.id,
        tags: ['leadership', 'migration', 'system-design'],
        isPublic: false,
      },
    });

    console.log('✅ Sample story created for demo user');

    // Initialize progress tracking for demo user
    const questionCounts = await prisma.question.groupBy({
      by: ['companyId'],
      _count: { id: true },
    });

    for (const { companyId, _count } of questionCounts) {
      if (companyId) {
        await prisma.userProgress.create({
          data: {
            userId: demo.id,
            companyId: companyId,
            totalQuestions: _count.id,
            answeredQuestions: Math.floor(_count.id * 0.3), // 30% completion for demo
            criticalAnswered: Math.floor(_count.id * 0.2),
          },
        });
      }
    }

    console.log('✅ Progress tracking initialized for demo user');

    console.log('🎉 Database seeded successfully!');
    console.log('\n📊 Seed Summary:');
    console.log(`👥 Users: 2 (1 admin, 1 demo)`);
    console.log(`🏢 Companies: ${companies.length}`);
    console.log(`📝 Questions: ${behavioralQuestions.length + technicalQuestions.length + systemDesignQuestions.length}`);
    console.log(`🏷️ Tags: ${sampleTags.length}`);
    console.log(`📚 Stories: 1`);
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
