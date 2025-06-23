
import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { readFileSync } from 'fs';
import { join } from 'path';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create default users
  const adminPasswordHash = await bcrypt.hash('adminadmin', 12);
  const demoPasswordHash = await bcrypt.hash('demodemo', 12);

  // Create admin user
  const adminUser = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      name: 'Admin User',
      email: 'admin@hiremenow.coach',
      password: adminPasswordHash,
      role: Role.ADMIN,
      themePreference: 'abacus-ai',
      isActive: true,
    },
  });

  // Create demo user
  const demoUser = await prisma.user.upsert({
    where: { username: 'demo' },
    update: {},
    create: {
      username: 'demo',
      name: 'Demo User',
      email: 'demo@hiremenow.coach',
      password: demoPasswordHash,
      role: Role.USER,
      themePreference: 'modern-vibrant',
      isActive: true,
    },
  });

  console.log('✅ Created default users:', {
    admin: { id: adminUser.id, username: adminUser.username },
    demo: { id: demoUser.id, username: demoUser.username }
  });

  // Load and seed company data
  try {
    const seedDataPath = join(process.cwd(), 'data', 'seed_data.json');
    const seedData = JSON.parse(readFileSync(seedDataPath, 'utf8'));

    console.log('📊 Seeding companies and questions...');

    for (const companyData of seedData.companies) {
      const company = await prisma.company.upsert({
        where: { slug: companyData.slug },
        update: {
          name: companyData.name,
          industry: companyData.industry,
          description: companyData.description,
          website: companyData.website,
          logo: companyData.logo,
          values: JSON.stringify(companyData.values || []),
          evaluationCriteria: JSON.stringify(companyData.evaluationCriteria || []),
          interviewFormat: companyData.interviewFormat,
          successTips: JSON.stringify(companyData.successTips || []),
          redFlags: JSON.stringify(companyData.redFlags || []),
        },
        create: {
          name: companyData.name,
          slug: companyData.slug,
          industry: companyData.industry,
          description: companyData.description,
          website: companyData.website,
          logo: companyData.logo,
          values: JSON.stringify(companyData.values || []),
          evaluationCriteria: JSON.stringify(companyData.evaluationCriteria || []),
          interviewFormat: companyData.interviewFormat,
          successTips: JSON.stringify(companyData.successTips || []),
          redFlags: JSON.stringify(companyData.redFlags || []),
        },
      });

      // Seed questions for this company
      if (companyData.questions && companyData.questions.length > 0) {
        for (const questionData of companyData.questions) {
          // Check if question already exists
          const existingQuestion = await prisma.question.findFirst({
            where: {
              text: questionData.text,
              companyId: company.id,
            },
          });

          if (!existingQuestion) {
            await prisma.question.create({
              data: {
                text: questionData.text,
                category: questionData.category,
                difficulty: questionData.difficulty,
                isCritical: questionData.isCritical || false,
                companyId: company.id,
                source: questionData.source,
                tags: JSON.stringify(questionData.tags || []),
              },
            });
          }
        }
      }

      console.log(`✅ Seeded company: ${company.name}`);
    }

    // Seed general questions (not company-specific)
    if (seedData.questions && seedData.questions.length > 0) {
      for (const questionData of seedData.questions) {
        // Check if question already exists
        const existingQuestion = await prisma.question.findFirst({
          where: {
            text: questionData.text,
            companyId: null,
          },
        });

        if (!existingQuestion) {
          await prisma.question.create({
            data: {
              text: questionData.text,
              category: questionData.category,
              difficulty: questionData.difficulty,
              isCritical: questionData.isCritical || false,
              companyId: null,
              source: questionData.source,
              tags: JSON.stringify(questionData.tags || []),
            },
          });
        }
      }
      console.log(`✅ Seeded ${seedData.questions.length} general questions`);
    }

  } catch (error) {
    console.log('⚠️  Seed data file not found or invalid, skipping company/question seeding');
    console.log('Error:', error);
  }

  // Create sample stories for demo user
  const sampleStories = [
    {
      title: 'Leading Cross-Functional Team Migration',
      situation: 'Our company needed to migrate a legacy system that was critical to daily operations, involving multiple teams across engineering, product, and operations.',
      task: 'As the technical lead, I was responsible for coordinating the migration while ensuring zero downtime and minimal disruption to business operations.',
      action: 'I created a detailed migration plan with rollback procedures, established clear communication channels between teams, implemented feature flags for gradual rollout, and conducted extensive testing in staging environments.',
      result: 'Successfully migrated 100% of users with zero downtime, reduced system response time by 40%, and improved team collaboration processes that were adopted company-wide.',
      reflection: 'This experience taught me the importance of overcommunication and having robust fallback plans when leading complex technical initiatives.',
      learnings: 'Cross-functional leadership requires balancing technical excellence with clear stakeholder communication. Always plan for the unexpected.',
      tags: JSON.stringify(['leadership', 'migration', 'cross-functional', 'technical-lead']),
      userId: demoUser.id,
      isPublic: false,
    },
    {
      title: 'Handling Production Crisis Under Pressure',
      situation: 'A critical bug was discovered in production during peak traffic hours, causing a 30% increase in error rates and affecting thousands of users.',
      task: 'I needed to quickly identify the root cause, implement a fix, and communicate with stakeholders while minimizing user impact.',
      action: 'I immediately assembled an incident response team, used monitoring tools to isolate the issue, implemented a hotfix within 2 hours, and created a detailed post-mortem analysis.',
      result: 'Resolved the issue with minimal customer impact, established new monitoring alerts to prevent similar issues, and improved our incident response procedures.',
      reflection: 'Working under pressure revealed the importance of staying calm and methodical even in crisis situations.',
      learnings: 'Preparation and clear processes are crucial for effective incident response. Good monitoring and observability tools are investments, not costs.',
      tags: JSON.stringify(['crisis-management', 'debugging', 'incident-response', 'production']),
      userId: demoUser.id,
      isPublic: false,
    }
  ];

  for (const storyData of sampleStories) {
    await prisma.story.create({
      data: storyData,
    });
  }

  console.log(`✅ Created ${sampleStories.length} sample stories for demo user`);

  // Create some global tags
  const globalTags = [
    { name: 'leadership', color: '#3B82F6', description: 'Leadership and management experiences' },
    { name: 'technical', color: '#10B981', description: 'Technical implementation and problem-solving' },
    { name: 'collaboration', color: '#8B5CF6', description: 'Teamwork and cross-functional projects' },
    { name: 'crisis-management', color: '#EF4444', description: 'Handling urgent situations and problems' },
    { name: 'innovation', color: '#F59E0B', description: 'Creative solutions and improvements' },
  ];

  for (const tagData of globalTags) {
    await prisma.tag.upsert({
      where: { name: tagData.name },
      update: {},
      create: {
        ...tagData,
        isGlobal: true,
        usage_count: 0,
      },
    });
  }

  console.log(`✅ Created ${globalTags.length} global tags`);

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
