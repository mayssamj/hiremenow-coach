
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// AI-crafted critical questions based on company values and EM leadership scenarios
const aiGeneratedQuestions = {
  amazon: [
    {
      title: "Tell me about a time you had to invent and simplify a complex technical solution for your team.",
      content: "Amazon values 'Invent and Simplify'. Describe a situation where you identified an overly complex process or system and created a simpler, more effective solution. Focus on the invention aspect, the simplification process, and the impact on your team's productivity.",
      difficulty: "MEDIUM",
      type: "BEHAVIORAL",
      tips: [
        "Focus on a specific technical or process complexity you identified",
        "Explain your creative approach to simplification",
        "Quantify the impact on team efficiency and productivity",
        "Show how you balanced innovation with practical implementation"
      ],
      followUps: [
        "How did you ensure the simplified solution didn't compromise quality?",
        "What resistance did you face and how did you overcome it?",
        "How do you continue to identify areas for simplification in your current role?"
      ]
    },
    {
      title: "Describe a situation where you had to earn trust from a skeptical stakeholder or team member.",
      content: "Trust is fundamental to Amazon's leadership principles. Share an example where someone was initially skeptical of your approach, decisions, or capabilities. How did you systematically build trust and what was the outcome?",
      difficulty: "MEDIUM",
      type: "BEHAVIORAL",
      tips: [
        "Choose an example where trust was genuinely at stake",
        "Show specific actions you took to demonstrate reliability",
        "Explain how you maintained transparency throughout the process",
        "Highlight the long-term relationship impact"
      ],
      followUps: [
        "How do you maintain trust once it's established?",
        "What would you do differently in a similar situation?",
        "How do you handle situations where trust is broken?"
      ]
    }
  ],
  
  uber: [
    {
      title: "Tell me about a time you had to scale a system or process to handle 10x growth in a short timeframe.",
      content: "Uber operates at massive scale with rapid growth. Describe a situation where you had to quickly scale a system, process, or team to handle dramatically increased demand. Focus on your approach to scaling, the challenges you faced, and how you ensured reliability during the transition.",
      difficulty: "HARD",
      type: "TECHNICAL",
      tips: [
        "Focus on a specific scaling challenge with clear metrics",
        "Explain your systematic approach to identifying bottlenecks",
        "Show how you balanced speed with reliability",
        "Quantify the scale increase and timeline constraints"
      ],
      followUps: [
        "How did you monitor system performance during the scaling process?",
        "What would you do differently if you had to scale even further?",
        "How do you prepare systems for future scaling needs?"
      ]
    },
    {
      title: "Describe a time you had to make a critical operational decision during a live incident affecting millions of users.",
      content: "Uber's real-time operations require quick decision-making under pressure. Share an example where you had to make a critical decision during a live incident that was impacting users at scale. Focus on your decision-making process, stakeholder communication, and incident resolution.",
      difficulty: "HARD",
      type: "BEHAVIORAL",
      tips: [
        "Choose a high-stakes incident with clear user impact",
        "Walk through your decision-making framework under pressure",
        "Show how you balanced multiple competing priorities",
        "Explain your communication strategy during the crisis"
      ],
      followUps: [
        "How do you prepare your team for handling similar incidents?",
        "What processes did you put in place to prevent similar issues?",
        "How do you balance speed vs. thoroughness in incident response?"
      ]
    },
    {
      title: "Tell me about a time you had to coordinate across multiple engineering teams to deliver a complex marketplace feature.",
      content: "Uber's marketplace requires coordination across many teams. Describe a situation where you had to lead a cross-functional initiative involving multiple engineering teams, product managers, and stakeholders to deliver a complex feature that impacted the marketplace dynamics.",
      difficulty: "HARD",
      type: "LEADERSHIP",
      tips: [
        "Focus on a complex feature with multiple team dependencies",
        "Show your approach to cross-team coordination and communication",
        "Explain how you managed conflicting priorities and timelines",
        "Highlight the marketplace impact and user benefits"
      ],
      followUps: [
        "How did you handle disagreements between teams?",
        "What tools or processes did you use for coordination?",
        "How do you ensure alignment when teams have different priorities?"
      ]
    },
    {
      title: "Describe a time you had to optimize for both driver and rider experience simultaneously in a feature decision.",
      content: "Uber's two-sided marketplace requires balancing competing needs. Share an example where you had to make engineering or product decisions that optimized for both drivers and riders, potentially with conflicting requirements. How did you approach this challenge?",
      difficulty: "MEDIUM",
      type: "BEHAVIORAL",
      tips: [
        "Choose an example with clear tension between driver and rider needs",
        "Show your analytical approach to understanding both perspectives",
        "Explain how you found creative solutions that benefited both sides",
        "Quantify the impact on both user groups"
      ],
      followUps: [
        "How do you typically approach two-sided marketplace decisions?",
        "What data do you use to understand driver vs. rider preferences?",
        "How do you handle situations where you can't optimize for both sides?"
      ]
    },
    {
      title: "Tell me about a time you had to build engineering culture and processes for a new market or product vertical.",
      content: "Uber expands into new markets and verticals regularly. Describe a situation where you had to establish engineering practices, team culture, and technical standards for a new market, product line, or business vertical. Focus on your approach to building from the ground up.",
      difficulty: "HARD",
      type: "LEADERSHIP",
      tips: [
        "Focus on a greenfield opportunity where you built from scratch",
        "Show your approach to establishing technical standards and culture",
        "Explain how you adapted existing practices vs. creating new ones",
        "Highlight the long-term impact on the organization"
      ],
      followUps: [
        "How did you ensure consistency with existing Uber engineering culture?",
        "What were the biggest challenges in establishing new processes?",
        "How do you scale culture as the team grows?"
      ]
    }
  ],

  tiktok: [
    {
      title: "Tell me about a time you had to balance viral content promotion with platform safety and user protection.",
      content: "TikTok's algorithm promotes engaging content while maintaining platform safety. Describe a situation where you had to make engineering decisions that balanced content virality with user safety, community guidelines, or regulatory requirements.",
      difficulty: "HARD",
      type: "BEHAVIORAL",
      tips: [
        "Focus on a specific content or algorithm challenge",
        "Show how you balanced competing priorities (engagement vs. safety)",
        "Explain your approach to measuring and monitoring both metrics",
        "Highlight the impact on user experience and platform health"
      ],
      followUps: [
        "How do you stay ahead of emerging safety challenges?",
        "What role does machine learning play in your safety approach?",
        "How do you handle false positives in content moderation?"
      ]
    },
    {
      title: "Describe a time you had to optimize recommendation algorithms for both user engagement and content creator success.",
      content: "TikTok's success depends on both user engagement and creator satisfaction. Share an example where you had to improve recommendation systems to benefit both users (better content discovery) and creators (fair content distribution and growth opportunities).",
      difficulty: "HARD",
      type: "TECHNICAL",
      tips: [
        "Focus on a specific algorithm or recommendation challenge",
        "Show how you measured success for both users and creators",
        "Explain your approach to A/B testing and gradual rollouts",
        "Quantify the impact on key metrics for both groups"
      ],
      followUps: [
        "How do you handle bias in recommendation algorithms?",
        "What's your approach to discovering and promoting new creators?",
        "How do you balance personalization with content diversity?"
      ]
    },
    {
      title: "Tell me about a time you had to design systems to handle massive spikes in user-generated content during viral trends.",
      content: "TikTok experiences massive content spikes during viral trends. Describe a situation where you had to ensure your systems could handle sudden increases in content uploads, processing, and distribution while maintaining quality and performance.",
      difficulty: "HARD",
      type: "TECHNICAL",
      tips: [
        "Focus on a specific viral trend or content spike you handled",
        "Show your approach to capacity planning and auto-scaling",
        "Explain how you maintained content quality during high volume",
        "Highlight your monitoring and alerting strategies"
      ],
      followUps: [
        "How do you predict and prepare for viral content spikes?",
        "What's your approach to content processing prioritization?",
        "How do you ensure content quality doesn't degrade under load?"
      ]
    },
    {
      title: "Describe a time you had to implement global content policies while respecting local cultural differences and regulations.",
      content: "TikTok operates globally with varying cultural norms and regulations. Share an example where you had to implement technical solutions that enforced global platform policies while adapting to local cultural sensitivities and regulatory requirements.",
      difficulty: "HARD",
      type: "BEHAVIORAL",
      tips: [
        "Choose an example involving multiple regions with different requirements",
        "Show your approach to balancing global consistency with local adaptation",
        "Explain how you worked with legal, policy, and cultural experts",
        "Highlight the technical architecture that enabled this flexibility"
      ],
      followUps: [
        "How do you stay updated on changing regulations across markets?",
        "What's your approach to testing policy changes across different cultures?",
        "How do you handle conflicts between global policies and local laws?"
      ]
    },
    {
      title: "Tell me about a time you had to build real-time features that enhanced live streaming and interactive content experiences.",
      content: "TikTok's live features require real-time engineering excellence. Describe a situation where you built or improved real-time features for live streaming, interactive content, or social features that required low latency and high reliability.",
      difficulty: "HARD",
      type: "TECHNICAL",
      tips: [
        "Focus on a specific real-time feature with clear technical challenges",
        "Show your approach to achieving low latency at scale",
        "Explain how you handled edge cases and failure scenarios",
        "Quantify the performance improvements and user impact"
      ],
      followUps: [
        "How do you test real-time features across different network conditions?",
        "What's your approach to handling network partitions in real-time systems?",
        "How do you balance feature richness with performance in real-time apps?"
      ]
    },
    {
      title: "Describe a time you had to lead your team through a major algorithm change that affected millions of creators and users.",
      content: "Algorithm changes at TikTok have massive impact. Share an example where you led your team through a significant algorithm update or change that affected content distribution, user experience, or creator success. Focus on change management and stakeholder communication.",
      difficulty: "MEDIUM",
      type: "LEADERSHIP",
      tips: [
        "Choose a significant algorithm change with broad impact",
        "Show your approach to managing team concerns and workload",
        "Explain how you communicated with affected stakeholders",
        "Highlight your strategy for measuring and monitoring the change impact"
      ],
      followUps: [
        "How do you prepare your team for high-impact changes?",
        "What's your approach to rolling back changes if needed?",
        "How do you balance innovation with platform stability?"
      ]
    }
  ],

  startups: [
    {
      title: "Tell me about a time you had to build a critical system with extremely limited resources and a tight deadline.",
      content: "Startups require doing more with less. Describe a situation where you had to build a business-critical system or feature with minimal budget, limited team size, and an aggressive timeline. Focus on your resourcefulness and prioritization decisions.",
      difficulty: "MEDIUM",
      type: "BEHAVIORAL",
      tips: [
        "Choose an example that shows creative problem-solving with constraints",
        "Show how you prioritized features and made trade-off decisions",
        "Explain your approach to leveraging existing tools and technologies",
        "Highlight the business impact despite resource limitations"
      ],
      followUps: [
        "How do you decide what to build vs. buy in resource-constrained environments?",
        "What's your approach to technical debt in fast-moving startups?",
        "How do you maintain quality when moving quickly with limited resources?"
      ]
    },
    {
      title: "Describe a time you had to pivot your technical architecture or approach based on rapid market feedback.",
      content: "Startups must adapt quickly to market signals. Share an example where customer feedback, market research, or business pivot required you to significantly change your technical approach, architecture, or product direction. How did you manage this transition?",
      difficulty: "HARD",
      type: "BEHAVIORAL",
      tips: [
        "Focus on a significant technical pivot with clear business drivers",
        "Show how you evaluated the cost and benefits of the change",
        "Explain your approach to managing team morale during uncertainty",
        "Highlight how you minimized disruption while maximizing agility"
      ],
      followUps: [
        "How do you build systems that can adapt to future pivots?",
        "What's your approach to communicating major changes to stakeholders?",
        "How do you balance stability with the need for rapid iteration?"
      ]
    },
    {
      title: "Tell me about a time you had to wear multiple hats and lead both technical and non-technical initiatives simultaneously.",
      content: "Startup engineering managers often handle diverse responsibilities. Describe a period where you had to simultaneously manage engineering work, contribute to product strategy, handle customer issues, or take on other non-technical responsibilities. How did you balance these competing demands?",
      difficulty: "MEDIUM",
      type: "LEADERSHIP",
      tips: [
        "Choose an example showing diverse responsibilities beyond pure engineering",
        "Show your approach to time management and prioritization",
        "Explain how you maintained quality across different types of work",
        "Highlight the skills you developed and the impact on the business"
      ],
      followUps: [
        "How do you decide when to delegate vs. handle tasks yourself?",
        "What systems do you use to stay organized across multiple responsibilities?",
        "How do you develop expertise in areas outside your core competency?"
      ]
    },
    {
      title: "Describe a time you had to build and scale a team from 2-3 engineers to 15+ while maintaining culture and velocity.",
      content: "Startup growth requires rapid team scaling. Share an example where you had to quickly grow your engineering team while maintaining code quality, team culture, and development velocity. Focus on your approach to hiring, onboarding, and culture preservation.",
      difficulty: "HARD",
      type: "LEADERSHIP",
      tips: [
        "Focus on a specific period of rapid team growth",
        "Show your approach to maintaining quality during rapid hiring",
        "Explain how you preserved culture while adding diverse perspectives",
        "Quantify the impact on team productivity and business outcomes"
      ],
      followUps: [
        "How do you identify the right candidates for a fast-growing startup?",
        "What's your approach to onboarding engineers in a rapidly changing environment?",
        "How do you maintain team cohesion as you scale?"
      ]
    },
    {
      title: "Tell me about a time you had to make a critical technical decision that would impact the company's ability to raise funding or achieve key milestones.",
      content: "In startups, technical decisions often have direct business implications. Describe a situation where you had to make a technical choice that would significantly impact fundraising, customer acquisition, or other critical business milestones.",
      difficulty: "HARD",
      type: "BEHAVIORAL",
      tips: [
        "Choose a decision with clear business stakes and timeline pressure",
        "Show how you evaluated technical options against business needs",
        "Explain your approach to communicating technical risks to non-technical stakeholders",
        "Highlight the outcome and lessons learned"
      ],
      followUps: [
        "How do you balance technical excellence with business urgency?",
        "What's your approach to technical due diligence for investors?",
        "How do you communicate technical roadmaps to business stakeholders?"
      ]
    },
    {
      title: "Describe a time you had to implement security and compliance measures while maintaining rapid development velocity.",
      content: "Startups must balance security with speed. Share an example where you had to implement security measures, compliance requirements, or data protection standards without significantly slowing down your development process or team velocity.",
      difficulty: "MEDIUM",
      type: "TECHNICAL",
      tips: [
        "Focus on a specific security or compliance challenge",
        "Show how you integrated security into existing development processes",
        "Explain your approach to educating the team on security practices",
        "Highlight how you maintained development speed while improving security"
      ],
      followUps: [
        "How do you stay current with security best practices in a fast-moving environment?",
        "What's your approach to security training for rapidly growing teams?",
        "How do you balance security investments with feature development?"
      ]
    },
    {
      title: "Tell me about a time you had to debug and resolve a critical production issue that threatened customer trust or business continuity.",
      content: "Startup incidents can be existential threats. Describe a critical production issue that threatened customer relationships, data integrity, or business operations. Focus on your incident response, root cause analysis, and measures to prevent recurrence.",
      difficulty: "HARD",
      type: "TECHNICAL",
      tips: [
        "Choose a high-stakes incident with clear business impact",
        "Walk through your systematic approach to incident response",
        "Show how you communicated with customers and stakeholders during the crisis",
        "Explain the long-term improvements you implemented"
      ],
      followUps: [
        "How do you prepare startup teams for handling critical incidents?",
        "What's your approach to post-incident communication with customers?",
        "How do you balance incident prevention with feature development resources?"
      ]
    }
  ],

  reddit: [
    {
      title: "Tell me about a time you had to design systems to handle both massive scale and diverse community needs simultaneously.",
      content: "Reddit serves millions of users across thousands of unique communities. Describe a situation where you had to build or improve systems that could scale to handle Reddit's traffic while also supporting the diverse needs of different communities and their unique requirements.",
      difficulty: "HARD",
      type: "TECHNICAL",
      tips: [
        "Focus on a system that needed to serve diverse community requirements",
        "Show your approach to balancing standardization with customization",
        "Explain how you handled the scale challenges",
        "Highlight the impact on different types of communities"
      ],
      followUps: [
        "How do you gather requirements from diverse community stakeholders?",
        "What's your approach to A/B testing across different community types?",
        "How do you ensure changes don't negatively impact smaller communities?"
      ]
    },
    {
      title: "Describe a time you had to implement content ranking or recommendation systems that balanced algorithmic efficiency with community values.",
      content: "Reddit's content ranking affects community dynamics. Share an example where you worked on content ranking, recommendation algorithms, or feed systems that needed to balance technical performance with Reddit's community-first values and democratic content curation.",
      difficulty: "HARD",
      type: "TECHNICAL",
      tips: [
        "Focus on a specific ranking or recommendation challenge",
        "Show how you incorporated community feedback and values",
        "Explain your approach to measuring success beyond engagement metrics",
        "Highlight how you balanced algorithmic and human curation"
      ],
      followUps: [
        "How do you measure the health of community-driven content systems?",
        "What's your approach to handling gaming or manipulation of ranking systems?",
        "How do you balance personalization with community discovery?"
      ]
    },
    {
      title: "Tell me about a time you had to build moderation tools that empowered community moderators while maintaining platform-wide standards.",
      content: "Reddit relies on volunteer moderators to maintain community standards. Describe a situation where you built or improved moderation tools, automated systems, or processes that helped community moderators while ensuring consistency with Reddit's overall platform policies.",
      difficulty: "MEDIUM",
      type: "BEHAVIORAL",
      tips: [
        "Focus on a specific moderation challenge or tool development",
        "Show your approach to understanding moderator needs and workflows",
        "Explain how you balanced automation with human judgment",
        "Highlight the impact on both moderators and community health"
      ],
      followUps: [
        "How do you gather feedback from volunteer moderators?",
        "What's your approach to training moderators on new tools?",
        "How do you handle conflicts between community rules and platform policies?"
      ]
    },
    {
      title: "Describe a time you had to manage a controversial feature or policy change that affected multiple communities differently.",
      content: "Reddit changes often impact communities differently. Share an example where you had to implement a feature or policy change that was controversial or had varying impacts across different communities. Focus on your approach to stakeholder management and change communication.",
      difficulty: "HARD",
      type: "LEADERSHIP",
      tips: [
        "Choose a change that had significant community impact and controversy",
        "Show your approach to understanding different community perspectives",
        "Explain how you managed communication and feedback collection",
        "Highlight how you adapted the implementation based on community input"
      ],
      followUps: [
        "How do you build consensus among diverse community stakeholders?",
        "What's your approach to rolling out controversial changes?",
        "How do you measure the success of community-impacting changes?"
      ]
    },
    {
      title: "Tell me about a time you had to optimize systems for both real-time interactions and long-term content archival.",
      content: "Reddit needs to support both active discussions and historical content access. Describe a situation where you had to design or optimize systems that could handle real-time user interactions while also maintaining access to Reddit's vast archive of historical content.",
      difficulty: "HARD",
      type: "TECHNICAL",
      tips: [
        "Focus on a system that needed to balance real-time and archival needs",
        "Show your approach to data lifecycle management",
        "Explain how you optimized for both access patterns",
        "Highlight the technical architecture decisions you made"
      ],
      followUps: [
        "How do you decide what content to keep readily accessible vs. archive?",
        "What's your approach to migrating historical data to new systems?",
        "How do you balance storage costs with content accessibility?"
      ]
    },
    {
      title: "Describe a time you had to build systems that could handle viral content while protecting against spam and manipulation.",
      content: "Reddit's voting system can amplify both great content and spam. Share an example where you built or improved systems to support viral content growth while protecting against vote manipulation, spam, or other forms of platform abuse.",
      difficulty: "HARD",
      type: "TECHNICAL",
      tips: [
        "Focus on a specific anti-abuse or content protection challenge",
        "Show your approach to detecting and preventing manipulation",
        "Explain how you balanced protection with legitimate viral content",
        "Highlight the impact on platform health and user experience"
      ],
      followUps: [
        "How do you stay ahead of evolving spam and manipulation tactics?",
        "What's your approach to handling false positives in abuse detection?",
        "How do you measure the effectiveness of anti-abuse systems?"
      ]
    },
    {
      title: "Tell me about a time you had to lead a cross-functional initiative to improve community health and user safety.",
      content: "Community health requires collaboration across many teams. Describe a situation where you led or participated in a cross-functional effort to improve community health, user safety, or platform trust. Focus on your approach to coordination and measuring success.",
      difficulty: "MEDIUM",
      type: "LEADERSHIP",
      tips: [
        "Choose an initiative that involved multiple teams and stakeholders",
        "Show your approach to defining and measuring community health",
        "Explain how you coordinated across different functional areas",
        "Highlight the long-term impact on platform health"
      ],
      followUps: [
        "How do you align different teams around community health goals?",
        "What metrics do you use to measure community health improvements?",
        "How do you balance user freedom with safety requirements?"
      ]
    }
  ],

  meta: [
    {
      title: "Tell me about a time you had to build systems that could handle billions of real-time social interactions while maintaining sub-second response times.",
      content: "Meta's platforms require massive scale with real-time performance. Describe a situation where you built or optimized systems to handle billions of user interactions (posts, likes, comments, messages) while maintaining excellent performance and reliability.",
      difficulty: "HARD",
      type: "TECHNICAL",
      tips: [
        "Focus on a specific system with clear scale and performance requirements",
        "Show your approach to distributed systems design and optimization",
        "Explain how you handled edge cases and failure scenarios",
        "Quantify the scale and performance improvements achieved"
      ],
      followUps: [
        "How do you test systems at Meta's scale?",
        "What's your approach to capacity planning for exponential growth?",
        "How do you balance consistency with performance in distributed systems?"
      ]
    },
    {
      title: "Describe a time you had to implement privacy-preserving features while maintaining rich social experiences.",
      content: "Meta balances social connection with privacy protection. Share an example where you had to build features that protected user privacy while still enabling meaningful social interactions and platform functionality.",
      difficulty: "HARD",
      type: "BEHAVIORAL",
      tips: [
        "Focus on a specific privacy challenge with clear user experience implications",
        "Show how you balanced privacy protection with social functionality",
        "Explain your approach to user education and transparency",
        "Highlight the impact on both privacy and user engagement"
      ],
      followUps: [
        "How do you stay current with evolving privacy regulations?",
        "What's your approach to privacy-by-design in feature development?",
        "How do you measure the success of privacy-preserving features?"
      ]
    },
    {
      title: "Tell me about a time you had to lead a team through a major platform migration or infrastructure change affecting billions of users.",
      content: "Meta regularly evolves its infrastructure at massive scale. Describe a situation where you led your team through a significant platform migration, infrastructure upgrade, or architectural change that affected billions of users. Focus on risk management and team leadership.",
      difficulty: "HARD",
      type: "LEADERSHIP",
      tips: [
        "Choose a migration with significant scale and risk",
        "Show your approach to planning and risk mitigation",
        "Explain how you managed team stress and workload during the migration",
        "Highlight your communication strategy with stakeholders"
      ],
      followUps: [
        "How do you prepare teams for high-stakes migrations?",
        "What's your approach to rollback planning for large-scale changes?",
        "How do you maintain team morale during long, complex projects?"
      ]
    },
    {
      title: "Describe a time you had to optimize algorithms or systems to improve user engagement while combating misinformation or harmful content.",
      content: "Meta must balance engagement with content quality and safety. Share an example where you worked on algorithms, ranking systems, or content features that needed to maintain user engagement while reducing the spread of misinformation or harmful content.",
      difficulty: "HARD",
      type: "BEHAVIORAL",
      tips: [
        "Focus on a specific algorithm or content system challenge",
        "Show how you measured both engagement and content quality",
        "Explain your approach to balancing competing objectives",
        "Highlight the impact on platform health and user experience"
      ],
      followUps: [
        "How do you define and measure content quality at scale?",
        "What's your approach to A/B testing content algorithm changes?",
        "How do you handle edge cases in content classification systems?"
      ]
    },
    {
      title: "Tell me about a time you had to build cross-platform features that worked seamlessly across Facebook, Instagram, WhatsApp, and other Meta properties.",
      content: "Meta's family of apps requires coordination across platforms. Describe a situation where you built features, infrastructure, or systems that needed to work across multiple Meta platforms while respecting each platform's unique characteristics and user expectations.",
      difficulty: "HARD",
      type: "TECHNICAL",
      tips: [
        "Focus on a specific cross-platform technical challenge",
        "Show your approach to shared infrastructure vs. platform-specific implementations",
        "Explain how you handled different platform requirements and constraints",
        "Highlight the benefits achieved through cross-platform coordination"
      ],
      followUps: [
        "How do you balance shared infrastructure with platform-specific needs?",
        "What's your approach to testing features across multiple platforms?",
        "How do you coordinate releases across different platform teams?"
      ]
    },
    {
      title: "Describe a time you had to implement AI/ML systems that could learn and adapt while maintaining fairness and avoiding bias.",
      content: "Meta uses AI/ML extensively across its platforms. Share an example where you built or improved machine learning systems that needed to be both effective and fair, avoiding bias while adapting to user behavior and content patterns.",
      difficulty: "HARD",
      type: "TECHNICAL",
      tips: [
        "Focus on a specific ML system with clear fairness requirements",
        "Show your approach to bias detection and mitigation",
        "Explain how you balanced model performance with fairness",
        "Highlight the impact on user experience and platform equity"
      ],
      followUps: [
        "How do you test ML systems for bias and fairness?",
        "What's your approach to explaining ML decisions to stakeholders?",
        "How do you handle feedback loops that might amplify bias?"
      ]
    },
    {
      title: "Tell me about a time you had to build developer tools or platforms that enabled other engineering teams to move faster while maintaining quality.",
      content: "Meta's engineering productivity depends on great internal tools. Describe a situation where you built developer tools, platforms, or infrastructure that helped other engineering teams move faster, be more productive, or maintain higher quality standards.",
      difficulty: "MEDIUM",
      type: "TECHNICAL",
      tips: [
        "Focus on a specific developer productivity challenge",
        "Show your approach to understanding developer needs and workflows",
        "Explain how you measured the impact on team productivity",
        "Highlight the adoption and feedback from other teams"
      ],
      followUps: [
        "How do you gather requirements from internal developer customers?",
        "What's your approach to maintaining and evolving internal tools?",
        "How do you measure the ROI of developer productivity investments?"
      ]
    }
  ],

  linkedin: [
    {
      title: "Tell me about a time you had to build professional networking features that balanced user privacy with network discovery and growth.",
      content: "LinkedIn must help professionals connect while respecting privacy. Describe a situation where you built features that helped users discover and connect with relevant professionals while maintaining appropriate privacy controls and user trust.",
      difficulty: "MEDIUM",
      type: "BEHAVIORAL",
      tips: [
        "Focus on a specific networking or discovery feature",
        "Show how you balanced discoverability with privacy protection",
        "Explain your approach to user control and transparency",
        "Highlight the impact on professional networking and user trust"
      ],
      followUps: [
        "How do you measure the success of professional networking features?",
        "What's your approach to handling sensitive professional information?",
        "How do you ensure networking features work globally across different cultures?"
      ]
    },
    {
      title: "Describe a time you had to optimize systems for both job seekers and recruiters with potentially conflicting needs.",
      content: "LinkedIn serves both job seekers and recruiters who may have different priorities. Share an example where you had to build or improve systems that optimized for both job seeker success and recruiter efficiency, despite potentially conflicting requirements.",
      difficulty: "HARD",
      type: "BEHAVIORAL",
      tips: [
        "Choose an example with clear tension between job seeker and recruiter needs",
        "Show your approach to understanding both user groups' requirements",
        "Explain how you found solutions that benefited both sides",
        "Quantify the impact on both job seekers and recruiters"
      ],
      followUps: [
        "How do you gather feedback from both job seekers and recruiters?",
        "What metrics do you use to measure success for both user groups?",
        "How do you handle situations where you can't optimize for both sides?"
      ]
    },
    {
      title: "Tell me about a time you had to implement content algorithms that promoted professional value while maintaining user engagement.",
      content: "LinkedIn's feed must balance professional value with engagement. Describe a situation where you worked on content ranking, recommendation systems, or feed algorithms that needed to promote professionally valuable content while keeping users engaged on the platform.",
      difficulty: "HARD",
      type: "TECHNICAL",
      tips: [
        "Focus on a specific content algorithm or ranking challenge",
        "Show how you defined and measured professional value",
        "Explain your approach to balancing different types of engagement",
        "Highlight the impact on content quality and user satisfaction"
      ],
      followUps: [
        "How do you define professional value in content algorithms?",
        "What's your approach to handling different types of professional content?",
        "How do you measure long-term vs. short-term engagement?"
      ]
    },
    {
      title: "Describe a time you had to build systems that could handle global professional data while respecting local employment laws and cultural differences.",
      content: "LinkedIn operates globally with varying employment laws and professional cultures. Share an example where you built systems that needed to handle professional data, job postings, or career features while complying with different regional regulations and cultural norms.",
      difficulty: "HARD",
      type: "TECHNICAL",
      tips: [
        "Focus on a specific global compliance or localization challenge",
        "Show your approach to understanding regional requirements",
        "Explain how you built flexible systems to handle variations",
        "Highlight the impact on global user experience"
      ],
      followUps: [
        "How do you stay current with changing employment laws globally?",
        "What's your approach to testing features across different cultural contexts?",
        "How do you balance global consistency with local requirements?"
      ]
    }
  ],

  google: [
    {
      title: "Tell me about a time you had to design a system that could scale to serve billions of users while maintaining Google's quality and speed standards.",
      content: "Google's systems must handle massive scale with exceptional performance. Describe a situation where you designed or improved a system that needed to serve billions of users while maintaining Google's standards for speed, accuracy, and reliability.",
      difficulty: "HARD",
      type: "TECHNICAL",
      tips: [
        "Focus on a system with clear scale and performance requirements",
        "Show your approach to distributed systems design at Google scale",
        "Explain how you maintained quality while scaling",
        "Quantify the scale and performance achievements"
      ],
      followUps: [
        "How do you test systems at Google's scale?",
        "What's your approach to capacity planning for global systems?",
        "How do you balance latency with consistency in distributed systems?"
      ]
    },
    {
      title: "Describe a time you had to implement machine learning systems that could learn from user behavior while maintaining privacy and avoiding bias.",
      content: "Google's ML systems must be both effective and responsible. Share an example where you built or improved machine learning systems that learned from user data while implementing privacy protections and bias mitigation measures.",
      difficulty: "HARD",
      type: "TECHNICAL",
      tips: [
        "Focus on a specific ML system with privacy and fairness requirements",
        "Show your approach to privacy-preserving machine learning",
        "Explain how you detected and mitigated bias",
        "Highlight the impact on both performance and responsible AI"
      ],
      followUps: [
        "How do you test ML systems for bias across different user groups?",
        "What's your approach to differential privacy in ML systems?",
        "How do you balance model performance with fairness requirements?"
      ]
    },
    {
      title: "Tell me about a time you had to build developer tools or infrastructure that improved productivity for thousands of engineers.",
      content: "Google's engineering productivity depends on excellent tooling. Describe a situation where you built developer tools, CI/CD systems, or infrastructure that significantly improved productivity, code quality, or development velocity for large engineering teams.",
      difficulty: "MEDIUM",
      type: "TECHNICAL",
      tips: [
        "Focus on a tool or system with measurable productivity impact",
        "Show your approach to understanding developer pain points",
        "Explain how you measured and validated productivity improvements",
        "Highlight the adoption and feedback from engineering teams"
      ],
      followUps: [
        "How do you gather requirements from thousands of developers?",
        "What's your approach to rolling out new developer tools?",
        "How do you measure the ROI of developer productivity investments?"
      ]
    },
    {
      title: "Describe a time you had to optimize search or information retrieval systems for both relevance and speed at massive scale.",
      content: "Google's core mission involves organizing information. Share an example where you worked on search algorithms, indexing systems, or information retrieval that needed to balance relevance, speed, and scale while serving diverse user needs.",
      difficulty: "HARD",
      type: "TECHNICAL",
      tips: [
        "Focus on a specific search or retrieval optimization challenge",
        "Show your approach to balancing relevance with performance",
        "Explain how you handled diverse query types and user intents",
        "Quantify the improvements in both speed and relevance"
      ],
      followUps: [
        "How do you measure search relevance at scale?",
        "What's your approach to handling long-tail queries?",
        "How do you balance personalization with universal relevance?"
      ]
    },
    {
      title: "Tell me about a time you had to implement security measures that protected user data while maintaining system performance and user experience.",
      content: "Security is fundamental at Google. Describe a situation where you implemented security features, encryption systems, or privacy protections that safeguarded user data while ensuring systems remained fast and user-friendly.",
      difficulty: "MEDIUM",
      type: "BEHAVIORAL",
      tips: [
        "Focus on a specific security challenge with performance implications",
        "Show your approach to balancing security with usability",
        "Explain how you implemented defense-in-depth strategies",
        "Highlight the impact on both security posture and user experience"
      ],
      followUps: [
        "How do you stay current with evolving security threats?",
        "What's your approach to security testing and validation?",
        "How do you communicate security trade-offs to product teams?"
      ]
    },
    {
      title: "Describe a time you had to lead a cross-functional team to deliver a complex product that integrated multiple Google services.",
      content: "Google's products often integrate multiple services and teams. Share an example where you led a cross-functional initiative that required coordination across multiple Google services, teams, and stakeholders to deliver a unified user experience.",
      difficulty: "HARD",
      type: "LEADERSHIP",
      tips: [
        "Focus on a complex integration with multiple team dependencies",
        "Show your approach to cross-team coordination and communication",
        "Explain how you managed conflicting priorities and timelines",
        "Highlight the impact on user experience and business goals"
      ],
      followUps: [
        "How do you align different teams around shared objectives?",
        "What's your approach to managing dependencies across teams?",
        "How do you handle disagreements between different product areas?"
      ]
    },
    {
      title: "Tell me about a time you had to build systems that could handle real-time data processing while maintaining accuracy and consistency.",
      content: "Google processes enormous amounts of real-time data. Describe a situation where you built or improved real-time data processing systems that needed to handle high-velocity data streams while maintaining data accuracy and system consistency.",
      difficulty: "HARD",
      type: "TECHNICAL",
      tips: [
        "Focus on a specific real-time processing challenge",
        "Show your approach to handling high-velocity data streams",
        "Explain how you ensured data accuracy and consistency",
        "Highlight the impact on downstream systems and user experience"
      ],
      followUps: [
        "How do you handle late-arriving data in real-time systems?",
        "What's your approach to monitoring data quality in streaming systems?",
        "How do you balance latency with accuracy in real-time processing?"
      ]
    }
  ],

  airbnb: [
    {
      title: "Tell me about a time you had to build trust and safety systems that protected both hosts and guests while maintaining the platform's openness.",
      content: "Airbnb's marketplace requires trust between strangers. Describe a situation where you built or improved trust and safety systems, verification processes, or risk management features that protected both hosts and guests while preserving Airbnb's open and welcoming platform experience.",
      difficulty: "HARD",
      type: "BEHAVIORAL",
      tips: [
        "Focus on a specific trust and safety challenge",
        "Show how you balanced protection with user experience",
        "Explain your approach to risk assessment and mitigation",
        "Highlight the impact on platform safety and user confidence"
      ],
      followUps: [
        "How do you measure the effectiveness of trust and safety systems?",
        "What's your approach to handling edge cases in safety systems?",
        "How do you balance automation with human review in safety decisions?"
      ]
    },
    {
      title: "Describe a time you had to optimize search and discovery systems for a global marketplace with diverse inventory and user preferences.",
      content: "Airbnb's search must handle diverse properties and user needs globally. Share an example where you worked on search algorithms, recommendation systems, or discovery features that needed to match diverse user preferences with varied inventory across different markets and cultures.",
      difficulty: "HARD",
      type: "TECHNICAL",
      tips: [
        "Focus on a specific search or discovery optimization challenge",
        "Show your approach to handling diverse inventory and preferences",
        "Explain how you measured and improved matching quality",
        "Highlight the impact on user satisfaction and booking success"
      ],
      followUps: [
        "How do you handle seasonality and local events in search algorithms?",
        "What's your approach to personalizing search across different cultures?",
        "How do you balance host visibility with guest satisfaction?"
      ]
    },
    {
      title: "Tell me about a time you had to implement features that supported Airbnb's mission of belonging while scaling to millions of users.",
      content: "Airbnb's mission focuses on belonging and community. Describe a situation where you built features that promoted belonging, community connection, or cultural exchange while ensuring they could scale to serve millions of users across diverse markets.",
      difficulty: "MEDIUM",
      type: "BEHAVIORAL",
      tips: [
        "Focus on a feature that directly supported Airbnb's belonging mission",
        "Show how you measured belonging and community impact",
        "Explain your approach to scaling community-focused features",
        "Highlight the impact on user experience and platform culture"
      ],
      followUps: [
        "How do you measure belonging and community impact in product features?",
        "What's your approach to fostering community at scale?",
        "How do you handle cultural differences in community-building features?"
      ]
    },
    {
      title: "Describe a time you had to build systems that could handle the complexity of global travel regulations, local laws, and tax requirements.",
      content: "Airbnb operates in markets with complex regulatory environments. Share an example where you built systems to handle travel regulations, local hosting laws, tax collection, or compliance requirements across multiple jurisdictions while maintaining a smooth user experience.",
      difficulty: "HARD",
      type: "TECHNICAL",
      tips: [
        "Focus on a specific regulatory or compliance challenge",
        "Show your approach to handling complex and changing requirements",
        "Explain how you built flexible systems for regulatory compliance",
        "Highlight the impact on legal compliance and user experience"
      ],
      followUps: [
        "How do you stay current with changing regulations across markets?",
        "What's your approach to testing compliance features?",
        "How do you balance compliance requirements with user experience?"
      ]
    }
  ],

  snowflake: [
    {
      title: "Tell me about a time you had to design data systems that could handle massive scale while maintaining query performance and cost efficiency.",
      content: "Snowflake's cloud data platform must handle enormous datasets efficiently. Describe a situation where you designed or optimized data systems that needed to scale to handle massive data volumes while maintaining fast query performance and cost efficiency for customers.",
      difficulty: "HARD",
      type: "TECHNICAL",
      tips: [
        "Focus on a specific data scaling or performance challenge",
        "Show your approach to balancing performance with cost",
        "Explain how you optimized for different query patterns",
        "Quantify the scale and performance improvements achieved"
      ],
      followUps: [
        "How do you optimize data systems for different workload patterns?",
        "What's your approach to capacity planning for data platforms?",
        "How do you balance storage costs with query performance?"
      ]
    },
    {
      title: "Describe a time you had to build multi-tenant systems that provided isolation and security while maximizing resource efficiency.",
      content: "Snowflake serves multiple customers on shared infrastructure. Share an example where you built or improved multi-tenant systems that needed to provide strong isolation and security between customers while maximizing resource utilization and cost efficiency.",
      difficulty: "HARD",
      type: "TECHNICAL",
      tips: [
        "Focus on a specific multi-tenancy challenge",
        "Show your approach to isolation and security design",
        "Explain how you optimized resource sharing and efficiency",
        "Highlight the impact on customer security and platform economics"
      ],
      followUps: [
        "How do you test isolation in multi-tenant systems?",
        "What's your approach to resource allocation across tenants?",
        "How do you handle noisy neighbor problems in shared systems?"
      ]
    },
    {
      title: "Tell me about a time you had to implement data governance and compliance features while maintaining ease of use for data teams.",
      content: "Data platforms must balance governance with usability. Describe a situation where you built data governance, compliance, or security features that met enterprise requirements while keeping the platform easy to use for data analysts and engineers.",
      difficulty: "MEDIUM",
      type: "BEHAVIORAL",
      tips: [
        "Focus on a specific governance or compliance challenge",
        "Show how you balanced security requirements with user experience",
        "Explain your approach to making complex features intuitive",
        "Highlight the impact on both compliance and user adoption"
      ],
      followUps: [
        "How do you gather requirements from both security and user experience perspectives?",
        "What's your approach to educating users about governance features?",
        "How do you measure the success of governance implementations?"
      ]
    },
    {
      title: "Describe a time you had to optimize data processing systems for both batch and real-time workloads with varying performance requirements.",
      content: "Modern data platforms must handle diverse workloads. Share an example where you built or optimized systems that needed to efficiently handle both large batch processing jobs and real-time streaming workloads with different performance and latency requirements.",
      difficulty: "HARD",
      type: "TECHNICAL",
      tips: [
        "Focus on a system that handled both batch and streaming workloads",
        "Show your approach to optimizing for different performance requirements",
        "Explain how you managed resource allocation between workload types",
        "Highlight the impact on system efficiency and user satisfaction"
      ],
      followUps: [
        "How do you prioritize resources between batch and real-time workloads?",
        "What's your approach to monitoring and alerting for diverse workloads?",
        "How do you handle capacity planning for mixed workload patterns?"
      ]
    },
    {
      title: "Tell me about a time you had to build data integration systems that could connect with hundreds of different data sources and formats.",
      content: "Data platforms must integrate with diverse systems. Describe a situation where you built data connectors, ETL systems, or integration platforms that needed to handle hundreds of different data sources, formats, and protocols while maintaining reliability and performance.",
      difficulty: "HARD",
      type: "TECHNICAL",
      tips: [
        "Focus on a specific data integration challenge with diverse sources",
        "Show your approach to handling different data formats and protocols",
        "Explain how you ensured reliability across many integrations",
        "Highlight the impact on customer data accessibility and platform value"
      ],
      followUps: [
        "How do you handle schema evolution in data integration systems?",
        "What's your approach to testing integrations with external systems?",
        "How do you manage the complexity of supporting many data sources?"
      ]
    },
    {
      title: "Describe a time you had to implement disaster recovery and high availability systems for mission-critical data infrastructure.",
      content: "Data platforms require exceptional reliability. Share an example where you designed or implemented disaster recovery, backup systems, or high availability features for mission-critical data infrastructure that customers depended on for business operations.",
      difficulty: "HARD",
      type: "TECHNICAL",
      tips: [
        "Focus on a specific reliability or disaster recovery challenge",
        "Show your approach to designing for high availability",
        "Explain how you tested and validated recovery procedures",
        "Highlight the impact on customer trust and business continuity"
      ],
      followUps: [
        "How do you test disaster recovery procedures without impacting customers?",
        "What's your approach to balancing availability with consistency?",
        "How do you communicate reliability guarantees to customers?"
      ]
    },
    {
      title: "Tell me about a time you had to lead a team through a complex data migration or platform upgrade affecting thousands of customers.",
      content: "Data platform changes affect many customers. Describe a situation where you led your team through a major data migration, platform upgrade, or infrastructure change that affected thousands of customers and their critical data workloads.",
      difficulty: "HARD",
      type: "LEADERSHIP",
      tips: [
        "Focus on a migration with significant customer impact and complexity",
        "Show your approach to planning and risk mitigation",
        "Explain how you managed customer communication and expectations",
        "Highlight your team leadership during the high-stakes project"
      ],
      followUps: [
        "How do you prepare teams for complex, high-stakes migrations?",
        "What's your approach to customer communication during major changes?",
        "How do you handle unexpected issues during critical migrations?"
      ]
    },
    {
      title: "Describe a time you had to optimize data platform costs while maintaining performance and customer satisfaction.",
      content: "Cloud data platforms must balance cost and performance. Share an example where you had to optimize infrastructure costs, resource utilization, or pricing models while ensuring customers continued to receive excellent performance and value from the platform.",
      difficulty: "MEDIUM",
      type: "BEHAVIORAL",
      tips: [
        "Focus on a specific cost optimization challenge",
        "Show how you balanced cost reduction with performance requirements",
        "Explain your approach to measuring and communicating value",
        "Highlight the impact on both platform economics and customer satisfaction"
      ],
      followUps: [
        "How do you identify cost optimization opportunities without impacting performance?",
        "What's your approach to communicating cost changes to customers?",
        "How do you measure the success of cost optimization initiatives?"
      ]
    }
  ],

  "scale-ai": [
    {
      title: "Tell me about a time you had to build systems that could handle massive amounts of training data while ensuring data quality and labeling accuracy.",
      content: "Scale AI processes enormous amounts of training data for AI models. Describe a situation where you built or improved systems that needed to handle massive data volumes while maintaining high standards for data quality, labeling accuracy, and processing efficiency.",
      difficulty: "HARD",
      type: "TECHNICAL",
      tips: [
        "Focus on a specific data processing or quality challenge",
        "Show your approach to scaling data processing while maintaining quality",
        "Explain how you measured and ensured labeling accuracy",
        "Highlight the impact on AI model training effectiveness"
      ],
      followUps: [
        "How do you balance processing speed with data quality requirements?",
        "What's your approach to detecting and correcting labeling errors at scale?",
        "How do you handle different data types and labeling requirements?"
      ]
    },
    {
      title: "Describe a time you had to implement quality control systems for human-in-the-loop AI training processes.",
      content: "Scale AI combines human expertise with AI systems. Share an example where you built quality control, review systems, or feedback loops for human annotators and reviewers working on AI training data, ensuring both efficiency and accuracy.",
      difficulty: "MEDIUM",
      type: "BEHAVIORAL",
      tips: [
        "Focus on a specific human-AI collaboration challenge",
        "Show your approach to quality control and feedback systems",
        "Explain how you balanced human judgment with automated processes",
        "Highlight the impact on data quality and annotator productivity"
      ],
      followUps: [
        "How do you measure and improve human annotator performance?",
        "What's your approach to training and onboarding new annotators?",
        "How do you handle disagreements between human reviewers?"
      ]
    },
    {
      title: "Tell me about a time you had to build AI model evaluation and testing systems that could assess model performance across diverse use cases.",
      content: "AI models must be thoroughly tested across various scenarios. Describe a situation where you built evaluation frameworks, testing systems, or benchmarking tools that could assess AI model performance across different use cases, data types, or customer requirements.",
      difficulty: "HARD",
      type: "TECHNICAL",
      tips: [
        "Focus on a specific model evaluation or testing challenge",
        "Show your approach to comprehensive model assessment",
        "Explain how you handled diverse use cases and requirements",
        "Highlight the impact on model quality and customer satisfaction"
      ],
      followUps: [
        "How do you design evaluation metrics for different types of AI models?",
        "What's your approach to testing model performance on edge cases?",
        "How do you communicate model performance to non-technical stakeholders?"
      ]
    },
    {
      title: "Describe a time you had to optimize AI training pipelines for both speed and cost efficiency while maintaining model quality.",
      content: "AI training can be expensive and time-consuming. Share an example where you optimized training pipelines, resource allocation, or infrastructure to reduce training time and costs while ensuring the resulting models met quality standards.",
      difficulty: "HARD",
      type: "TECHNICAL",
      tips: [
        "Focus on a specific training optimization challenge",
        "Show your approach to balancing speed, cost, and quality",
        "Explain how you measured and improved training efficiency",
        "Highlight the impact on both economics and model performance"
      ],
      followUps: [
        "How do you identify bottlenecks in AI training pipelines?",
        "What's your approach to resource allocation for different model types?",
        "How do you handle trade-offs between training speed and model accuracy?"
      ]
    },
    {
      title: "Tell me about a time you had to build systems that could adapt to rapidly evolving AI model architectures and training techniques.",
      content: "AI technology evolves rapidly. Describe a situation where you built flexible systems, platforms, or infrastructure that could adapt to new AI model architectures, training techniques, or research developments without requiring complete rebuilds.",
      difficulty: "HARD",
      type: "TECHNICAL",
      tips: [
        "Focus on a system designed for flexibility and adaptability",
        "Show your approach to building extensible AI infrastructure",
        "Explain how you stayed current with AI research developments",
        "Highlight the impact on platform agility and innovation speed"
      ],
      followUps: [
        "How do you balance system flexibility with performance optimization?",
        "What's your approach to evaluating and adopting new AI techniques?",
        "How do you manage technical debt in rapidly evolving AI systems?"
      ]
    },
    {
      title: "Describe a time you had to implement security and privacy measures for sensitive training data while maintaining system performance.",
      content: "AI training often involves sensitive data. Share an example where you implemented security measures, privacy protections, or compliance features for AI training systems that handled sensitive or regulated data while maintaining training performance and efficiency.",
      difficulty: "MEDIUM",
      type: "BEHAVIORAL",
      tips: [
        "Focus on a specific security or privacy challenge",
        "Show your approach to balancing security with performance",
        "Explain how you implemented privacy-preserving techniques",
        "Highlight the impact on both security and system efficiency"
      ],
      followUps: [
        "How do you stay current with privacy regulations affecting AI systems?",
        "What's your approach to auditing and monitoring AI system security?",
        "How do you handle data retention and deletion in AI training systems?"
      ]
    },
    {
      title: "Tell me about a time you had to build customer-facing AI tools that made complex AI capabilities accessible to non-technical users.",
      content: "Scale AI serves customers who may not be AI experts. Describe a situation where you built user interfaces, APIs, or tools that made complex AI capabilities accessible and usable for customers without deep AI expertise.",
      difficulty: "MEDIUM",
      type: "BEHAVIORAL",
      tips: [
        "Focus on a specific user experience challenge for AI tools",
        "Show your approach to simplifying complex AI concepts",
        "Explain how you gathered and incorporated user feedback",
        "Highlight the impact on customer adoption and success"
      ],
      followUps: [
        "How do you design intuitive interfaces for complex AI systems?",
        "What's your approach to educating customers about AI capabilities and limitations?",
        "How do you measure the success of customer-facing AI tools?"
      ]
    },
    {
      title: "Describe a time you had to scale AI infrastructure to handle exponential growth in data volume and model complexity.",
      content: "AI workloads can grow exponentially. Share an example where you had to scale AI infrastructure, computing resources, or data processing systems to handle rapid growth in data volume, model size, or customer demand while maintaining performance and reliability.",
      difficulty: "HARD",
      type: "TECHNICAL",
      tips: [
        "Focus on a specific scaling challenge with clear growth metrics",
        "Show your approach to capacity planning for AI workloads",
        "Explain how you handled resource allocation and optimization",
        "Highlight the impact on system performance and customer experience"
      ],
      followUps: [
        "How do you predict and plan for AI infrastructure scaling needs?",
        "What's your approach to optimizing costs during rapid scaling?",
        "How do you handle performance monitoring for scaled AI systems?"
      ]
    }
  ],

  openai: [
    {
      title: "Tell me about a time you had to build AI safety measures into production systems while maintaining model performance and user experience.",
      content: "OpenAI prioritizes AI safety alongside performance. Describe a situation where you implemented safety measures, alignment techniques, or risk mitigation features in AI systems while ensuring they remained performant and provided excellent user experiences.",
      difficulty: "HARD",
      type: "BEHAVIORAL",
      tips: [
        "Focus on a specific AI safety challenge you addressed",
        "Show your approach to balancing safety with performance",
        "Explain how you measured and validated safety measures",
        "Highlight the impact on both safety and user satisfaction"
      ],
      followUps: [
        "How do you stay current with AI safety research and best practices?",
        "What's your approach to testing safety measures in AI systems?",
        "How do you communicate AI safety trade-offs to stakeholders?"
      ]
    },
    {
      title: "Describe a time you had to optimize large language model inference to handle millions of requests while maintaining response quality.",
      content: "OpenAI's models serve millions of users with high expectations. Share an example where you optimized model inference, serving infrastructure, or response generation to handle massive scale while maintaining the quality and coherence of AI responses.",
      difficulty: "HARD",
      type: "TECHNICAL",
      tips: [
        "Focus on a specific inference optimization challenge",
        "Show your approach to scaling model serving infrastructure",
        "Explain how you balanced speed with response quality",
        "Quantify the scale and performance improvements achieved"
      ],
      followUps: [
        "How do you monitor and ensure response quality at scale?",
        "What's your approach to capacity planning for AI model serving?",
        "How do you handle different model sizes and complexity requirements?"
      ]
    },
    {
      title: "Tell me about a time you had to build research infrastructure that enabled rapid experimentation with new AI model architectures.",
      content: "OpenAI is at the forefront of AI research. Describe a situation where you built research tools, experimentation platforms, or infrastructure that enabled researchers to rapidly prototype, test, and iterate on new AI model architectures and training techniques.",
      difficulty: "HARD",
      type: "TECHNICAL",
      tips: [
        "Focus on infrastructure that accelerated research and experimentation",
        "Show your approach to balancing flexibility with performance",
        "Explain how you supported diverse research needs and workflows",
        "Highlight the impact on research velocity and breakthrough discoveries"
      ],
      followUps: [
        "How do you design infrastructure for unknown future research needs?",
        "What's your approach to supporting both incremental and breakthrough research?",
        "How do you balance research infrastructure with production system needs?"
      ]
    },
    {
      title: "Describe a time you had to implement responsible AI practices in model training and deployment pipelines.",
      content: "Responsible AI is core to OpenAI's mission. Share an example where you built responsible AI practices into training pipelines, deployment systems, or model evaluation processes to ensure AI systems are beneficial, safe, and aligned with human values.",
      difficulty: "MEDIUM",
      type: "BEHAVIORAL",
      tips: [
        "Focus on specific responsible AI practices you implemented",
        "Show your approach to embedding ethics and safety into technical systems",
        "Explain how you measured and validated responsible AI outcomes",
        "Highlight the impact on model behavior and societal benefit"
      ],
      followUps: [
        "How do you stay current with responsible AI best practices?",
        "What's your approach to measuring bias and fairness in AI systems?",
        "How do you balance innovation with responsible development practices?"
      ]
    },
    {
      title: "Tell me about a time you had to build systems for fine-tuning and customizing AI models while maintaining safety and quality standards.",
      content: "OpenAI enables model customization for various use cases. Describe a situation where you built fine-tuning systems, customization tools, or deployment pipelines that allowed users to adapt AI models while ensuring safety, quality, and alignment with OpenAI's principles.",
      difficulty: "HARD",
      type: "TECHNICAL",
      tips: [
        "Focus on a specific customization or fine-tuning challenge",
        "Show your approach to maintaining safety during model adaptation",
        "Explain how you balanced user flexibility with quality control",
        "Highlight the impact on user success and platform safety"
      ],
      followUps: [
        "How do you prevent fine-tuning from degrading model safety?",
        "What's your approach to validating custom model performance?",
        "How do you handle conflicting customization requirements?"
      ]
    },
    {
      title: "Describe a time you had to optimize AI model training for both computational efficiency and environmental sustainability.",
      content: "Large-scale AI training has significant computational and environmental costs. Share an example where you optimized training processes, infrastructure, or algorithms to reduce computational requirements and environmental impact while maintaining model quality.",
      difficulty: "HARD",
      type: "TECHNICAL",
      tips: [
        "Focus on specific efficiency optimizations with environmental impact",
        "Show your approach to measuring and reducing computational costs",
        "Explain how you balanced efficiency with model performance",
        "Highlight the impact on both costs and environmental sustainability"
      ],
      followUps: [
        "How do you measure the environmental impact of AI training?",
        "What's your approach to green computing in AI infrastructure?",
        "How do you communicate sustainability trade-offs to stakeholders?"
      ]
    },
    {
      title: "Tell me about a time you had to build monitoring and observability systems for AI models in production.",
      content: "AI models in production require sophisticated monitoring. Describe a situation where you built monitoring, logging, or observability systems that could track AI model performance, detect drift, and ensure reliable operation in production environments.",
      difficulty: "MEDIUM",
      type: "TECHNICAL",
      tips: [
        "Focus on specific monitoring challenges for AI systems",
        "Show your approach to detecting model drift and performance degradation",
        "Explain how you designed alerts and automated responses",
        "Highlight the impact on system reliability and user experience"
      ],
      followUps: [
        "How do you design monitoring for different types of AI models?",
        "What's your approach to automated model retraining and deployment?",
        "How do you balance monitoring overhead with system performance?"
      ]
    },
    {
      title: "Describe a time you had to lead a team through a complex AI research project with uncertain outcomes and evolving requirements.",
      content: "AI research involves significant uncertainty and iteration. Share an example where you led an engineering team through a complex AI research project that had uncertain outcomes, evolving requirements, and required balancing research exploration with engineering rigor.",
      difficulty: "HARD",
      type: "LEADERSHIP",
      tips: [
        "Focus on a research project with significant uncertainty and complexity",
        "Show your approach to managing uncertainty and changing requirements",
        "Explain how you balanced research exploration with engineering discipline",
        "Highlight your leadership during ambiguous and challenging periods"
      ],
      followUps: [
        "How do you maintain team motivation during uncertain research projects?",
        "What's your approach to setting milestones for open-ended research?",
        "How do you balance research risk-taking with delivery commitments?"
      ]
    }
  ],

  netflix: [
    {
      title: "Tell me about a time you had to build recommendation systems that balanced personalization with content discovery and diversity.",
      content: "Netflix's recommendation engine must balance multiple objectives. Describe a situation where you worked on recommendation algorithms that needed to provide personalized content while also promoting content discovery, diversity, and helping users find new types of content they might enjoy.",
      difficulty: "HARD",
      type: "TECHNICAL",
      tips: [
        "Focus on a specific recommendation algorithm challenge",
        "Show your approach to balancing multiple recommendation objectives",
        "Explain how you measured success across different goals",
        "Highlight the impact on user engagement and content discovery"
      ],
      followUps: [
        "How do you measure the success of recommendation systems beyond engagement?",
        "What's your approach to handling the cold start problem for new users?",
        "How do you balance popular content with niche content in recommendations?"
      ]
    },
    {
      title: "Describe a time you had to optimize video streaming infrastructure to deliver high-quality content globally with minimal buffering.",
      content: "Netflix streams to millions globally with varying network conditions. Share an example where you optimized video delivery, CDN systems, or streaming protocols to ensure high-quality video playback across diverse network conditions and geographic locations.",
      difficulty: "HARD",
      type: "TECHNICAL",
      tips: [
        "Focus on a specific streaming optimization challenge",
        "Show your approach to handling diverse network conditions",
        "Explain how you measured and improved streaming quality",
        "Highlight the impact on user experience across different regions"
      ],
      followUps: [
        "How do you test streaming performance across different network conditions?",
        "What's your approach to adaptive bitrate streaming optimization?",
        "How do you handle content delivery in regions with limited infrastructure?"
      ]
    },
    {
      title: "Tell me about a time you had to implement A/B testing infrastructure that could handle complex experiments across millions of users.",
      content: "Netflix runs sophisticated experiments to optimize user experience. Describe a situation where you built or improved A/B testing infrastructure that could handle complex, multi-variate experiments across millions of users while ensuring statistical validity and minimal user impact.",
      difficulty: "HARD",
      type: "TECHNICAL",
      tips: [
        "Focus on a specific A/B testing infrastructure challenge",
        "Show your approach to experimental design and statistical validity",
        "Explain how you handled complex experiments at scale",
        "Highlight the impact on product development and user experience"
      ],
      followUps: [
        "How do you ensure statistical validity in large-scale experiments?",
        "What's your approach to handling experiment interactions and conflicts?",
        "How do you measure long-term effects of experimental changes?"
      ]
    },
    {
      title: "Describe a time you had to build content production tools that enabled creative teams to work efficiently while maintaining technical quality standards.",
      content: "Netflix creates original content at scale. Share an example where you built tools, workflows, or systems that helped content creators, producers, or post-production teams work more efficiently while ensuring technical quality and consistency across productions.",
      difficulty: "MEDIUM",
      type: "BEHAVIORAL",
      tips: [
        "Focus on a specific content production tool or workflow challenge",
        "Show your approach to understanding creative team needs",
        "Explain how you balanced efficiency with quality requirements",
        "Highlight the impact on content production speed and quality"
      ],
      followUps: [
        "How do you gather requirements from creative and technical stakeholders?",
        "What's your approach to ensuring tools work across different production workflows?",
        "How do you measure the success of content production tools?"
      ]
    },
    {
      title: "Tell me about a time you had to implement data systems that could analyze viewing patterns across hundreds of millions of users while protecting user privacy.",
      content: "Netflix analyzes massive amounts of viewing data while respecting privacy. Describe a situation where you built analytics systems, data pipelines, or measurement tools that could process viewing behavior data at scale while implementing appropriate privacy protections and data governance.",
      difficulty: "HARD",
      type: "TECHNICAL",
      tips: [
        "Focus on a specific data analytics challenge with privacy requirements",
        "Show your approach to balancing analytics needs with privacy protection",
        "Explain how you implemented privacy-preserving analytics techniques",
        "Highlight the impact on both insights generation and privacy compliance"
      ],
      followUps: [
        "How do you implement differential privacy in large-scale analytics systems?",
        "What's your approach to data retention and deletion in analytics pipelines?",
        "How do you ensure analytics insights remain valuable while protecting privacy?"
      ]
    },
    {
      title: "Describe a time you had to lead a team through a major platform migration that affected content delivery for millions of users.",
      content: "Netflix regularly evolves its infrastructure. Share an example where you led your team through a significant platform migration, infrastructure upgrade, or architectural change that affected content delivery, user experience, or operational systems for millions of users.",
      difficulty: "HARD",
      type: "LEADERSHIP",
      tips: [
        "Focus on a migration with significant user impact and technical complexity",
        "Show your approach to planning and risk mitigation",
        "Explain how you managed team coordination and communication",
        "Highlight your leadership during the high-stakes project"
      ],
      followUps: [
        "How do you prepare teams for complex, user-impacting migrations?",
        "What's your approach to rollback planning for content delivery systems?",
        "How do you maintain team focus during long, complex migration projects?"
      ]
    },
    {
      title: "Tell me about a time you had to build machine learning systems for content understanding and automated tagging at massive scale.",
      content: "Netflix uses ML to understand and categorize content. Describe a situation where you built or improved machine learning systems for content analysis, automated tagging, or content understanding that needed to process thousands of hours of video content efficiently and accurately.",
      difficulty: "HARD",
      type: "TECHNICAL",
      tips: [
        "Focus on a specific content ML challenge with scale requirements",
        "Show your approach to training and deploying content understanding models",
        "Explain how you handled diverse content types and quality levels",
        "Highlight the impact on content discovery and recommendation systems"
      ],
      followUps: [
        "How do you handle bias in content understanding models?",
        "What's your approach to validating ML models for content analysis?",
        "How do you balance automation with human review in content tagging?"
      ]
    },
    {
      title: "Describe a time you had to implement chaos engineering practices to ensure Netflix's reliability during peak traffic events.",
      content: "Netflix must remain reliable during high-traffic periods. Share an example where you implemented chaos engineering, fault injection, or resilience testing practices to ensure Netflix could handle peak traffic events, outages, or unexpected failures without service degradation.",
      difficulty: "MEDIUM",
      type: "TECHNICAL",
      tips: [
        "Focus on a specific reliability or chaos engineering initiative",
        "Show your approach to testing system resilience and failure modes",
        "Explain how you balanced testing with production stability",
        "Highlight the impact on system reliability and user experience"
      ],
      followUps: [
        "How do you design chaos experiments that don't impact users?",
        "What's your approach to measuring and improving system resilience?",
        "How do you build a culture of reliability engineering in your team?"
      ]
    }
  ],

  anthropic: [
    {
      title: "Tell me about a time you had to implement AI alignment techniques or safety measures that required balancing model capabilities with responsible AI principles.",
      content: "Anthropic focuses on AI safety and alignment. Describe a situation where you implemented constitutional AI, safety training, or alignment techniques that required careful balancing of model capabilities with safety, helpfulness, and harmlessness principles.",
      difficulty: "HARD",
      type: "BEHAVIORAL",
      tips: [
        "Focus on a specific AI safety or alignment challenge",
        "Show your approach to balancing capability with safety",
        "Explain how you measured and validated safety improvements",
        "Highlight the impact on both model performance and safety"
      ],
      followUps: [
        "How do you evaluate the effectiveness of AI safety measures?",
        "What's your approach to staying current with AI alignment research?",
        "How do you handle trade-offs between model capabilities and safety constraints?"
      ]
    },
    {
      title: "Describe a time you had to build interpretability tools or systems that helped researchers understand AI model behavior and decision-making.",
      content: "Understanding AI systems is crucial for safety. Share an example where you built interpretability tools, analysis systems, or research infrastructure that helped researchers understand how AI models make decisions, what they learn, or how they behave in different scenarios.",
      difficulty: "HARD",
      type: "TECHNICAL",
      tips: [
        "Focus on a specific interpretability or analysis tool challenge",
        "Show your approach to making AI behavior understandable",
        "Explain how you validated the effectiveness of interpretability tools",
        "Highlight the impact on AI safety research and understanding"
      ],
      followUps: [
        "How do you design interpretability tools for different types of AI models?",
        "What's your approach to validating interpretability explanations?",
        "How do you balance interpretability with model performance?"
      ]
    },
    {
      title: "Tell me about a time you had to implement constitutional AI training methods that taught models to follow principles and values.",
      content: "Constitutional AI is core to Anthropic's approach. Describe a situation where you implemented constitutional AI training, value learning, or principle-based training methods that taught AI models to follow ethical guidelines and human values in their responses.",
      difficulty: "HARD",
      type: "TECHNICAL",
      tips: [
        "Focus on a specific constitutional AI implementation challenge",
        "Show your approach to encoding principles and values in training",
        "Explain how you measured adherence to constitutional principles",
        "Highlight the impact on model behavior and alignment"
      ],
      followUps: [
        "How do you validate that models are following constitutional principles?",
        "What's your approach to handling conflicts between different principles?",
        "How do you update constitutional training as values evolve?"
      ]
    },
    {
      title: "Describe a time you had to build red-teaming or adversarial testing systems to identify AI model vulnerabilities and failure modes.",
      content: "AI safety requires thorough testing for failure modes. Share an example where you built red-teaming systems, adversarial testing frameworks, or vulnerability assessment tools that could systematically identify ways AI models might fail or behave unsafely.",
      difficulty: "HARD",
      type: "TECHNICAL",
      tips: [
        "Focus on a specific red-teaming or adversarial testing challenge",
        "Show your approach to systematic vulnerability discovery",
        "Explain how you designed comprehensive testing frameworks",
        "Highlight the impact on model safety and robustness"
      ],
      followUps: [
        "How do you design red-teaming that covers unknown failure modes?",
        "What's your approach to prioritizing different types of safety risks?",
        "How do you balance thorough testing with development velocity?"
      ]
    },
    {
      title: "Tell me about a time you had to implement human feedback systems that improved AI model alignment with human preferences and values.",
      content: "Human feedback is crucial for AI alignment. Describe a situation where you built human feedback collection systems, preference learning frameworks, or human-in-the-loop training that helped align AI models with human preferences and values.",
      difficulty: "MEDIUM",
      type: "BEHAVIORAL",
      tips: [
        "Focus on a specific human feedback system challenge",
        "Show your approach to collecting and incorporating human preferences",
        "Explain how you handled diverse and conflicting human feedback",
        "Highlight the impact on model alignment and user satisfaction"
      ],
      followUps: [
        "How do you handle bias and diversity in human feedback collection?",
        "What's your approach to scaling human feedback systems?",
        "How do you measure the quality of human feedback for training?"
      ]
    },
    {
      title: "Describe a time you had to build research infrastructure that enabled rapid experimentation with novel AI safety techniques.",
      content: "AI safety research requires flexible infrastructure. Share an example where you built research platforms, experimentation frameworks, or infrastructure that enabled researchers to rapidly prototype and test new AI safety techniques, alignment methods, or interpretability approaches.",
      difficulty: "HARD",
      type: "TECHNICAL",
      tips: [
        "Focus on infrastructure that accelerated safety research",
        "Show your approach to supporting diverse research methodologies",
        "Explain how you balanced flexibility with reproducibility",
        "Highlight the impact on research velocity and breakthrough discoveries"
      ],
      followUps: [
        "How do you design infrastructure for unknown future safety research needs?",
        "What's your approach to ensuring research reproducibility?",
        "How do you balance research infrastructure with production system needs?"
      ]
    },
    {
      title: "Tell me about a time you had to implement scalable evaluation systems that could assess AI model safety across diverse scenarios and use cases.",
      content: "AI safety evaluation must be comprehensive and scalable. Describe a situation where you built evaluation frameworks, testing systems, or assessment tools that could systematically evaluate AI model safety, alignment, and robustness across many different scenarios and use cases.",
      difficulty: "HARD",
      type: "TECHNICAL",
      tips: [
        "Focus on a comprehensive safety evaluation challenge",
        "Show your approach to designing scalable evaluation frameworks",
        "Explain how you covered diverse scenarios and edge cases",
        "Highlight the impact on model safety validation and deployment decisions"
      ],
      followUps: [
        "How do you design evaluations for scenarios you haven't anticipated?",
        "What's your approach to balancing evaluation thoroughness with efficiency?",
        "How do you validate that your safety evaluations are comprehensive?"
      ]
    },
    {
      title: "Describe a time you had to lead a cross-functional team working on AI safety research with uncertain timelines and evolving safety requirements.",
      content: "AI safety research involves significant uncertainty. Share an example where you led a team working on AI safety research that had uncertain outcomes, evolving safety requirements, and required balancing research exploration with practical safety improvements.",
      difficulty: "HARD",
      type: "LEADERSHIP",
      tips: [
        "Focus on a safety research project with significant uncertainty",
        "Show your approach to managing evolving safety requirements",
        "Explain how you balanced research exploration with practical outcomes",
        "Highlight your leadership during ambiguous and high-stakes work"
      ],
      followUps: [
        "How do you maintain team motivation during uncertain safety research?",
        "What's your approach to setting milestones for open-ended safety work?",
        "How do you balance safety research rigor with urgency of deployment needs?"
      ]
    }
  ]
};

