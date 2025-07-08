export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST() {
  try {
    // Clear existing data in correct order
    await prisma.userNote.deleteMany();
    await prisma.storyQuestion.deleteMany();
    await prisma.storyTag.deleteMany();
    await prisma.story.deleteMany();
    await prisma.tag.deleteMany();
    await prisma.companyQuestion.deleteMany(); // New junction table
    await prisma.question.deleteMany();
    await prisma.category.deleteMany();
    await prisma.company.deleteMany();
    await prisma.fAQ.deleteMany();

    // Create all companies
    const companies = [
      {
        name: 'Meta',
        slug: 'meta',
        description: 'Meta builds technologies that help people connect, find communities, and grow businesses.',
        logoUrl: 'https://logo.clearbit.com/meta.com',
        values: [
          'Move Fast',
          'Be Bold',
          'Focus on Impact',
          'Be Open',
          'Build Social Value'
        ],
        principles: [
          'Give people a voice',
          'Build connection and community',
          'Serve everyone',
          'Keep people safe and protect privacy',
          'Promote economic opportunity'
        ]
      },
      {
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
      },
      {
        name: 'Google',
        slug: 'google',
        description: 'Google\'s mission is to organize the world\'s information and make it universally accessible and useful.',
        logoUrl: 'https://logo.clearbit.com/google.com',
        values: [
          'Focus on the user',
          'It\'s best to do one thing really, really well',
          'Fast is better than slow',
          'Democracy on the web works',
          'You don\'t need to be at your desk to need an answer'
        ],
        principles: [
          'Good Coach',
          'Empowers Teams',
          'Creates Inclusive Environment',
          'Productive and Results-Oriented',
          'Excellent Communicator',
          'Supports Career Development',
          'Has Clear Vision/Strategy',
          'Has Key Technical Skills',
          'Collaborates Effectively',
          'Strong Decision-Maker'
        ]
      },
      {
        name: 'OpenAI',
        slug: 'openai',
        description: 'OpenAI\'s mission is to ensure that artificial general intelligence benefits all of humanity.',
        logoUrl: 'https://logo.clearbit.com/openai.com',
        values: [
          'AGI Focus',
          'Intense and Scrappy',
          'Scale',
          'Make Something People Love',
          'Team Spirit'
        ],
        principles: [
          'Safety First',
          'Broad Benefit',
          'Long-term Safety',
          'Technical Leadership',
          'Cooperative Orientation'
        ]
      },
      {
        name: 'Snowflake',
        slug: 'snowflake',
        description: 'Snowflake enables every organization to mobilize their data with Snowflake\'s Data Cloud.',
        logoUrl: 'https://logo.clearbit.com/snowflake.com',
        values: [
          'Put Customers First',
          'Integrity Always',
          'Think Big',
          'Be Excellent',
          'Get It Done'
        ],
        principles: [
          'Customer Obsession',
          'Innovation',
          'Continuous Learning',
          'Data-Driven Decisions',
          'Operational Excellence'
        ]
      },
      {
        name: 'Anthropic',
        slug: 'anthropic',
        description: 'Anthropic is an AI safety company focused on building reliable, interpretable, and steerable AI systems.',
        logoUrl: 'https://logo.clearbit.com/anthropic.com',
        values: [
          'AI Safety First',
          'Ethical Development',
          'Research Excellence',
          'Transparency',
          'Collaboration'
        ],
        principles: [
          'Safety by Design',
          'Interpretability',
          'Beneficial AI',
          'Responsible Development',
          'Scientific Rigor'
        ]
      },
      {
        name: 'Scale AI',
        slug: 'scale-ai',
        description: 'Scale AI accelerates the development of AI applications by providing high-quality training data.',
        logoUrl: 'https://logo.clearbit.com/scale.com',
        values: [
          'Customer Success',
          'Bias for Action',
          'Continuous Learning',
          'Transparency',
          'Excellence'
        ],
        principles: [
          'Data Quality Excellence',
          'Rapid Iteration',
          'Customer-Centric Innovation',
          'Scalable Solutions',
          'Ethical AI Development'
        ]
      },
      {
        name: 'Netflix',
        slug: 'netflix',
        description: 'Netflix is the world\'s leading streaming entertainment service with over 230 million paid memberships.',
        logoUrl: 'https://logo.clearbit.com/netflix.com',
        values: [
          'Judgment',
          'Communication',
          'Impact',
          'Curiosity',
          'Innovation',
          'Courage',
          'Passion',
          'Honesty',
          'Selflessness',
          'Inclusion',
          'Integrity'
        ],
        principles: [
          'Freedom and Responsibility',
          'High Performance',
          'Radical Candor',
          'Stunning Colleagues',
          'Context not Control'
        ]
      },
      {
        name: 'LinkedIn',
        slug: 'linkedin',
        description: 'LinkedIn\'s mission is to connect the world\'s professionals to make them more productive and successful.',
        logoUrl: 'https://logo.clearbit.com/linkedin.com',
        values: [
          'Members First',
          'Relationships Matter',
          'Be Open, Honest and Constructive',
          'Inspire Excellence',
          'Take Intelligent Risks',
          'Act Like an Owner',
          'Integrity',
          'Collaboration',
          'Growth Mindset',
          'Innovation',
          'Diversity, Inclusion, Belonging'
        ],
        principles: [
          'Growth Mindset',
          'Member-First Approach',
          'Data-Driven Decisions',
          'Collaborative Leadership',
          'Inclusive Excellence',
          'Strategic Thinking',
          'Continuous Learning',
          'Professional Network Focus'
        ]
      },
      {
        name: 'Uber',
        slug: 'uber',
        description: 'Uber ignites opportunity by setting the world in motion, connecting people and communities through transportation and delivery.',
        logoUrl: 'https://logo.clearbit.com/uber.com',
        values: [
          'Impact and Execution',
          'Scale and Reliability',
          'Customer Obsession',
          'Data-Driven Decisions',
          'Innovation',
          'Collaboration',
          'Safety'
        ],
        principles: [
          'Move Fast and Scale',
          'Real-Time Operations',
          'Global Marketplace Dynamics',
          'High-Stakes Reliability',
          'Cross-Functional Excellence',
          'Operational Excellence',
          'Customer-Centric Innovation'
        ]
      },
      {
        name: 'AirBnB',
        slug: 'airbnb',
        description: 'Airbnb\'s mission is to create a world where anyone can belong anywhere.',
        logoUrl: 'https://logo.clearbit.com/airbnb.com',
        values: [
          'Champion the Mission',
          'Be a Host',
          'Embrace the Adventure',
          'Be a Cereal Entrepreneur'
        ],
        principles: [
          'Belonging and Community',
          'Hospitality and Empathy',
          'Resilience and Adaptability',
          'Ownership and Initiative',
          'Trust and Safety',
          'Global Marketplace',
          'User Experience Excellence'
        ]
      },
      {
        name: 'TikTok',
        slug: 'tiktok',
        description: 'TikTok is the leading destination for short-form mobile video, inspiring creativity and bringing joy.',
        logoUrl: 'https://logo.clearbit.com/tiktok.com',
        values: [
          'Creativity',
          'Inclusion',
          'Innovation',
          'User-Focus',
          'Impact-Driven',
          'Efficiency and Speed'
        ],
        principles: [
          'Creative Platform Excellence',
          'Algorithm and Recommendation',
          'Global Scale Operations',
          'Content Safety and Ethics',
          'Real-Time Engagement',
          'Rapid Innovation',
          'Community Building'
        ]
      },
      {
        name: 'Reddit',
        slug: 'reddit',
        description: 'Reddit is a network of communities where people can dive into their interests, hobbies and passions.',
        logoUrl: 'https://logo.clearbit.com/reddit.com',
        values: [
          'Community First',
          'Transparency',
          'Innovation',
          'Ownership & Empowerment',
          'Collaboration',
          'Remember the Human'
        ],
        principles: [
          'Community-Driven Platform',
          'User Trust and Safety',
          'Open and Transparent',
          'Empowerment and Initiative',
          'Collaborative Excellence',
          'Human-Centered Design',
          'Content Moderation Excellence'
        ]
      },
      {
        name: 'Startups',
        slug: 'startups',
        description: 'Early to growth stage startups (Series A-C) focused on rapid growth and innovation.',
        logoUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400',
        values: [
          'Impact and Ownership',
          'Adaptability',
          'Resourcefulness',
          'Bias for Action',
          'Growth Mindset',
          'Collaboration'
        ],
        principles: [
          'Move Fast and Break Things',
          'Customer First',
          'Data-Driven Decisions',
          'Lean and Agile',
          'Continuous Innovation'
        ]
      }
    ];

    const createdCompanies = await Promise.all(
      companies.map(company =>
        prisma.company.create({
          data: company
        })
      )
    );

    // Create categories for each company
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

    // Create categories for all companies
    const allCategories = [];
    for (const company of createdCompanies) {
      for (const template of categoryTemplates) {
        const category = await prisma.category.create({
          data: {
            ...template,
            companyId: company.id
          }
        });
        allCategories.push({ ...category, companySlug: company.slug });
      }
    }

    // Define base questions that can be shared across companies
    const baseQuestions = [
      {
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
      },
      {
        title: 'Design a system to handle real-time notifications for billions of users.',
        content: 'This system design question tests your ability to architect scalable, real-time systems. Consider push notifications, in-app notifications, and email notifications across multiple platforms.',
        difficulty: 'HARD',
        type: 'SYSTEM_DESIGN',
        tips: [
          'Start by clarifying requirements and scale',
          'Consider different types of notifications and delivery methods',
          'Design for high availability and fault tolerance',
          'Think about rate limiting and spam prevention'
        ],
        followUps: [
          'How would you handle notification preferences and privacy?',
          'What metrics would you track for this system?',
          'How would you ensure notifications are delivered in order?'
        ]
      },
      {
        title: 'Describe a time you led a team through a challenging project with ambiguous requirements.',
        content: 'This question assesses your comfort with ambiguity and emergent leadership. Show how you navigated uncertainty while driving results.',
        difficulty: 'MEDIUM',
        type: 'BEHAVIORAL',
        tips: [
          'Demonstrate comfort with ambiguity',
          'Show how you broke down the problem',
          'Highlight your bias for action',
          'Explain how you empowered your team'
        ],
        followUps: [
          'How do you typically handle unclear requirements?',
          'What frameworks do you use for decision-making under uncertainty?',
          'How do you keep your team motivated during ambiguous projects?'
        ]
      },
      {
        title: 'Design a URL shortening service like bit.ly that can handle billions of requests.',
        content: 'Classic system design question focusing on scalability, reliability, and performance at massive scale.',
        difficulty: 'HARD',
        type: 'SYSTEM_DESIGN',
        tips: [
          'Start with requirements and scale estimation',
          'Design the URL encoding/decoding algorithm',
          'Consider caching strategies and database sharding',
          'Think about analytics and rate limiting'
        ],
        followUps: [
          'How would you handle custom URLs?',
          'What analytics would you provide?',
          'How would you prevent abuse of the service?'
        ]
      },
      {
        title: 'Tell me about a time you challenged the status quo and drove innovation.',
        content: 'This question assesses your innovation mindset and courage to challenge existing approaches.',
        difficulty: 'MEDIUM',
        type: 'CULTURAL_FIT',
        tips: [
          'Show creative thinking and innovation',
          'Demonstrate courage to challenge existing processes',
          'Highlight the positive impact of your innovation',
          'Show how you gained buy-in from stakeholders'
        ],
        followUps: [
          'How do you foster innovation within your team?',
          'What\'s your approach to evaluating new ideas?',
          'How do you balance innovation with execution?'
        ]
      },
      {
        title: 'Tell me about your experience managing cross-functional teams during a complex data project.',
        content: 'This question assesses technical leadership in data systems and cross-functional collaboration.',
        difficulty: 'MEDIUM',
        type: 'BEHAVIORAL',
        tips: [
          'Highlight your data domain expertise',
          'Show how you coordinated across technical and business teams',
          'Demonstrate customer focus in your approach',
          'Explain how you managed technical complexity'
        ],
        followUps: [
          'How do you translate technical concepts to business stakeholders?',
          'What\'s your approach to data governance?',
          'How do you ensure data quality in your projects?'
        ]
      },
      {
        title: 'How do you prioritize features and technical initiatives in a fast-paced environment?',
        content: 'This question assesses your prioritization skills and ability to balance competing demands.',
        difficulty: 'MEDIUM',
        type: 'LEADERSHIP',
        tips: [
          'Show customer-centric prioritization',
          'Demonstrate data-driven decision making',
          'Balance innovation with operational excellence',
          'Explain how you gather and use stakeholder feedback'
        ],
        followUps: [
          'How do you measure the success of new features?',
          'What\'s your approach to technical debt?',
          'How do you stay ahead of market trends?'
        ]
      },
      {
        title: 'Tell me about a time you had to deliver significant results with very limited resources.',
        content: 'This question assesses resourcefulness and the ability to achieve more with less.',
        difficulty: 'MEDIUM',
        type: 'BEHAVIORAL',
        tips: [
          'Show creativity and resourcefulness',
          'Demonstrate impact despite constraints',
          'Explain your prioritization framework',
          'Highlight the innovative solutions you found'
        ],
        followUps: [
          'How do you prioritize when everything seems important?',
          'What\'s your approach to building with limited resources?',
          'How do you maintain team morale during resource constraints?'
        ]
      }
    ];

    // Create base questions first
    const createdQuestions = await Promise.all(
      baseQuestions.map(question =>
        prisma.question.create({
          data: {
            ...question,
            difficulty: question.difficulty as any,
            type: question.type as any
          }
        })
      )
    );

    // Define company-specific questions (unique to each company)
    const companySpecificQuestions = {
      meta: [
        {
          title: 'Give me an example of how you\'ve embodied "Move Fast" while maintaining quality.',
          content: 'This question directly relates to Meta\'s core value of moving fast. Show how you balance speed with quality and risk management.',
          difficulty: 'MEDIUM',
          type: 'CULTURAL_FIT',
          tips: [
            'Provide a specific example that shows both speed and quality',
            'Explain your decision-making process under time pressure',
            'Show how you managed risks while moving quickly',
            'Demonstrate learning from the experience'
          ],
          followUps: [
            'How do you help your team move fast without burning out?',
            'What processes do you put in place to maintain quality at speed?',
            'How do you decide when to slow down for quality?'
          ]
        }
      ],
      amazon: [
        {
          title: 'Describe a time you had to make a decision that prioritized long-term value over short-term gains.',
          content: 'This question directly relates to Amazon\'s Ownership principle. Show how you think long-term and act on behalf of the entire company.',
          difficulty: 'MEDIUM',
          type: 'BEHAVIORAL',
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
        },
        {
          title: 'Give me an example of when you disagreed with a decision but committed to it fully.',
          content: 'This question directly relates to Amazon\'s "Have Backbone; Disagree and Commit" principle.',
          difficulty: 'MEDIUM',
          type: 'BEHAVIORAL',
          tips: [
            'Show courage in respectfully disagreeing',
            'Demonstrate full commitment after decision was made',
            'Explain your reasoning and how you presented it',
            'Show the positive outcome of your commitment'
          ],
          followUps: [
            'How do you decide when to disagree with a decision?',
            'What\'s your approach to building consensus?',
            'How do you help your team commit to decisions they disagree with?'
          ]
        },
        {
          title: 'Describe a time you had to hire someone who would raise the bar for your team.',
          content: 'This question relates to Amazon\'s "Hire and Develop the Best" principle and the Bar Raiser concept.',
          difficulty: 'MEDIUM',
          type: 'LEADERSHIP',
          tips: [
            'Show understanding of what "raising the bar" means',
            'Demonstrate rigorous hiring standards',
            'Explain your evaluation criteria and process',
            'Show the positive impact of the hire'
          ],
          followUps: [
            'How do you define "raising the bar" in hiring?',
            'What\'s your approach to identifying top talent?',
            'How do you ensure diverse and inclusive hiring?'
          ]
        }
      ],
      google: [],
      openai: [
        {
          title: 'Describe a time you had to make a tradeoff between safety/ethics and performance/speed.',
          content: 'OpenAI prioritizes AI safety and ethical development. Show how you\'ve navigated complex ethical decisions in technology.',
          difficulty: 'HARD',
          type: 'BEHAVIORAL',
          tips: [
            'Demonstrate strong ethical judgment',
            'Show how you considered multiple stakeholders',
            'Explain your decision-making framework',
            'Highlight the long-term thinking behind your choice'
          ],
          followUps: [
            'How do you ensure ethical considerations are built into your team\'s processes?',
            'What role should safety play in AI development?',
            'How do you handle pressure to compromise on safety?'
          ]
        }
      ],
      snowflake: [],
      anthropic: [
        {
          title: 'How would you foster a culture of safety and ethical consideration within your engineering team?',
          content: 'Anthropic expects EMs to champion AI safety and ethical development practices.',
          difficulty: 'MEDIUM',
          type: 'CULTURAL_FIT',
          tips: [
            'Show understanding of AI safety principles',
            'Demonstrate how you\'d integrate ethics into daily work',
            'Explain your approach to safety training and awareness',
            'Show how you\'d measure and reinforce safety culture'
          ],
          followUps: [
            'What are the key AI safety principles you\'d emphasize?',
            'How would you handle disagreements about safety vs. performance?',
            'What role should external oversight play in AI development?'
          ]
        }
      ],
      'scale-ai': [],
      netflix: [
        {
          title: 'Describe a time you had to make a significant decision with limited information and high autonomy.',
          content: 'Netflix\'s culture emphasizes freedom and responsibility, expecting employees to make independent decisions.',
          difficulty: 'MEDIUM',
          type: 'BEHAVIORAL',
          tips: [
            'Show comfort with autonomy and responsibility',
            'Demonstrate sound judgment under uncertainty',
            'Explain your decision-making framework',
            'Highlight the ownership you took of outcomes'
          ],
          followUps: [
            'How do you operate effectively with high autonomy?',
            'What information do you need to make good decisions?',
            'How do you balance speed with thoroughness?'
          ]
        },
        {
          title: 'How do you foster a culture of candor and direct feedback within your team?',
          content: 'Netflix values radical candor and direct communication as core cultural principles.',
          difficulty: 'MEDIUM',
          type: 'LEADERSHIP',
          tips: [
            'Show experience with direct, honest feedback',
            'Demonstrate how you create psychological safety',
            'Explain your approach to difficult conversations',
            'Show how candor improves team performance'
          ],
          followUps: [
            'How do you handle feedback that\'s hard to hear?',
            'What\'s your approach to giving difficult feedback?',
            'How do you ensure candor doesn\'t become harmful?'
          ]
        }
      ],
      startups: [
        {
          title: 'How would you handle a major pivot in product strategy while keeping your engineering team motivated?',
          content: 'Startups often need to pivot quickly based on market feedback and changing conditions.',
          difficulty: 'MEDIUM',
          type: 'BEHAVIORAL',
          tips: [
            'Show adaptability and change management skills',
            'Demonstrate transparent communication',
            'Explain how you maintain team morale',
            'Show how you help the team see opportunity in change'
          ],
          followUps: [
            'How do you help your team embrace uncertainty?',
            'What\'s your approach to communicating major changes?',
            'How do you maintain momentum during transitions?'
          ]
        }
      ],
      linkedin: [
        {
          title: 'Describe a time you demonstrated a "Growth Mindset" by learning from failure and adapting your approach.',
          content: 'LinkedIn heavily emphasizes Growth Mindset as a core cultural pillar. Show how you embrace learning and feedback.',
          difficulty: 'MEDIUM',
          type: 'CULTURAL_FIT',
          tips: [
            'Show genuine learning from failure',
            'Demonstrate adaptability and resilience',
            'Explain how you applied lessons learned',
            'Show openness to feedback and continuous improvement'
          ],
          followUps: [
            'How do you foster a growth mindset in your team?',
            'What\'s your approach to giving and receiving feedback?',
            'How do you help team members learn from setbacks?'
          ]
        },
        {
          title: 'Tell me about a time you built or strengthened professional relationships to achieve a business goal.',
          content: 'LinkedIn values "Relationships Matter" - show how you leverage professional networks and build meaningful connections.',
          difficulty: 'MEDIUM',
          type: 'BEHAVIORAL',
          tips: [
            'Show authentic relationship building',
            'Demonstrate member-first thinking',
            'Explain how relationships drove business value',
            'Show long-term relationship maintenance'
          ],
          followUps: [
            'How do you maintain professional relationships over time?',
            'What\'s your approach to networking authentically?',
            'How do you help your team build strong professional networks?'
          ]
        }
      ],
      uber: [
        {
          title: 'Describe a time you had to design and implement a system that operates in real-time at massive scale.',
          content: 'Uber\'s business requires real-time, high-stakes systems. Show your experience with scalable, reliable systems.',
          difficulty: 'HARD',
          type: 'TECHNICAL',
          tips: [
            'Demonstrate understanding of real-time systems',
            'Show experience with massive scale challenges',
            'Explain your approach to reliability and fault tolerance',
            'Highlight the business impact of your solution'
          ],
          followUps: [
            'How do you ensure system reliability during peak traffic?',
            'What\'s your approach to monitoring real-time systems?',
            'How do you balance performance with cost at scale?'
          ]
        },
        {
          title: 'Tell me about a time you had to execute quickly in a high-pressure, ambiguous situation.',
          content: 'Uber operates in a fast-paced, high-stakes environment. Show your ability to execute under pressure.',
          difficulty: 'MEDIUM',
          type: 'BEHAVIORAL',
          tips: [
            'Show comfort with ambiguity and pressure',
            'Demonstrate bias for action',
            'Explain your decision-making process under time constraints',
            'Highlight successful execution and outcomes'
          ],
          followUps: [
            'How do you maintain quality while moving fast?',
            'What\'s your approach to risk management in fast-paced environments?',
            'How do you keep your team focused during high-pressure situations?'
          ]
        }
      ],
      airbnb: [
        {
          title: 'Give me an example of how you\'ve "Been a Host" by creating an inclusive and welcoming environment for your team.',
          content: 'Airbnb\'s "Be a Host" value emphasizes empathy, inclusivity, and care. Show how you embody hospitality in leadership.',
          difficulty: 'MEDIUM',
          type: 'CULTURAL_FIT',
          tips: [
            'Show genuine empathy and care for team members',
            'Demonstrate inclusive leadership practices',
            'Explain how you create psychological safety',
            'Show the positive impact on team culture'
          ],
          followUps: [
            'How do you ensure all team members feel they belong?',
            'What\'s your approach to supporting team members during difficult times?',
            'How do you celebrate diversity within your team?'
          ]
        },
        {
          title: 'Describe a time you took initiative like a "Cereal Entrepreneur" to solve a problem or create value.',
          content: 'Airbnb values proactive, resourceful problem-solving. Show your entrepreneurial mindset and ownership.',
          difficulty: 'MEDIUM',
          type: 'BEHAVIORAL',
          tips: [
            'Show proactive problem identification',
            'Demonstrate resourcefulness and creativity',
            'Explain your ownership mindset',
            'Highlight the value created through your initiative'
          ],
          followUps: [
            'How do you encourage entrepreneurial thinking in your team?',
            'What\'s your approach to identifying new opportunities?',
            'How do you balance innovation with execution?'
          ]
        }
      ],
      tiktok: [
        {
          title: 'Describe a time you had to balance rapid innovation with platform safety and ethical considerations.',
          content: 'TikTok operates at massive scale with content safety challenges. Show how you balance speed with responsibility.',
          difficulty: 'HARD',
          type: 'BEHAVIORAL',
          tips: [
            'Show understanding of platform safety challenges',
            'Demonstrate ethical decision-making',
            'Explain how you balance competing priorities',
            'Show the long-term thinking behind your approach'
          ],
          followUps: [
            'How do you ensure ethical considerations are built into fast-moving projects?',
            'What\'s your approach to content safety at scale?',
            'How do you handle pressure to compromise on safety for speed?'
          ]
        },
        {
          title: 'Tell me about a time you designed systems to handle creative content and user engagement at global scale.',
          content: 'TikTok\'s platform focuses on creativity and engagement. Show your experience with content platforms and recommendation systems.',
          difficulty: 'HARD',
          type: 'TECHNICAL',
          tips: [
            'Show understanding of content recommendation systems',
            'Demonstrate experience with global scale challenges',
            'Explain your approach to user engagement optimization',
            'Show consideration for diverse global audiences'
          ],
          followUps: [
            'How do you ensure content recommendations are fair and diverse?',
            'What\'s your approach to handling different cultural contexts globally?',
            'How do you measure and optimize user engagement responsibly?'
          ]
        }
      ],
      reddit: [
        {
          title: 'Describe a time you had to balance community needs with business objectives.',
          content: 'Reddit is community-driven. Show how you prioritize community while achieving business goals.',
          difficulty: 'MEDIUM',
          type: 'BEHAVIORAL',
          tips: [
            'Show understanding of community dynamics',
            'Demonstrate user-centric decision making',
            'Explain how you balanced competing interests',
            'Show the positive impact on both community and business'
          ],
          followUps: [
            'How do you gather and incorporate community feedback?',
            'What\'s your approach to transparent communication with users?',
            'How do you handle situations where business and community interests conflict?'
          ]
        },
        {
          title: 'Tell me about a time you had to design systems for content moderation and community safety at scale.',
          content: 'Reddit faces unique challenges with user-generated content and community moderation. Show your approach to building safe platforms.',
          difficulty: 'HARD',
          type: 'TECHNICAL',
          tips: [
            'Show understanding of content moderation challenges',
            'Demonstrate experience with community-driven platforms',
            'Explain your approach to scalable safety systems',
            'Show consideration for diverse community needs'
          ],
          followUps: [
            'How do you balance automated and human moderation?',
            'What\'s your approach to handling controversial content?',
            'How do you ensure moderation systems are fair and transparent?'
          ]
        }
      ]
    };

    // Create company-specific questions
    const allCompanySpecificQuestions = [];
    for (const [companySlug, questions] of Object.entries(companySpecificQuestions)) {
      for (const questionData of questions) {
        const question = await prisma.question.create({
          data: {
            ...questionData,
            difficulty: questionData.difficulty as any,
            type: questionData.type as any
          }
        });
        allCompanySpecificQuestions.push({ question, companySlug });
      }
    }

    // Define which companies use which shared questions and their company-specific metadata
    const companyQuestionMappings = {
      meta: [
        { questionTitle: 'Tell me about a time you had to manage a team through a significant change or reorganization.', categorySlug: 'leadership', isCritical: true, order: 1 },
        { questionTitle: 'Design a system to handle real-time notifications for billions of users.', categorySlug: 'technical', isCritical: true, order: 2 },
        { questionTitle: 'Describe a time you led a team through a challenging project with ambiguous requirements.', categorySlug: 'leadership', isCritical: false, order: 3 },
        { questionTitle: 'Tell me about a time you challenged the status quo and drove innovation.', categorySlug: 'culture', isCritical: false, order: 4 },
        { questionTitle: 'How do you prioritize features and technical initiatives in a fast-paced environment?', categorySlug: 'product', isCritical: false, order: 5 }
      ],
      amazon: [
        { questionTitle: 'Tell me about a time you had to manage a team through a significant change or reorganization.', categorySlug: 'leadership', isCritical: true, order: 1 },
        { questionTitle: 'Describe a time you led a team through a challenging project with ambiguous requirements.', categorySlug: 'leadership', isCritical: true, order: 2 },
        { questionTitle: 'Tell me about a time you challenged the status quo and drove innovation.', categorySlug: 'culture', isCritical: false, order: 3 },
        { questionTitle: 'How do you prioritize features and technical initiatives in a fast-paced environment?', categorySlug: 'execution', isCritical: true, order: 4 },
        { questionTitle: 'Tell me about a time you had to deliver significant results with very limited resources.', categorySlug: 'execution', isCritical: true, order: 5 },
        { questionTitle: 'Design a URL shortening service like bit.ly that can handle billions of requests.', categorySlug: 'technical', isCritical: false, order: 6 }
      ],
      google: [
        { questionTitle: 'Describe a time you led a team through a challenging project with ambiguous requirements.', categorySlug: 'leadership', isCritical: true, order: 1 },
        { questionTitle: 'Design a URL shortening service like bit.ly that can handle billions of requests.', categorySlug: 'technical', isCritical: true, order: 2 },
        { questionTitle: 'Tell me about a time you challenged the status quo and drove innovation.', categorySlug: 'culture', isCritical: true, order: 3 },
        { questionTitle: 'Tell me about a time you had to manage a team through a significant change or reorganization.', categorySlug: 'leadership', isCritical: false, order: 4 }
      ],
      openai: [
        { questionTitle: 'Tell me about a time you had to manage a team through a significant change or reorganization.', categorySlug: 'leadership', isCritical: false, order: 1 },
        { questionTitle: 'Tell me about a time you challenged the status quo and drove innovation.', categorySlug: 'culture', isCritical: true, order: 2 },
        { questionTitle: 'How do you prioritize features and technical initiatives in a fast-paced environment?', categorySlug: 'product', isCritical: false, order: 3 }
      ],
      snowflake: [
        { questionTitle: 'Tell me about your experience managing cross-functional teams during a complex data project.', categorySlug: 'leadership', isCritical: true, order: 1 },
        { questionTitle: 'How do you prioritize features and technical initiatives in a fast-paced environment?', categorySlug: 'product', isCritical: true, order: 2 },
        { questionTitle: 'Tell me about a time you had to manage a team through a significant change or reorganization.', categorySlug: 'leadership', isCritical: false, order: 3 }
      ],
      anthropic: [
        { questionTitle: 'Tell me about a time you had to manage a team through a significant change or reorganization.', categorySlug: 'leadership', isCritical: false, order: 1 },
        { questionTitle: 'Tell me about a time you challenged the status quo and drove innovation.', categorySlug: 'culture', isCritical: true, order: 2 }
      ],
      'scale-ai': [
        { questionTitle: 'Tell me about a time you had to deliver significant results with very limited resources.', categorySlug: 'execution', isCritical: true, order: 1 },
        { questionTitle: 'How do you prioritize features and technical initiatives in a fast-paced environment?', categorySlug: 'product', isCritical: true, order: 2 },
        { questionTitle: 'Tell me about a time you had to manage a team through a significant change or reorganization.', categorySlug: 'leadership', isCritical: false, order: 3 }
      ],
      netflix: [
        { questionTitle: 'Tell me about a time you had to manage a team through a significant change or reorganization.', categorySlug: 'leadership', isCritical: false, order: 1 },
        { questionTitle: 'Design a system to handle real-time notifications for billions of users.', categorySlug: 'technical', isCritical: false, order: 2 },
        { questionTitle: 'Tell me about a time you challenged the status quo and drove innovation.', categorySlug: 'culture', isCritical: false, order: 3 }
      ],
      startups: [
        { questionTitle: 'Tell me about a time you had to deliver significant results with very limited resources.', categorySlug: 'execution', isCritical: true, order: 1 },
        { questionTitle: 'Describe a time you led a team through a challenging project with ambiguous requirements.', categorySlug: 'leadership', isCritical: true, order: 2 },
        { questionTitle: 'Tell me about a time you had to manage a team through a significant change or reorganization.', categorySlug: 'leadership', isCritical: false, order: 3 }
      ],
      linkedin: [
        { questionTitle: 'Tell me about a time you had to manage a team through a significant change or reorganization.', categorySlug: 'leadership', isCritical: true, order: 1 },
        { questionTitle: 'Describe a time you led a team through a challenging project with ambiguous requirements.', categorySlug: 'leadership', isCritical: false, order: 2 },
        { questionTitle: 'Tell me about a time you challenged the status quo and drove innovation.', categorySlug: 'culture', isCritical: false, order: 3 },
        { questionTitle: 'Design a system to handle real-time notifications for billions of users.', categorySlug: 'technical', isCritical: false, order: 4 }
      ],
      uber: [
        { questionTitle: 'Design a system to handle real-time notifications for billions of users.', categorySlug: 'technical', isCritical: true, order: 1 },
        { questionTitle: 'Tell me about a time you had to manage a team through a significant change or reorganization.', categorySlug: 'leadership', isCritical: true, order: 2 },
        { questionTitle: 'Describe a time you led a team through a challenging project with ambiguous requirements.', categorySlug: 'leadership', isCritical: false, order: 3 },
        { questionTitle: 'How do you prioritize features and technical initiatives in a fast-paced environment?', categorySlug: 'execution', isCritical: true, order: 4 }
      ],
      airbnb: [
        { questionTitle: 'Tell me about a time you had to manage a team through a significant change or reorganization.', categorySlug: 'leadership', isCritical: true, order: 1 },
        { questionTitle: 'Describe a time you led a team through a challenging project with ambiguous requirements.', categorySlug: 'leadership', isCritical: false, order: 2 },
        { questionTitle: 'Tell me about a time you challenged the status quo and drove innovation.', categorySlug: 'culture', isCritical: false, order: 3 },
        { questionTitle: 'Design a URL shortening service like bit.ly that can handle billions of requests.', categorySlug: 'technical', isCritical: false, order: 4 }
      ],
      tiktok: [
        { questionTitle: 'Design a system to handle real-time notifications for billions of users.', categorySlug: 'technical', isCritical: true, order: 1 },
        { questionTitle: 'Tell me about a time you challenged the status quo and drove innovation.', categorySlug: 'culture', isCritical: true, order: 2 },
        { questionTitle: 'Tell me about a time you had to manage a team through a significant change or reorganization.', categorySlug: 'leadership', isCritical: false, order: 3 },
        { questionTitle: 'How do you prioritize features and technical initiatives in a fast-paced environment?', categorySlug: 'product', isCritical: false, order: 4 }
      ],
      reddit: [
        { questionTitle: 'Tell me about a time you had to manage a team through a significant change or reorganization.', categorySlug: 'leadership', isCritical: true, order: 1 },
        { questionTitle: 'Describe a time you led a team through a challenging project with ambiguous requirements.', categorySlug: 'leadership', isCritical: false, order: 2 },
        { questionTitle: 'Design a URL shortening service like bit.ly that can handle billions of requests.', categorySlug: 'technical', isCritical: false, order: 3 },
        { questionTitle: 'Tell me about a time you challenged the status quo and drove innovation.', categorySlug: 'culture', isCritical: false, order: 4 }
      ]
    };

    // Create CompanyQuestion junction records
    let totalCompanyQuestions = 0;
    for (const [companySlug, mappings] of Object.entries(companyQuestionMappings)) {
      const company = createdCompanies.find(c => c.slug === companySlug);
      if (!company) continue;

      for (const mapping of mappings) {
        // Find the base question
        const baseQuestion = createdQuestions.find(q => q.title === mapping.questionTitle);
        if (!baseQuestion) continue;

        // Find the category
        const category = allCategories.find(c => 
          c.companySlug === companySlug && c.slug === mapping.categorySlug
        );
        if (!category) continue;

        await prisma.companyQuestion.create({
          data: {
            questionId: baseQuestion.id,
            companyId: company.id,
            categoryId: category.id,
            isCritical: mapping.isCritical,
            order: mapping.order
          }
        });
        totalCompanyQuestions++;
      }
    }

    // Handle company-specific questions
    for (const { question, companySlug } of allCompanySpecificQuestions) {
      const company = createdCompanies.find(c => c.slug === companySlug);
      if (!company) continue;

      // Determine category based on company and question type
      let categorySlug = 'culture'; // default
      if (question.type === 'TECHNICAL' || question.type === 'SYSTEM_DESIGN') {
        categorySlug = 'technical';
      } else if (question.type === 'LEADERSHIP') {
        categorySlug = 'leadership';
      } else if (question.type === 'BEHAVIORAL') {
        categorySlug = 'leadership';
      }

      const category = allCategories.find(c => 
        c.companySlug === companySlug && c.slug === categorySlug
      );
      if (!category) continue;

      await prisma.companyQuestion.create({
        data: {
          questionId: question.id,
          companyId: company.id,
          categoryId: category.id,
          isCritical: true, // Company-specific questions are typically critical
          order: 100 // Put them at the end
        }
      });
      totalCompanyQuestions++;
    }

    // Create sample tags
    const tags = [
      { name: 'Leadership', color: '#3B82F6' },
      { name: 'Technical', color: '#10B981' },
      { name: 'Conflict Resolution', color: '#F59E0B' },
      { name: 'Team Building', color: '#EF4444' },
      { name: 'Innovation', color: '#8B5CF6' },
      { name: 'Crisis Management', color: '#6B7280' },
      { name: 'AI Safety', color: '#EC4899' },
      { name: 'Data Quality', color: '#14B8A6' },
      { name: 'Scaling', color: '#F97316' },
      { name: 'Culture', color: '#84CC16' },
      { name: 'Amazon LP', color: '#FF9500' }
    ];

    await Promise.all(
      tags.map(tag =>
        prisma.tag.create({
          data: tag
        })
      )
    );

    // Create comprehensive FAQs
    const faqs = [
      {
        question: 'How do I choose which company track to focus on?',
        answer: 'Consider your target companies and career goals. Each track is tailored to specific company cultures and interview styles. You can prepare for multiple tracks, but focus deeply on 2-3 companies that align with your interests and experience.',
        category: 'General',
        order: 1
      },
      {
        question: 'What\'s the difference between Big Tech and Startup interview approaches?',
        answer: 'Big Tech companies (Google, Meta, Netflix, Amazon) have more structured processes with standardized evaluation criteria. Startups focus more on adaptability, resourcefulness, and cultural fit, with more variable interview processes.',
        category: 'Interview Strategy',
        order: 2
      },
      {
        question: 'How technical should I be as an Engineering Manager?',
        answer: 'The level varies by company. Google and Meta expect strong system design skills. Amazon emphasizes technical depth with their "Dive Deep" principle. OpenAI and Anthropic require deep AI/ML understanding. Startups often need more hands-on technical involvement. Focus on architectural thinking and technical leadership over coding.',
        category: 'Technical Preparation',
        order: 3
      },
      {
        question: 'How do I prepare for company-specific cultural questions?',
        answer: 'Study each company\'s values and principles deeply. Prepare STAR stories that demonstrate these values. For example, Meta\'s "Move Fast," Google\'s "Googleyness," Amazon\'s Leadership Principles, or Netflix\'s "Freedom and Responsibility." Practice connecting your experiences to their specific cultural expectations.',
        category: 'Cultural Fit',
        order: 4
      },
      {
        question: 'What\'s the typical timeline for EM interviews at these companies?',
        answer: 'Big Tech: 1-3 months with multiple rounds. Amazon: 6-8 weeks with Bar Raiser process. Startups: 2-8 weeks, more flexible. AI companies (OpenAI, Anthropic): 3-4 weeks with thorough cultural assessment. Plan for 4-6 interview rounds on average.',
        category: 'Timeline',
        order: 5
      },
      {
        question: 'How does Amazon\'s Bar Raiser process work?',
        answer: 'Amazon\'s Bar Raiser is an objective interviewer trained in Amazon\'s Leadership Principles who ensures every hire "raises the bar." They\'re not part of the hiring team and focus on long-term potential, cultural fit, and deep alignment with LPs. They have significant influence in the hiring decision.',
        category: 'Amazon Specific',
        order: 6
      }
    ];

    await Promise.all(
      faqs.map(faq =>
        prisma.fAQ.create({
          data: faq
        })
      )
    );

    return NextResponse.json({ 
      message: 'Database seeded successfully with all companies including Amazon',
      data: {
        companies: createdCompanies.length,
        categories: allCategories.length,
        baseQuestions: createdQuestions.length,
        companySpecificQuestions: allCompanySpecificQuestions.length,
        totalCompanyQuestions: totalCompanyQuestions,
        tags: tags.length,
        faqs: faqs.length
      }
    });

  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json(
      { error: 'Failed to seed database', details: error },
      { status: 500 }
    );
  }
}
