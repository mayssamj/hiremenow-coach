
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function setupAdminAndSeed() {
  try {
    console.log('Setting up admin user and seeding database...');

    // Create admin user
    const hashedPassword = await bcrypt.hash('AdminAdmin', 12);
    const adminUser = await prisma.user.create({
      data: {
        username: 'admin',
        password: hashedPassword,
        role: 'ADMIN',
        preferredCompany: null
      }
    });
    console.log('✅ Admin user created:', adminUser.username);

    // Create a regular test user
    const testUserPassword = await bcrypt.hash('password123', 12);
    const testUser = await prisma.user.create({
      data: {
        username: 'testuser',
        password: testUserPassword,
        role: 'USER',
        preferredCompany: null
      }
    });
    console.log('✅ Test user created:', testUser.username);

    // Seed companies
    const companies = [
      {
        name: 'Amazon',
        slug: 'amazon',
        description: 'Global e-commerce and cloud computing giant',
        values: ['Customer Obsession', 'Ownership', 'Invent and Simplify', 'Learn and Be Curious'],
        principles: ['Customer Obsession', 'Ownership', 'Invent and Simplify', 'Are Right, A Lot', 'Learn and Be Curious', 'Hire and Develop the Best']
      },
      {
        name: 'Google',
        slug: 'google',
        description: 'Technology company specializing in search and cloud services',
        values: ['Focus on the user', 'Democracy on the web', 'You can make money without doing evil'],
        principles: ['Focus on the user and all else will follow', 'It\'s best to do one thing really, really well', 'Fast is better than slow']
      },
      {
        name: 'Meta',
        slug: 'meta',
        description: 'Social technology company connecting people worldwide',
        values: ['Move Fast', 'Be Bold', 'Focus on Impact', 'Be Open', 'Build Social Value'],
        principles: ['Move Fast', 'Be Bold', 'Focus on Impact', 'Be Open', 'Build Social Value']
      }
    ];

    for (const companyData of companies) {
      const company = await prisma.company.create({
        data: companyData
      });
      console.log(`✅ Company created: ${company.name}`);

      // Create categories for each company
      const categories = [
        { name: 'Leadership', slug: 'leadership', description: 'Leadership and management questions', color: '#3B82F6', icon: 'Users' },
        { name: 'Behavioral', slug: 'behavioral', description: 'Behavioral interview questions', color: '#10B981', icon: 'MessageCircle' },
        { name: 'Technical', slug: 'technical', description: 'Technical and system design questions', color: '#F59E0B', icon: 'Code' }
      ];

      for (let i = 0; i < categories.length; i++) {
        const category = await prisma.category.create({
          data: {
            ...categories[i],
            order: i,
            companyId: company.id
          }
        });
        console.log(`  ✅ Category created: ${category.name}`);
      }
    }

    // Create some sample questions
    const questions = [
      {
        title: 'Tell me about a time you had to make a difficult decision',
        content: 'Describe a situation where you had to make a challenging decision with limited information or competing priorities.',
        difficulty: 'MEDIUM',
        type: 'BEHAVIORAL',
        tips: ['Use the STAR method', 'Focus on your decision-making process', 'Explain the impact of your decision'],
        followUps: ['What would you do differently?', 'How did you measure success?']
      },
      {
        title: 'Describe a time you failed and how you handled it',
        content: 'Share an example of a professional failure and what you learned from it.',
        difficulty: 'MEDIUM',
        type: 'BEHAVIORAL',
        tips: ['Be honest about the failure', 'Focus on lessons learned', 'Show growth mindset'],
        followUps: ['How do you prevent similar failures?', 'What systems do you have in place now?']
      }
    ];

    for (const questionData of questions) {
      const question = await prisma.question.create({
        data: questionData
      });
      console.log(`✅ Question created: ${question.title}`);
    }

    // Create some sample stories for the test user
    const stories = [
      {
        title: 'Leading a Cross-Functional Team',
        content: 'Successfully led a cross-functional team to deliver a critical project under tight deadlines.',
        situation: 'Our company needed to launch a new feature within 6 weeks to meet a client deadline.',
        task: 'I was tasked with leading a team of 8 people from different departments.',
        action: 'I organized daily standups, created clear communication channels, and established milestone checkpoints.',
        result: 'We delivered the project 2 days early and received positive feedback from the client.',
        reflection: 'I learned the importance of clear communication and setting expectations early.',
        isPublic: true,
        userId: testUser.id
      },
      {
        title: 'Handling a Technical Crisis',
        content: 'Managed a critical system outage that affected thousands of users.',
        situation: 'Our main application went down during peak hours, affecting 50,000+ users.',
        task: 'As the on-call engineer, I needed to restore service quickly and communicate with stakeholders.',
        action: 'I immediately assembled the incident response team, identified the root cause, and implemented a fix.',
        result: 'Service was restored within 45 minutes, and we implemented monitoring to prevent future occurrences.',
        reflection: 'This experience taught me the value of having robust monitoring and incident response procedures.',
        isPublic: false,
        userId: testUser.id
      }
    ];

    for (const storyData of stories) {
      const story = await prisma.story.create({
        data: storyData
      });
      console.log(`✅ Story created: ${story.title}`);
    }

    // Create some tags
    const tags = [
      { name: 'Leadership', color: '#3B82F6' },
      { name: 'Problem Solving', color: '#10B981' },
      { name: 'Communication', color: '#F59E0B' },
      { name: 'Technical', color: '#EF4444' },
      { name: 'Teamwork', color: '#8B5CF6' }
    ];

    for (const tagData of tags) {
      const tag = await prisma.tag.create({
        data: tagData
      });
      console.log(`✅ Tag created: ${tag.name}`);
    }

    console.log('\n🎉 Database setup completed successfully!');
    console.log('\nAdmin credentials:');
    console.log('Username: admin');
    console.log('Password: AdminAdmin');
    console.log('\nTest user credentials:');
    console.log('Username: testuser');
    console.log('Password: password123');

  } catch (error) {
    console.error('Error setting up database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

setupAdminAndSeed();