async function generateCriticalQuestions() {
  try {
    console.log('Starting critical questions generation...');
    
    // Get all companies and their current critical question counts
    const companies = await prisma.company.findMany({
      include: {
        companyQuestions: {
          where: { isCritical: true }
        },
        categories: true
      }
    });

    for (const company of companies) {
      const currentCriticalCount = company.companyQuestions.length;
      const questionsNeeded = Math.max(0, 10 - currentCriticalCount);
      
      console.log(`\n${company.name}: ${currentCriticalCount} critical questions, need ${questionsNeeded} more`);
      
      if (questionsNeeded === 0) {
        console.log(`  ✓ ${company.name} already has enough critical questions`);
        continue;
      }

      const companyQuestions = aiGeneratedQuestions[company.slug] || [];
      let questionsToAdd = companyQuestions.slice(0, questionsNeeded);
      
      // If we don't have enough questions for this company, add some generic ones
      if (questionsToAdd.length < questionsNeeded) {
        const genericQuestions = [
          {
            title: `Tell me about a time you had to scale engineering systems to handle 10x growth at ${company.name}.`,
            content: `Scaling is crucial for growing companies. Describe a situation where you had to scale engineering systems, processes, or teams to handle significant growth while maintaining quality and performance.`,
            difficulty: "HARD",
            type: "TECHNICAL",
            tips: [
              "Focus on a specific scaling challenge with clear metrics",
              "Show your systematic approach to identifying bottlenecks",
              "Explain how you balanced speed with reliability",
              "Quantify the scale increase and impact"
            ],
            followUps: [
              "How do you prepare systems for future scaling needs?",
              "What would you do differently if you had to scale even further?",
              "How do you monitor system performance during scaling?"
            ]
          },
          {
            title: `Describe a time you had to lead a cross-functional team to deliver a critical project at ${company.name}.`,
            content: `Cross-functional leadership is essential for engineering managers. Share an example where you led a team across multiple functions (engineering, product, design, etc.) to deliver a critical project or feature.`,
            difficulty: "MEDIUM",
            type: "LEADERSHIP",
            tips: [
              "Focus on a project with multiple stakeholders and dependencies",
              "Show your approach to coordination and communication",
              "Explain how you managed conflicting priorities",
              "Highlight the impact on business goals"
            ],
            followUps: [
              "How do you handle disagreements between different functions?",
              "What tools do you use for cross-functional coordination?",
              "How do you ensure alignment when teams have different priorities?"
            ]
          },
          {
            title: `Tell me about a time you had to make a difficult technical decision that impacted ${company.name}'s product strategy.`,
            content: `Technical decisions often have strategic implications. Describe a situation where you had to make a challenging technical choice that significantly impacted product direction, user experience, or business outcomes.`,
            difficulty: "HARD",
            type: "BEHAVIORAL",
            tips: [
              "Choose a decision with clear strategic implications",
              "Show your decision-making process and criteria",
              "Explain how you communicated with stakeholders",
              "Highlight the long-term impact and lessons learned"
            ],
            followUps: [
              "How do you balance technical excellence with business needs?",
              "What's your approach to technical due diligence?",
              "How do you communicate technical risks to non-technical stakeholders?"
            ]
          }
        ];
        
        const additionalNeeded = questionsNeeded - questionsToAdd.length;
        questionsToAdd = [...questionsToAdd, ...genericQuestions.slice(0, additionalNeeded)];
      }
      
      if (questionsToAdd.length === 0) {
        console.log(`  ⚠️  No AI questions defined for ${company.name}`);
        continue;
      }

      // Get a default category for this company (use the first one)
      const defaultCategory = company.categories[0];
      if (!defaultCategory) {
        console.log(`  ⚠️  No categories found for ${company.name}`);
        continue;
      }

      for (const [index, questionData] of questionsToAdd.entries()) {
        try {
          // Create or find the base question
          let question = await prisma.question.findUnique({
            where: { title: questionData.title }
          });

          if (!question) {
            question = await prisma.question.create({
              data: {
                title: questionData.title,
                content: questionData.content,
                difficulty: questionData.difficulty,
                type: questionData.type,
                tips: questionData.tips,
                followUps: questionData.followUps,
                isAiGenerated: true
              }
            });
          }

          // Create the company-specific mapping (check if it already exists)
          const existingMapping = await prisma.companyQuestion.findUnique({
            where: {
              questionId_companyId: {
                questionId: question.id,
                companyId: company.id
              }
            }
          });

          if (!existingMapping) {
            await prisma.companyQuestion.create({
              data: {
                questionId: question.id,
                companyId: company.id,
                categoryId: defaultCategory.id,
                isCritical: true,
                order: currentCriticalCount + index + 1
              }
            });
          } else {
            // Update existing mapping to be critical if it isn't already
            if (!existingMapping.isCritical) {
              await prisma.companyQuestion.update({
                where: { id: existingMapping.id },
                data: { isCritical: true }
              });
            }
          }

          console.log(`  ✓ Added: ${questionData.title}`);
        } catch (error) {
          console.error(`  ✗ Error adding question "${questionData.title}":`, error.message);
        }
      }
    }

    console.log('\n✅ Critical questions generation completed!');
    
    // Show final counts
    const updatedCompanies = await prisma.company.findMany({
      include: {
        companyQuestions: {
          where: { isCritical: true }
        }
      }
    });

    console.log('\nFinal critical questions count:');
    for (const company of updatedCompanies) {
      console.log(`${company.name}: ${company.companyQuestions.length} critical questions`);
    }

  } catch (error) {
    console.error('Error generating critical questions:', error);
  } finally {
    await prisma.$disconnect();
  }
}

generateCriticalQuestions();
