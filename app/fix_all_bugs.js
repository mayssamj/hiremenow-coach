
const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');

const prisma = new PrismaClient();

// Simple CUID-like ID generator
function createId() {
  return 'cm' + crypto.randomBytes(12).toString('base64url');
}

async function fixAllBugs() {
  console.log('🔧 Starting comprehensive bug fixes...\n');

  try {
    // Phase 1: Database Category Consolidation
    console.log('📊 Phase 1: Consolidating duplicate categories...');
    
    // Get all categories grouped by name
    const categories = await prisma.category.findMany({
      include: {
        Company: { select: { name: true } },
        _count: { select: { CompanyQuestion: true } }
      },
      orderBy: [{ name: 'asc' }, { companyId: 'asc' }]
    });

    // Group by name to find duplicates
    const categoryGroups = {};
    categories.forEach(cat => {
      if (!categoryGroups[cat.name]) {
        categoryGroups[cat.name] = [];
      }
      categoryGroups[cat.name].push(cat);
    });

    // Consolidate duplicates
    for (const [name, cats] of Object.entries(categoryGroups)) {
      if (cats.length > 1) {
        console.log(`  Consolidating "${name}" (${cats.length} instances)`);
        
        // Keep the one with most questions, or first one if tied
        const primaryCategory = cats.reduce((prev, current) => 
          current._count.CompanyQuestion > prev._count.CompanyQuestion ? current : prev
        );
        
        const duplicateCategories = cats.filter(cat => cat.id !== primaryCategory.id);
        
        // Move all questions from duplicates to primary
        for (const duplicate of duplicateCategories) {
          if (duplicate._count.CompanyQuestion > 0) {
            await prisma.companyQuestion.updateMany({
              where: { categoryId: duplicate.id },
              data: { categoryId: primaryCategory.id }
            });
            console.log(`    Moved ${duplicate._count.CompanyQuestion} questions from ${duplicate.Company.name} to primary category`);
          }
          
          // Delete the duplicate category
          await prisma.category.delete({
            where: { id: duplicate.id }
          });
          console.log(`    Deleted duplicate category from ${duplicate.Company.name}`);
        }
      }
    }

    // Phase 2: Fix System Design Questions Display
    console.log('\n🎯 Phase 2: Fixing system design questions...');
    
    // Check current system design questions
    const systemDesignQuestions = await prisma.systemDesignQuestion.findMany({
      include: {
        Company: { select: { name: true } }
      }
    });
    
    console.log(`  Found ${systemDesignQuestions.length} system design questions`);
    
    // Add more system design questions to reach minimum requirements
    const companies = await prisma.company.findMany({
      include: {
        _count: {
          select: {
            SystemDesignQuestion: true,
            CompanyQuestion: true
          }
        }
      }
    });

    const systemDesignQuestionTemplates = [
      {
        title: "Design a Chat System",
        description: "Design a real-time chat system that can handle millions of users with features like group chats, message history, and online presence.",
        difficulty: "MEDIUM",
        requirements: "Support 1M+ concurrent users, real-time messaging, group chats, message persistence, user presence",
        architecture: "WebSocket connections, message queues, distributed databases, caching layer",
        components: "Load balancers, chat servers, message queue (Kafka/RabbitMQ), database clusters, Redis cache",
        dataModel: "User table, Chat rooms, Messages, User sessions, Friendship relationships",
        scalability: "Horizontal scaling of chat servers, database sharding, CDN for media files",
        tradeoffs: "Consistency vs availability, real-time vs reliability, storage costs vs performance",
        tags: ["real-time", "messaging", "websockets", "distributed-systems"],
        estimatedTime: 45
      },
      {
        title: "Design a URL Shortener",
        description: "Design a URL shortening service like bit.ly that can handle billions of URLs with analytics and custom aliases.",
        difficulty: "EASY",
        requirements: "Shorten URLs, redirect to original, custom aliases, analytics, high availability",
        architecture: "REST API, database for URL mapping, caching layer, analytics pipeline",
        components: "Web servers, database (SQL/NoSQL), Redis cache, analytics service, CDN",
        dataModel: "URL mappings, User accounts, Analytics events, Custom aliases",
        scalability: "Database sharding, read replicas, caching strategies, CDN distribution",
        tradeoffs: "Read vs write optimization, storage efficiency, cache eviction policies",
        tags: ["web-service", "caching", "analytics", "high-availability"],
        estimatedTime: 30
      },
      {
        title: "Design a Video Streaming Platform",
        description: "Design a video streaming platform like YouTube that can handle video uploads, processing, and streaming to millions of users.",
        difficulty: "HARD",
        requirements: "Video upload/processing, streaming, recommendations, comments, subscriptions",
        architecture: "Microservices, video processing pipeline, CDN, recommendation engine",
        components: "Upload service, video processing, metadata database, CDN, recommendation ML models",
        dataModel: "Videos, Users, Comments, Subscriptions, View history, Recommendations",
        scalability: "Global CDN, video encoding optimization, database partitioning",
        tradeoffs: "Storage costs vs quality, processing time vs user experience, global distribution",
        tags: ["video-streaming", "cdn", "microservices", "machine-learning"],
        estimatedTime: 60
      },
      {
        title: "Design a Social Media Feed",
        description: "Design a social media news feed system that can generate personalized feeds for millions of users in real-time.",
        difficulty: "HARD",
        requirements: "Personalized feeds, real-time updates, high throughput, low latency",
        architecture: "Feed generation service, timeline service, notification system, caching layers",
        components: "User service, post service, feed generation, timeline cache, push notifications",
        dataModel: "Users, Posts, Followers, Likes, Comments, Feed cache",
        scalability: "Feed pre-computation, cache warming, database sharding, async processing",
        tradeoffs: "Push vs pull model, storage vs computation, real-time vs eventual consistency",
        tags: ["social-media", "feeds", "real-time", "personalization"],
        estimatedTime: 50
      },
      {
        title: "Design a Distributed Cache",
        description: "Design a distributed caching system like Redis Cluster that provides high availability and horizontal scaling.",
        difficulty: "MEDIUM",
        requirements: "Distributed storage, high availability, consistent hashing, replication",
        architecture: "Consistent hashing, master-slave replication, cluster management",
        components: "Cache nodes, cluster manager, client library, monitoring service",
        dataModel: "Key-value pairs, node metadata, replication logs, cluster topology",
        scalability: "Horizontal scaling, automatic sharding, load balancing",
        tradeoffs: "Consistency vs availability, memory vs persistence, complexity vs performance",
        tags: ["distributed-systems", "caching", "consistency", "replication"],
        estimatedTime: 40
      },
      {
        title: "Design a Search Engine",
        description: "Design a web search engine that can crawl, index, and search billions of web pages with relevance ranking.",
        difficulty: "HARD",
        requirements: "Web crawling, indexing, search ranking, query processing, high availability",
        architecture: "Crawler service, indexing pipeline, search service, ranking algorithms",
        components: "Web crawlers, index builders, search servers, ranking service, query processor",
        dataModel: "Web pages, inverted index, page rank scores, query logs, user preferences",
        scalability: "Distributed crawling, index sharding, parallel query processing",
        tradeoffs: "Index size vs search speed, crawl frequency vs resources, relevance vs performance",
        tags: ["search", "crawling", "indexing", "ranking"],
        estimatedTime: 60
      }
    ];

    // Add system design questions for companies that need them
    for (const company of companies) {
      const currentSDCount = company._count.SystemDesignQuestion;
      const totalQuestions = company._count.CompanyQuestion + currentSDCount;
      
      if (totalQuestions < 10 || currentSDCount < 3) {
        const questionsToAdd = Math.max(3 - currentSDCount, 10 - totalQuestions);
        console.log(`  Adding ${questionsToAdd} system design questions for ${company.name}`);
        
        for (let i = 0; i < questionsToAdd && i < systemDesignQuestionTemplates.length; i++) {
          const template = systemDesignQuestionTemplates[i];
          
          await prisma.systemDesignQuestion.create({
            data: {
              id: createId(),
              title: `${template.title} (${company.name} Focus)`,
              description: template.description,
              difficulty: template.difficulty,
              companyId: company.id,
              isGeneral: false,
              requirements: template.requirements,
              architecture: template.architecture,
              components: template.components,
              dataModel: template.dataModel,
              scalability: template.scalability,
              tradeoffs: template.tradeoffs,
              references: [],
              videoLinks: [],
              blogPosts: [],
              tags: template.tags,
              estimatedTime: template.estimatedTime,
              order: i,
              isPublished: true,
              createdAt: new Date(),
              updatedAt: new Date()
            }
          });
        }
      }
    }

    // Phase 3: Add more behavioral questions to reach minimum 10 per company
    console.log('\n📝 Phase 3: Adding behavioral questions to reach minimum requirements...');
    
    const behavioralQuestionTemplates = [
      {
        title: "Tell me about a time you had to make a difficult technical decision",
        content: "Describe a situation where you had to choose between multiple technical approaches, each with significant trade-offs. How did you evaluate the options and what was the outcome?",
        type: "BEHAVIORAL",
        difficulty: "MEDIUM",
        tips: [
          "Focus on the decision-making process, not just the technical details",
          "Explain how you gathered input from stakeholders",
          "Discuss the trade-offs you considered",
          "Share the long-term impact of your decision"
        ],
        followUps: [
          "How did you communicate this decision to your team?",
          "What would you do differently if faced with a similar situation?",
          "How did you measure the success of this decision?"
        ]
      },
      {
        title: "Describe a time when you had to deliver bad news to stakeholders",
        content: "Tell me about a situation where you had to communicate disappointing news about a project delay, budget overrun, or technical limitation to stakeholders.",
        type: "BEHAVIORAL", 
        difficulty: "MEDIUM",
        tips: [
          "Show how you prepared for the conversation",
          "Demonstrate transparency and honesty",
          "Explain how you provided solutions or alternatives",
          "Discuss how you maintained stakeholder trust"
        ],
        followUps: [
          "How did stakeholders react to the news?",
          "What steps did you take to prevent similar issues?",
          "How do you typically prepare for difficult conversations?"
        ]
      },
      {
        title: "Tell me about a time you had to influence without authority",
        content: "Describe a situation where you needed to get something done but didn't have direct authority over the people or resources required.",
        type: "LEADERSHIP",
        difficulty: "MEDIUM", 
        tips: [
          "Focus on your influence and persuasion techniques",
          "Show how you built relationships and trust",
          "Explain how you aligned others with your vision",
          "Demonstrate the impact of your influence"
        ],
        followUps: [
          "What resistance did you encounter and how did you overcome it?",
          "How do you typically build influence in new situations?",
          "What would you do differently next time?"
        ]
      },
      {
        title: "Describe a time when you had to manage competing priorities",
        content: "Tell me about a situation where you had multiple urgent projects or requests and had to decide how to allocate your team's time and resources.",
        type: "LEADERSHIP",
        difficulty: "MEDIUM",
        tips: [
          "Explain your prioritization framework",
          "Show how you communicated with stakeholders",
          "Discuss how you managed team workload",
          "Share the outcomes and lessons learned"
        ],
        followUps: [
          "How did you communicate priority changes to your team?",
          "What criteria do you use to prioritize work?",
          "How do you handle pushback on prioritization decisions?"
        ]
      },
      {
        title: "Tell me about a time you failed and what you learned",
        content: "Describe a significant professional failure or mistake you made, how you handled it, and what you learned from the experience.",
        type: "BEHAVIORAL",
        difficulty: "MEDIUM",
        tips: [
          "Choose a real failure, not a disguised success",
          "Take ownership without blaming others",
          "Focus on what you learned and how you grew",
          "Show how you applied the lessons learned"
        ],
        followUps: [
          "How did you communicate the failure to your team/manager?",
          "What processes did you put in place to prevent similar failures?",
          "How has this experience changed your leadership approach?"
        ]
      }
    ];

    // Add behavioral questions for companies that need them
    for (const company of companies) {
      const totalQuestions = company._count.CompanyQuestion + company._count.SystemDesignQuestion;
      
      if (totalQuestions < 10) {
        const questionsToAdd = 10 - totalQuestions;
        console.log(`  Adding ${questionsToAdd} behavioral questions for ${company.name}`);
        
        // Get existing categories for this company
        const companyCategories = await prisma.category.findMany({
          where: { companyId: company.id }
        });
        
        // Find or create a behavioral category
        let behavioralCategory = companyCategories.find(cat => 
          cat.name.toLowerCase().includes('behavioral') || 
          cat.name.toLowerCase().includes('leadership')
        );
        
        if (!behavioralCategory) {
          behavioralCategory = await prisma.category.create({
            data: {
              id: createId(),
              name: 'Behavioral',
              slug: 'behavioral',
              description: 'Behavioral and situational interview questions',
              color: '#3B82F6',
              icon: 'Users',
              order: 0,
              companyId: company.id,
              createdAt: new Date(),
              updatedAt: new Date()
            }
          });
        }
        
        for (let i = 0; i < questionsToAdd && i < behavioralQuestionTemplates.length; i++) {
          const template = behavioralQuestionTemplates[i];
          
          // Create the question with unique title
          const question = await prisma.question.create({
            data: {
              id: createId(),
              title: `${template.title} - ${company.name}`,
              content: template.content,
              difficulty: template.difficulty,
              type: template.type,
              tips: template.tips,
              followUps: template.followUps,
              isAiGenerated: false,
              createdAt: new Date(),
              updatedAt: new Date()
            }
          });
          
          // Link to company
          await prisma.companyQuestion.create({
            data: {
              id: createId(),
              questionId: question.id,
              companyId: company.id,
              categoryId: behavioralCategory.id,
              isCritical: i < 2, // Mark first 2 as critical
              order: i,
              createdAt: new Date(),
              updatedAt: new Date()
            }
          });
        }
      }
    }

    console.log('\n✅ All database fixes completed successfully!');
    
  } catch (error) {
    console.error('❌ Error during bug fixes:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the fixes
fixAllBugs()
  .then(() => {
    console.log('\n🎉 Bug fixes completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Bug fixes failed:', error);
    process.exit(1);
  });
