
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Company data with comprehensive information
const companies = [
  {
    name: 'Meta',
    slug: 'meta',
    description: 'Meta builds technologies that help people connect, find communities, and grow businesses.',
    logoUrl: '{https://i.pinimg.com/originals/95/d9/53/95d9534fab30d2a09cab60a9b2d65ec3.png}',
    values: [
      'Move Fast',
      'Focus on Long-Term Impact', 
      'Build Awesome Things',
      'Live in the Future',
      'Be Direct and Respect Your Colleagues'
    ],
    principles: [
      'Be Bold',
      'Focus on Impact',
      'Move Fast',
      'Be Open',
      'Build Social Value'
    ]
  },
  {
    name: 'Google',
    slug: 'google',
    description: 'Google\'s mission is to organize the world\'s information and make it universally accessible and useful.',
    logoUrl: '{https://i.pinimg.com/originals/62/07/f5/6207f5dc41e4b63b0d9c53302ce3a24b.jpg}',
    values: [
      'Focus on the user and all else will follow',
      'It\'s best to do one thing really, really well',
      'Fast is better than slow',
      'Democracy on the web works',
      'You don\'t need to be at your desk to need an answer'
    ],
    principles: [
      'General Cognitive Ability',
      'Role-Related Knowledge',
      'Leadership',
      'Googleyness'
    ]
  },
  {
    name: 'Amazon',
    slug: 'amazon',
    description: 'Amazon is guided by four principles: customer obsession rather than competitor focus, passion for invention, commitment to operational excellence, and long-term thinking.',
    logoUrl: '{https://i.pinimg.com/736x/20/62/74/20627424dc09025143a7719134eb9701.jpg}',
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
    name: 'Apple',
    slug: 'apple',
    description: 'Apple designs and creates iPod and iTunes, Mac laptop and desktop computers, the OS X operating system, and the revolutionary iPhone and iPad.',
    logoUrl: '{https://i.ytimg.com/vi/1TyrgCbkJyM/hqdefault.jpg}',
    values: [
      'Innovation',
      'Privacy',
      'Quality',
      'User Experience',
      'Environmental Responsibility'
    ],
    principles: [
      'Think Different',
      'Simplicity',
      'Privacy by Design',
      'Quality over Quantity',
      'User-Centric Design'
    ]
  },
  {
    name: 'Microsoft',
    slug: 'microsoft',
    description: 'Microsoft\'s mission is to empower every person and every organization on the planet to achieve more.',
    logoUrl: '{https://i.pinimg.com/736x/f5/9f/e1/f59fe1a61ac1aff705d0ce0aa4be4ab3.jpg}',
    values: [
      'Respect',
      'Integrity',
      'Accountability',
      'Growth Mindset',
      'Customer Obsession'
    ],
    principles: [
      'Growth Mindset',
      'Customer Obsession',
      'Diversity and Inclusion',
      'One Microsoft',
      'Making a Difference'
    ]
  }
];

// System Design Questions for each company
const systemDesignQuestions = {
  meta: [
    {
      title: "Design Meta's News Feed",
      description: "Design a personalized, real-time content aggregation and ranking system for billions of users that can handle posts, photos, videos, and ads while ensuring relevance and engagement.",
      difficulty: "HARD",
      requirements: "Support billions of users, real-time updates, personalized ranking, handle multimedia content, integrate ads, support likes/comments/shares, ensure low latency (<200ms), handle viral content spikes",
      architecture: "Microservices architecture with feed generation service, ranking service, content delivery network, real-time notification system, and distributed caching layers",
      components: "User Service, Post Service, Feed Generation Service (fan-out/fan-in), Ranking Engine (ML-based), Media Processing Service, Notification Service, Analytics Service, Ad Service",
      dataModel: "User profiles (graph database), Posts (NoSQL), Social connections (graph database), Feed cache (Redis), Media metadata (SQL), Analytics events (time-series)",
      scalability: "Horizontal scaling with sharding, CDN for media delivery, caching at multiple layers, async processing for non-critical operations, load balancing across regions",
      tradeoffs: "Feed freshness vs computational cost, consistency vs availability, personalization vs privacy, storage cost vs query performance",
      references: ["https://engineering.fb.com/2013/03/20/core-data/tao-the-power-of-the-graph/", "https://engineering.fb.com/2016/03/25/core-data/realtime-data-infrastructure-at-facebook/"],
      videoLinks: ["https://www.youtube.com/watch?v=QmX2NPkJTKg"],
      blogPosts: ["https://engineering.fb.com/2013/03/20/core-data/tao-the-power-of-the-graph/"],
      tags: ["social-media", "real-time", "personalization", "scale", "ml-ranking"],
      estimatedTime: 45
    },
    {
      title: "Design Messenger Real-time Chat",
      description: "Design a scalable, low-latency messaging system supporting 1:1 and group chats, with features like presence, typing indicators, message delivery receipts, and multimedia sharing.",
      difficulty: "HARD",
      requirements: "Support billions of users, real-time messaging, group chats (up to 250 members), presence indicators, typing indicators, message delivery receipts, multimedia sharing, end-to-end encryption, offline message delivery",
      architecture: "WebSocket-based real-time communication, message queuing system, distributed storage, presence service, push notification service, media processing pipeline",
      components: "Connection Manager, Message Router, Presence Service, Message Storage, Media Service, Push Notification Service, Encryption Service, User Service",
      dataModel: "Messages (time-series database), User presence (in-memory cache), Chat metadata (SQL), Media files (object storage), Encryption keys (secure storage)",
      scalability: "Connection pooling, message sharding by chat ID, regional deployment, async message processing, CDN for media delivery",
      tradeoffs: "Message delivery guarantees vs performance, encryption vs searchability, real-time vs battery life, storage cost vs message retention",
      references: ["https://engineering.fb.com/2011/12/12/core-data/the-underlying-technology-of-messages/"],
      videoLinks: [],
      blogPosts: ["https://engineering.fb.com/2011/12/12/core-data/the-underlying-technology-of-messages/"],
      tags: ["messaging", "real-time", "websockets", "encryption", "presence"],
      estimatedTime: 45
    },
    {
      title: "Design Instagram Photo/Video Sharing",
      description: "Design a global photo and video sharing platform that handles uploads, processing, storage, and delivery of multimedia content with social features like likes, comments, and followers.",
      difficulty: "HARD",
      requirements: "Handle millions of uploads daily, support photos and videos, image/video processing, global content delivery, social interactions, stories feature, real-time notifications, content discovery",
      architecture: "Upload service, media processing pipeline, CDN for delivery, social graph service, recommendation engine, notification system",
      components: "Upload Service, Media Processing Service, Storage Service, CDN, Social Graph Service, Feed Service, Recommendation Engine, Notification Service, Search Service",
      dataModel: "Media metadata (SQL), Media files (object storage), Social graph (graph database), User interactions (NoSQL), Search index (Elasticsearch)",
      scalability: "Async media processing, CDN edge locations, database sharding, caching layers, load balancing, auto-scaling",
      tradeoffs: "Upload speed vs processing quality, storage cost vs multiple resolutions, real-time vs eventual consistency, content moderation vs user experience",
      references: ["https://instagram-engineering.com/what-powers-instagram-hundreds-of-instances-dozens-of-technologies-adf2e22da2ad"],
      videoLinks: [],
      blogPosts: ["https://instagram-engineering.com/what-powers-instagram-hundreds-of-instances-dozens-of-technologies-adf2e22da2ad"],
      tags: ["media-sharing", "image-processing", "cdn", "social-features", "mobile"],
      estimatedTime: 45
    }
  ],
  google: [
    {
      title: "Design Google Search",
      description: "Design a web search engine that can crawl billions of web pages, index content, and return relevant search results with extremely low latency for billions of queries daily.",
      difficulty: "HARD",
      requirements: "Crawl billions of web pages, build searchable index, handle billions of queries daily, sub-second response time, relevance ranking, handle different content types, real-time updates",
      architecture: "Distributed web crawlers, indexing pipeline, distributed search infrastructure, ranking algorithms, caching layers, load balancing",
      components: "Web Crawlers, URL Frontier, Content Parser, Indexing Service, Search Service, Ranking Service, Cache Layer, Load Balancer, Analytics Service",
      dataModel: "Web pages (distributed storage), Inverted index (distributed), PageRank scores (graph processing), Query logs (analytics), Cache (in-memory)",
      scalability: "Distributed crawling, sharded indexing, parallel query processing, geographic distribution, auto-scaling based on query load",
      tradeoffs: "Index freshness vs crawl cost, query latency vs result quality, storage cost vs index completeness, personalization vs privacy",
      references: ["https://research.google/pubs/pub334/", "https://research.google/pubs/pub38331/"],
      videoLinks: [],
      blogPosts: ["https://blog.google/products/search/how-google-search-works/"],
      tags: ["search-engine", "web-crawling", "indexing", "ranking", "distributed-systems"],
      estimatedTime: 60
    },
    {
      title: "Design YouTube Video Streaming",
      description: "Design a global video streaming platform that handles video uploads, transcoding, storage, and delivery with features like recommendations, comments, and live streaming.",
      difficulty: "HARD",
      requirements: "Handle millions of video uploads, multiple video qualities, global streaming, recommendation system, comments and interactions, live streaming, content moderation, monetization",
      architecture: "Upload service, video processing pipeline, CDN for streaming, recommendation engine, real-time chat for live streams, content moderation system",
      components: "Upload Service, Video Processing Service, CDN, Recommendation Engine, Comment Service, Live Streaming Service, Content Moderation, Analytics Service, Ad Service",
      dataModel: "Video metadata (SQL), Video files (object storage), User interactions (NoSQL), Recommendations (ML models), Comments (time-series), Analytics (data warehouse)",
      scalability: "Async video processing, global CDN, adaptive bitrate streaming, database sharding, caching, auto-scaling",
      tradeoffs: "Video quality vs storage cost, processing time vs availability, recommendation accuracy vs diversity, content moderation vs user freedom",
      references: ["https://blog.youtube/inside-youtube/"],
      videoLinks: [],
      blogPosts: ["https://blog.youtube/inside-youtube/"],
      tags: ["video-streaming", "cdn", "transcoding", "recommendations", "live-streaming"],
      estimatedTime: 50
    },
    {
      title: "Design Google Maps",
      description: "Design a global mapping service that provides real-time navigation, location search, traffic information, and route optimization for millions of users worldwide.",
      difficulty: "HARD",
      requirements: "Global map data, real-time navigation, traffic information, location search, route optimization, offline maps, multiple transportation modes, business listings",
      architecture: "Geospatial databases, tile rendering service, routing algorithms, real-time traffic processing, location search service, offline sync",
      components: "Map Data Service, Tile Rendering Service, Routing Service, Traffic Service, Location Search Service, Offline Sync Service, Business Listings Service",
      dataModel: "Map tiles (distributed storage), Road networks (graph database), Traffic data (time-series), Business data (search index), User locations (geospatial)",
      scalability: "Tile caching, geographic sharding, real-time traffic aggregation, distributed routing computation, CDN for map tiles",
      tradeoffs: "Map accuracy vs update frequency, routing speed vs optimality, offline storage vs freshness, privacy vs personalization",
      references: ["https://blog.google/products/maps/"],
      videoLinks: [],
      blogPosts: ["https://blog.google/products/maps/"],
      tags: ["mapping", "geospatial", "routing", "real-time", "mobile"],
      estimatedTime: 50
    }
  ],
  amazon: [
    {
      title: "Design Amazon E-commerce Product Page",
      description: "Design a highly scalable product page system that displays product information, images, reviews, recommendations, and handles high traffic with low latency during peak shopping events.",
      difficulty: "MEDIUM",
      requirements: "Handle millions of products, high availability during peak traffic, fast page load times, product recommendations, customer reviews, inventory updates, price changes, A/B testing",
      architecture: "Microservices for different page components, CDN for static content, caching layers, recommendation service, review service, inventory service",
      components: "Product Service, Review Service, Recommendation Service, Inventory Service, Pricing Service, Image Service, Search Service, A/B Testing Service",
      dataModel: "Product catalog (NoSQL), Reviews (document store), Inventory (SQL with strong consistency), Pricing (cache + database), Images (object storage)",
      scalability: "CDN for images, multi-level caching, database read replicas, async review processing, geographic distribution",
      tradeoffs: "Data consistency vs page load speed, personalization vs caching efficiency, real-time inventory vs performance",
      references: ["https://aws.amazon.com/solutions/case-studies/amazon/"],
      videoLinks: [],
      blogPosts: [],
      tags: ["e-commerce", "product-catalog", "recommendations", "high-traffic", "caching"],
      estimatedTime: 40
    },
    {
      title: "Design Amazon Order Processing System",
      description: "Design a reliable order processing system that handles order creation, payment processing, inventory updates, and fulfillment coordination while ensuring data consistency and handling failures gracefully.",
      difficulty: "HARD",
      requirements: "Process millions of orders, ensure payment consistency, coordinate with inventory, handle order modifications, support multiple payment methods, integrate with fulfillment centers, handle failures gracefully",
      architecture: "Event-driven architecture, saga pattern for distributed transactions, message queues for async processing, payment gateway integration, inventory coordination",
      components: "Order Service, Payment Service, Inventory Service, Fulfillment Service, Notification Service, Fraud Detection Service, Order Tracking Service",
      dataModel: "Orders (SQL with ACID), Payments (secure storage), Inventory (strong consistency), Order events (event store), Tracking (time-series)",
      scalability: "Database sharding by customer, async processing, event sourcing, circuit breakers, retry mechanisms",
      tradeoffs: "Consistency vs availability, processing speed vs reliability, order modification flexibility vs complexity",
      references: ["https://aws.amazon.com/microservices/"],
      videoLinks: [],
      blogPosts: [],
      tags: ["order-processing", "payments", "distributed-transactions", "event-driven", "reliability"],
      estimatedTime: 50
    },
    {
      title: "Design Amazon Recommendation System",
      description: "Design a recommendation system that provides personalized product recommendations based on user behavior, purchase history, and collaborative filtering while handling real-time updates and A/B testing.",
      difficulty: "HARD",
      requirements: "Personalized recommendations, real-time updates, collaborative filtering, content-based filtering, A/B testing, handle cold start problem, scalable to millions of users and products",
      architecture: "ML pipeline for model training, real-time inference service, feature store, A/B testing framework, data processing pipeline",
      components: "Data Collection Service, Feature Engineering Service, Model Training Service, Inference Service, A/B Testing Service, Analytics Service",
      dataModel: "User behavior (event stream), Product features (feature store), Models (ML model store), Recommendations (cache), A/B test results (analytics)",
      scalability: "Distributed model training, real-time feature computation, model serving at scale, batch and stream processing",
      tradeoffs: "Recommendation accuracy vs latency, personalization vs privacy, model complexity vs interpretability, real-time vs batch processing",
      references: ["https://www.amazon.science/publications/"],
      videoLinks: [],
      blogPosts: [],
      tags: ["machine-learning", "recommendations", "personalization", "real-time", "ab-testing"],
      estimatedTime: 45
    }
  ],
  apple: [
    {
      title: "Design Apple Music Streaming Service",
      description: "Design a music streaming service that provides high-quality audio streaming, personalized playlists, offline downloads, and seamless integration across Apple devices with strong privacy protection.",
      difficulty: "HARD",
      requirements: "High-quality audio streaming, personalized recommendations, offline downloads, cross-device sync, social features, artist content, radio stations, privacy protection, DRM",
      architecture: "Content delivery network, recommendation engine, sync service, DRM system, social features service, offline download management",
      components: "Streaming Service, Recommendation Engine, Sync Service, DRM Service, Social Service, Download Manager, Artist Portal, Radio Service",
      dataModel: "Music catalog (metadata database), User playlists (sync database), Listening history (analytics), Downloaded content (local + cloud), Social data (privacy-focused)",
      scalability: "Global CDN, edge caching, distributed sync, recommendation model serving, offline-first design",
      tradeoffs: "Audio quality vs bandwidth, personalization vs privacy, offline storage vs device space, social features vs privacy",
      references: ["https://developer.apple.com/apple-music/"],
      videoLinks: [],
      blogPosts: [],
      tags: ["music-streaming", "cdn", "offline-sync", "privacy", "drm"],
      estimatedTime: 45
    },
    {
      title: "Design iCloud Photo Library",
      description: "Design a secure photo and video storage and synchronization service that works across all Apple devices while maintaining user privacy and providing intelligent organization features.",
      difficulty: "HARD",
      requirements: "Cross-device sync, end-to-end encryption, intelligent photo organization, face recognition, search capabilities, shared albums, storage optimization, privacy protection",
      architecture: "Encrypted cloud storage, sync engine, on-device ML processing, secure sharing service, backup and restore system",
      components: "Storage Service, Sync Engine, ML Processing Service, Search Service, Sharing Service, Backup Service, Privacy Service",
      dataModel: "Encrypted photo storage, sync metadata, on-device ML models, search index (privacy-preserving), sharing permissions",
      scalability: "Distributed storage, efficient sync algorithms, on-device processing, incremental backups, conflict resolution",
      tradeoffs: "Privacy vs cloud features, sync speed vs battery life, storage efficiency vs quality, on-device vs cloud processing",
      references: ["https://support.apple.com/en-us/HT204264"],
      videoLinks: [],
      blogPosts: [],
      tags: ["photo-storage", "sync", "privacy", "encryption", "on-device-ml"],
      estimatedTime: 45
    },
    {
      title: "Design Find My Network",
      description: "Design a crowdsourced device location network that can find lost Apple devices using other Apple devices while maintaining complete user privacy and security.",
      difficulty: "HARD",
      requirements: "Crowdsourced location finding, complete privacy protection, works offline, global coverage, secure communication, battery efficient, works with AirTags and devices",
      architecture: "Bluetooth Low Energy mesh network, end-to-end encryption, anonymous location reporting, secure key exchange, distributed location database",
      components: "BLE Discovery Service, Encryption Service, Location Aggregation Service, Key Management Service, Privacy Service, Device Registration Service",
      dataModel: "Encrypted location reports, rotating device identifiers, public key infrastructure, anonymous location database",
      scalability: "Distributed key management, efficient BLE protocols, global location aggregation, privacy-preserving analytics",
      tradeoffs: "Location accuracy vs privacy, battery life vs discovery frequency, network coverage vs privacy, security vs usability",
      references: ["https://www.apple.com/newsroom/2019/06/apple-previews-ios-13/"],
      videoLinks: [],
      blogPosts: [],
      tags: ["ble-network", "privacy", "crowdsourced", "encryption", "offline"],
      estimatedTime: 50
    }
  ],
  microsoft: [
    {
      title: "Design Microsoft Teams",
      description: "Design a comprehensive collaboration platform that supports chat, video conferencing, file sharing, and integration with Office 365 while ensuring enterprise-grade security and compliance.",
      difficulty: "HARD",
      requirements: "Real-time messaging, video conferencing, file sharing, Office 365 integration, enterprise security, compliance features, mobile support, third-party integrations",
      architecture: "Microservices architecture, real-time communication service, file storage service, identity management, compliance service, integration platform",
      components: "Chat Service, Video Service, File Service, Identity Service, Compliance Service, Integration Service, Notification Service, Search Service",
      dataModel: "Messages (time-series), Files (object storage), User identity (Active Directory), Compliance logs (audit database), Integration data (API gateway)",
      scalability: "Global deployment, auto-scaling, load balancing, CDN for file delivery, database sharding, caching layers",
      tradeoffs: "Feature richness vs performance, security vs usability, real-time vs reliability, integration complexity vs simplicity",
      references: ["https://docs.microsoft.com/en-us/microsoftteams/"],
      videoLinks: [],
      blogPosts: [],
      tags: ["collaboration", "video-conferencing", "enterprise", "integration", "compliance"],
      estimatedTime: 45
    },
    {
      title: "Design OneDrive Cloud Storage",
      description: "Design a cloud file storage and synchronization service that works across multiple platforms, supports real-time collaboration, and provides enterprise-grade security and compliance features.",
      difficulty: "MEDIUM",
      requirements: "Cross-platform sync, real-time collaboration, version control, sharing and permissions, enterprise security, compliance, offline access, large file support",
      architecture: "Distributed file storage, sync engine, collaboration service, permission management, version control system, security service",
      components: "Storage Service, Sync Engine, Collaboration Service, Permission Service, Version Control Service, Security Service, Search Service",
      dataModel: "File storage (distributed), Sync metadata (database), Permissions (identity service), Versions (version store), Collaboration state (real-time database)",
      scalability: "Distributed storage, efficient sync algorithms, conflict resolution, global CDN, auto-scaling, caching",
      tradeoffs: "Sync speed vs consistency, storage cost vs redundancy, collaboration features vs complexity, security vs accessibility",
      references: ["https://docs.microsoft.com/en-us/onedrive/"],
      videoLinks: [],
      blogPosts: [],
      tags: ["cloud-storage", "file-sync", "collaboration", "enterprise", "cross-platform"],
      estimatedTime: 40
    },
    {
      title: "Design Azure CDN",
      description: "Design a global content delivery network that can cache and deliver static and dynamic content from edge locations worldwide while providing analytics, security, and cost optimization.",
      difficulty: "MEDIUM",
      requirements: "Global edge locations, static and dynamic content caching, SSL/TLS termination, DDoS protection, real-time analytics, cost optimization, API management",
      architecture: "Global edge network, origin shield, caching layers, security service, analytics pipeline, cost optimization service",
      components: "Edge Servers, Origin Shield, Cache Management, Security Service, Analytics Service, Cost Optimization Service, API Gateway",
      dataModel: "Cached content (distributed storage), Cache metadata (database), Analytics data (time-series), Security logs (audit database), Cost data (analytics)",
      scalability: "Global edge deployment, intelligent caching, auto-scaling, load balancing, efficient cache invalidation",
      tradeoffs: "Cache hit ratio vs storage cost, security vs performance, global coverage vs cost, real-time analytics vs processing cost",
      references: ["https://docs.microsoft.com/en-us/azure/cdn/"],
      videoLinks: [],
      blogPosts: [],
      tags: ["cdn", "edge-computing", "caching", "global-distribution", "security"],
      estimatedTime: 40
    }
  ]
};

// Company strategies based on research
const companyStrategies = {
  meta: [
    {
      type: "INTERVIEW_APPROACH",
      title: "Meta EM Interview Strategy",
      description: "Comprehensive approach to Meta's Engineering Manager interview process",
      content: "Meta's EM interview process emphasizes authenticity, technical expertise, and cultural alignment. The process typically includes leadership interviews, system design, coding, and cultural fit assessments. Success requires demonstrating impact, ownership, and alignment with Meta's values of moving fast and focusing on long-term impact.",
      keyPoints: [
        "Emphasize authenticity over rehearsed answers",
        "Demonstrate technical depth in system design",
        "Show impact and ownership in past roles",
        "Align with Meta's values: Move Fast, Focus on Impact, Build Great Products",
        "Prepare for deep technical discussions about past projects"
      ],
      examples: [
        "Share real experiences including failures and learnings",
        "Quantify achievements with specific metrics",
        "Discuss technical decisions and their business impact",
        "Show how you've driven initiatives beyond your direct responsibilities"
      ],
      tips: [
        "Use STAR method for behavioral questions",
        "Practice system design for social media scale",
        "Prepare technical deep-dives on past projects",
        "Research Meta's engineering blog and recent products"
      ]
    },
    {
      type: "PERSUASION_FRAMEWORK",
      title: "Meta Persuasion Framework",
      description: "Strategic framework for presenting yourself effectively in Meta interviews",
      content: "Meta values leaders who can drive impact at scale, build strong teams, and navigate ambiguity. The persuasion framework focuses on demonstrating technical judgment, leadership impact, and cultural alignment through compelling storytelling and data-driven examples.",
      keyPoints: [
        "Lead with impact and quantifiable results",
        "Demonstrate technical judgment in complex situations",
        "Show ability to build and scale high-performing teams",
        "Exhibit comfort with ambiguity and rapid change",
        "Align personal values with Meta's mission"
      ],
      examples: [
        "Led team through major technical migration affecting millions of users",
        "Built new team from scratch and delivered critical product feature",
        "Made difficult technical decisions under tight deadlines",
        "Drove cross-functional initiatives with measurable business impact"
      ],
      tips: [
        "Frame challenges as opportunities for innovation",
        "Emphasize learning and adaptation from setbacks",
        "Show progression in leadership responsibilities",
        "Connect technical decisions to user and business outcomes"
      ]
    }
  ],
  google: [
    {
      type: "INTERVIEW_APPROACH", 
      title: "Google EM Interview Strategy",
      description: "Comprehensive approach to Google's Engineering Manager interview process",
      content: "Google's EM interviews assess four key attributes: General Cognitive Ability, Role-Related Knowledge, Leadership, and Googleyness. The process emphasizes structured problem-solving, collaborative leadership, and cultural fit. Success requires demonstrating technical depth, leadership impact, and alignment with Google's values.",
      keyPoints: [
        "Demonstrate General Cognitive Ability through structured problem-solving",
        "Show Role-Related Knowledge with specific technical examples",
        "Exhibit Leadership through team building and project management",
        "Display Googleyness through collaboration and bias for action",
        "Use data-driven decision making and quantified results"
      ],
      examples: [
        "Solved complex technical problems with innovative approaches",
        "Led cross-functional teams to deliver ambitious projects",
        "Made data-driven decisions that improved team productivity",
        "Collaborated across organizational boundaries to achieve goals"
      ],
      tips: [
        "Ask clarifying questions to show analytical thinking",
        "Use STAR method for behavioral responses",
        "Practice system design for Google-scale problems",
        "Prepare examples of learning from failures"
      ]
    }
  ],
  amazon: [
    {
      type: "INTERVIEW_APPROACH",
      title: "Amazon EM Interview Strategy", 
      description: "Comprehensive approach to Amazon's Engineering Manager interview process",
      content: "Amazon's EM interviews are heavily focused on the 16 Leadership Principles. The process includes behavioral interviews, technical assessments, and the critical Bar Raiser interview. Success requires demonstrating strong alignment with Amazon's principles through specific, quantified examples using the STAR method.",
      keyPoints: [
        "Master all 16 Leadership Principles with specific examples",
        "Use STAR method for all behavioral questions",
        "Prepare for the Bar Raiser interview with exceptional examples",
        "Demonstrate customer obsession in all responses",
        "Show ownership and bias for action in challenging situations"
      ],
      examples: [
        "Customer Obsession: Redesigned product based on customer feedback",
        "Ownership: Took responsibility for team's missed deadline and recovery plan",
        "Bias for Action: Made critical decision with incomplete information",
        "Deliver Results: Led team to exceed quarterly goals despite obstacles"
      ],
      tips: [
        "Prepare multiple examples for each Leadership Principle",
        "Focus on individual contributions using 'I' statements",
        "Quantify results and business impact",
        "Practice deep-dive follow-up questions"
      ]
    }
  ],
  apple: [
    {
      type: "INTERVIEW_APPROACH",
      title: "Apple EM Interview Strategy",
      description: "Comprehensive approach to Apple's Engineering Manager interview process", 
      content: "Apple's EM interviews are highly variable and team-specific, emphasizing cultural fit, passion for Apple products, and technical excellence. The process focuses on innovation, attention to detail, and alignment with Apple's values of privacy, quality, and user experience.",
      keyPoints: [
        "Demonstrate genuine passion for Apple products and mission",
        "Show attention to detail and commitment to quality",
        "Emphasize user experience in technical decisions",
        "Highlight innovation and creative problem-solving",
        "Align with Apple's privacy and security values"
      ],
      examples: [
        "Led product development with focus on user experience",
        "Implemented privacy-by-design in technical architecture",
        "Drove innovation in team processes or technical solutions",
        "Made quality-focused decisions despite time pressure"
      ],
      tips: [
        "Research the specific team and their products",
        "Articulate compelling 'Why Apple?' narrative",
        "Prepare for variable interview formats",
        "Show deep technical knowledge in relevant areas"
      ]
    }
  ],
  microsoft: [
    {
      type: "INTERVIEW_APPROACH",
      title: "Microsoft EM Interview Strategy",
      description: "Comprehensive approach to Microsoft's Engineering Manager interview process",
      content: "Microsoft's EM interviews emphasize growth mindset, collaboration, and customer obsession. The process includes behavioral interviews, technical assessments, and the 'As Appropriate' final round. Success requires demonstrating learning from failures, inclusive leadership, and alignment with Microsoft's cultural transformation.",
      keyPoints: [
        "Demonstrate growth mindset through learning from failures",
        "Show inclusive leadership and collaboration skills",
        "Exhibit customer obsession and business impact focus",
        "Display technical depth relevant to the role",
        "Align with Microsoft's cultural values and transformation"
      ],
      examples: [
        "Led team through significant change with growth mindset",
        "Built inclusive team culture that improved performance",
        "Made customer-focused decisions that drove business results",
        "Learned from failure and applied lessons to future success"
      ],
      tips: [
        "Prepare stories showing learning and adaptation",
        "Emphasize collaboration and inclusive leadership",
        "Research Microsoft's cultural transformation",
        "Practice system design for enterprise-scale problems"
      ]
    }
  ]
};

// Company FAQs based on research
const companyFAQs = {
  meta: [
    {
      question: "What is the typical Meta EM interview process timeline?",
      answer: "The Meta EM interview process typically spans 4-8 weeks from initial application to final decision. This includes resume screening (1 week), recruiter phone screen (1 week), initial technical & leadership interview (1 week), onsite loop scheduling and completion (2-3 weeks), and hiring committee decision (1-2 weeks). Timeline can vary based on scheduling availability and role urgency.",
      category: "Process",
      tags: ["timeline", "process", "expectations"]
    },
    {
      question: "What types of technical questions should I expect for a Meta EM role?",
      answer: "Meta EM technical assessments include: 1) Coding questions (LeetCode easy to medium, focusing on data structures and algorithms), 2) System design (designing scalable systems like social media feeds, messaging platforms, or content delivery), and 3) Technical deep-dives on past projects focusing on architecture decisions, trade-offs, and impact. Expect questions about handling scale, reliability, and performance at Meta's level.",
      category: "Technical",
      tags: ["coding", "system-design", "technical-depth"]
    },
    {
      question: "How should I prepare for Meta's behavioral interviews?",
      answer: "Meta behavioral interviews focus on authenticity and cultural alignment. Prepare STAR stories demonstrating: leadership and team building, conflict resolution, performance management, cross-functional collaboration, handling ambiguity, and driving impact. Align stories with Meta's values: Move Fast, Focus on Long-Term Impact, Build Awesome Things, Live in the Future, Be Direct and Respect Colleagues. Avoid overly rehearsed answers; Meta values genuine experiences including failures and learnings.",
      category: "Behavioral",
      tags: ["behavioral", "leadership", "culture-fit", "star-method"]
    },
    {
      question: "What makes Meta's interview process unique compared to other tech companies?",
      answer: "Meta's process emphasizes: 1) Authenticity over polished answers - interviewers are trained to identify genuine responses, 2) Strong focus on impact and ownership beyond direct responsibilities, 3) Technical depth combined with leadership assessment, 4) Cultural alignment with Meta's specific values and mission, 5) Emphasis on handling ambiguity and rapid change typical in Meta's environment. The process balances technical rigor with cultural fit assessment.",
      category: "Process",
      tags: ["unique-aspects", "culture", "authenticity", "impact"]
    }
  ],
  google: [
    {
      question: "What are the four core attributes Google assesses in EM interviews?",
      answer: "Google evaluates EM candidates on four primary attributes: 1) General Cognitive Ability (GCA) - problem-solving skills, learning ability, and navigating ambiguity, 2) Role-Related Knowledge and Experience (RRK) - technical expertise and EM-specific skills, 3) Leadership - ability to lead, influence, and develop teams, including 'emergent leadership', 4) Googleyness - cultural fit including comfort with ambiguity, bias for action, collaborative nature, and respect for diversity.",
      category: "Process",
      tags: ["attributes", "evaluation-criteria", "googleyness"]
    },
    {
      question: "How long does the Google EM interview process typically take?",
      answer: "The Google EM interview process generally takes 1-3 months total: Resume review (1-2 weeks), recruiter screening (1 week), technical phone screen (1-2 weeks), onsite interviews (1-2 weeks), and hiring committee review and decision (1-2 weeks). The hiring committee plays a crucial role and reviews all feedback against the four core attributes before making a decision.",
      category: "Process", 
      tags: ["timeline", "hiring-committee", "process"]
    },
    {
      question: "What is 'Googleyness' and how do I demonstrate it?",
      answer: "Googleyness encompasses cultural fit traits including: comfort with ambiguity, bias for action, collaborative spirit, intellectual humility, and respect for diversity. Demonstrate it through: examples of thriving in ambiguous situations, taking initiative without being asked, collaborating effectively across teams, learning from others and admitting when you don't know something, and fostering inclusive environments. Avoid appearing to have all the answers; show curiosity and willingness to learn.",
      category: "Culture",
      tags: ["googleyness", "culture-fit", "collaboration", "ambiguity"]
    },
    {
      question: "How should I approach Google's system design interviews?",
      answer: "Google system design interviews focus on scalability, reliability, and trade-offs. Approach: 1) Clarify requirements (functional and non-functional), 2) Propose high-level architecture, 3) Deep-dive into components, 4) Discuss scalability and fault tolerance, 5) Analyze trade-offs clearly. Focus on Google-scale problems (billions of users), emphasize reliability and performance, and engage collaboratively with the interviewer. Practice problems like designing search engines, video platforms, or distributed systems.",
      category: "Technical",
      tags: ["system-design", "scalability", "reliability", "trade-offs"]
    }
  ],
  amazon: [
    {
      question: "What is the Amazon Bar Raiser and how should I prepare?",
      answer: "The Bar Raiser is an objective interviewer from outside the hiring team, specially trained to ensure candidates meet Amazon's high hiring standards and embody the Leadership Principles. They have significant influence, including veto power, over hiring decisions. Prepare by: mastering all 16 Leadership Principles with multiple specific examples, using STAR method for responses, focusing on individual contributions ('I' statements), and preparing for deep-dive follow-up questions. The Bar Raiser assesses long-term potential and cultural fit.",
      category: "Process",
      tags: ["bar-raiser", "leadership-principles", "cultural-fit"]
    },
    {
      question: "How do I effectively use Amazon's Leadership Principles in interviews?",
      answer: "Master all 16 Leadership Principles with specific examples: 1) Prepare multiple STAR stories for each principle, 2) Use 'I' statements to highlight individual contributions, 3) Quantify results and business impact, 4) Be ready for follow-up questions that 'Dive Deep', 5) Connect principles to the specific role and team. Key principles for EMs: Customer Obsession, Ownership, Hire and Develop the Best, Deliver Results, Earn Trust. Practice weaving principles naturally into responses rather than forcing them.",
      category: "Behavioral",
      tags: ["leadership-principles", "star-method", "behavioral-questions"]
    },
    {
      question: "What technical depth is expected for Amazon EM roles?",
      answer: "Amazon EM technical assessments include: 1) System design focusing on scalability, availability, and cost-effectiveness (often using AWS services), 2) Technical deep-dives on past projects emphasizing architectural decisions and trade-offs, 3) Occasional coding questions (less emphasis than SDE roles), 4) Understanding of microservices, event-driven architectures, and distributed systems. Emphasize operational excellence, monitoring, and how you'd handle failures. Connect technical decisions to business impact and customer value.",
      category: "Technical", 
      tags: ["system-design", "aws", "technical-depth", "operational-excellence"]
    },
    {
      question: "How long does the Amazon EM interview process take?",
      answer: "The Amazon EM interview process typically ranges from a few weeks to two months. It includes: application and resume screen, phone screens (1-2 rounds with technical and behavioral focus), 'The Loop' onsite/virtual interviews (4-6 interviews over 1-2 days), and debrief/decision phase. The Loop includes the critical Bar Raiser interview. Timeline varies by team urgency and candidate availability, but the process is generally efficient once the Loop is scheduled.",
      category: "Process",
      tags: ["timeline", "the-loop", "process-stages"]
    }
  ],
  apple: [
    {
      question: "Why is Apple's EM interview process considered unpredictable?",
      answer: "Apple's interview process is highly decentralized and team-specific. Each team acts like a 'startup' within Apple, creating their own interview questions and evaluation criteria. There's less standardization compared to other FAANG companies. Interviewers (often senior engineers/managers) may not have formal interview training and might craft questions ad hoc. Some rounds might be cut short if a candidate isn't meeting the bar. This variability makes preparation challenging but emphasizes the importance of flexibility and strong fundamentals.",
      category: "Process",
      tags: ["variability", "decentralized", "team-specific", "unpredictable"]
    },
    {
      question: "How important is passion for Apple products in the interview?",
      answer: "Passion for Apple products and understanding their design philosophy is crucial. Apple looks for genuine enthusiasm, not just generic praise. Prepare a compelling 'Why Apple?' narrative that references specific products, initiatives, or values that resonate with your experience and career goals. Demonstrate familiarity with Apple's ecosystem, recent product launches, and design principles. Show how your technical decisions align with Apple's focus on user experience, privacy, and quality.",
      category: "Culture",
      tags: ["passion", "why-apple", "product-knowledge", "design-philosophy"]
    },
    {
      question: "What technical areas should I focus on for Apple EM interviews?",
      answer: "Apple technical interviews can range from LeetCode-style problems to domain-specific challenges relevant to the team's work (iOS, macOS, cloud services, hardware). Focus areas include: concurrency and performance optimization, privacy and security implementation, system design for Apple's ecosystem, understanding of Apple's development tools and frameworks, and deep knowledge in your specific domain. Prepare for both breadth and depth, as questions can be very deep in specific technical areas.",
      category: "Technical",
      tags: ["technical-breadth", "domain-specific", "privacy", "security", "performance"]
    },
    {
      question: "How should I prepare for Apple's variable interview format?",
      answer: "Prepare for flexibility: 1) Research the specific team, their products, and recent challenges, 2) Master fundamentals across multiple technical areas, 3) Prepare diverse examples of leadership, innovation, and problem-solving, 4) Practice articulating your 'Why Apple?' story authentically, 5) Be ready for unexpected questions or formats, 6) Focus on demonstrating alignment with Apple's values (innovation, privacy, quality, user experience), 7) Prepare questions that show genuine interest in the team's specific mission and challenges.",
      category: "Preparation",
      tags: ["flexibility", "team-research", "fundamentals", "preparation-strategy"]
    }
  ],
  microsoft: [
    {
      question: "What is Microsoft's 'As Appropriate' (AA) interview?",
      answer: "The 'As Appropriate' (AA) interview is a distinctive final round typically conducted by a hiring manager or senior leader. It serves as either: 1) A final assessment if there are remaining concerns from previous rounds, or 2) A 'sell' conversation if previous rounds went well and they want to convince you to join. The AA interview often focuses on growth mindset, cultural fit, and strategic thinking. Prepare for both scenarios - be ready to address any concerns while also asking thoughtful questions about the role and team.",
      category: "Process",
      tags: ["as-appropriate", "final-round", "hiring-manager", "cultural-fit"]
    },
    {
      question: "How important is demonstrating 'Growth Mindset' in Microsoft interviews?",
      answer: "Growth mindset is central to Microsoft's culture and interview evaluation. Demonstrate it by: 1) Sharing authentic examples of learning from failures and mistakes, 2) Showing how you've adapted to significant changes, 3) Describing how you've helped team members grow and develop, 4) Explaining how you seek and apply feedback, 5) Discussing how you approach challenges as learning opportunities. Avoid appearing to have all the answers; show curiosity, self-awareness, and commitment to continuous learning.",
      category: "Culture",
      tags: ["growth-mindset", "learning", "adaptation", "feedback", "development"]
    },
    {
      question: "What technical expectations exist for Microsoft EM roles?",
      answer: "Microsoft EM technical assessments include: 1) System design focusing on scalable, reliable enterprise systems (often leveraging Azure services), 2) Understanding of microservices, cloud architectures, and distributed systems, 3) Occasional coding questions on fundamental data structures and algorithms, 4) Technical leadership scenarios and architecture decision-making, 5) Integration and interoperability considerations within Microsoft's ecosystem. Emphasize enterprise requirements like security, compliance, and cost optimization.",
      category: "Technical",
      tags: ["system-design", "azure", "enterprise", "cloud-architecture", "technical-leadership"]
    },
    {
      question: "How long does the Microsoft EM interview process typically take?",
      answer: "The Microsoft EM interview process typically spans 3-8 weeks: Resume screening, recruiter phone screen (30-45 mins), first-round interviews (1-2 calls, 45-60 mins each), onsite/virtual loop (4-6 rounds, 45-60 mins each), and potentially the 'As Appropriate' final interview. The timeline depends on scheduling availability and team urgency. The process is generally well-structured with clear communication about next steps and expectations.",
      category: "Process", 
      tags: ["timeline", "process-stages", "structured-process"]
    }
  ]
};

async function populateCompanies() {
  console.log('🏢 Populating companies...');
  
  for (const companyData of companies) {
    try {
      const company = await prisma.company.upsert({
        where: { slug: companyData.slug },
        update: companyData,
        create: companyData
      });
      console.log(`✅ Created/updated company: ${company.name}`);
    } catch (error) {
      console.error(`❌ Error creating company ${companyData.name}:`, error);
    }
  }
}

async function populateSystemDesignQuestions() {
  console.log('🔧 Populating system design questions...');
  
  for (const [companySlug, questions] of Object.entries(systemDesignQuestions)) {
    const company = await prisma.company.findUnique({
      where: { slug: companySlug }
    });
    
    if (!company) {
      console.error(`❌ Company not found: ${companySlug}`);
      continue;
    }
    
    for (const [index, questionData] of questions.entries()) {
      try {
        const question = await prisma.systemDesignQuestion.upsert({
          where: { 
            id: `${companySlug}-${questionData.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`
          },
          update: {
            ...questionData,
            companyId: company.id,
            order: index,
            isGeneral: false
          },
          create: {
            id: `${companySlug}-${questionData.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
            ...questionData,
            companyId: company.id,
            order: index,
            isGeneral: false
          }
        });
        console.log(`✅ Created/updated system design question: ${question.title}`);
      } catch (error) {
        console.error(`❌ Error creating system design question ${questionData.title}:`, error);
      }
    }
  }
}

async function populateCompanyStrategies() {
  console.log('📋 Populating company strategies...');
  
  for (const [companySlug, strategies] of Object.entries(companyStrategies)) {
    const company = await prisma.company.findUnique({
      where: { slug: companySlug }
    });
    
    if (!company) {
      console.error(`❌ Company not found: ${companySlug}`);
      continue;
    }
    
    for (const [index, strategyData] of strategies.entries()) {
      try {
        const strategy = await prisma.companyStrategy.upsert({
          where: {
            companyId_type: {
              companyId: company.id,
              type: strategyData.type
            }
          },
          update: {
            ...strategyData,
            order: index
          },
          create: {
            ...strategyData,
            companyId: company.id,
            order: index
          }
        });
        console.log(`✅ Created/updated strategy: ${strategy.title}`);
      } catch (error) {
        console.error(`❌ Error creating strategy ${strategyData.title}:`, error);
      }
    }
  }
}

async function populateCompanyFAQs() {
  console.log('❓ Populating company FAQs...');
  
  for (const [companySlug, faqs] of Object.entries(companyFAQs)) {
    const company = await prisma.company.findUnique({
      where: { slug: companySlug }
    });
    
    if (!company) {
      console.error(`❌ Company not found: ${companySlug}`);
      continue;
    }
    
    for (const [index, faqData] of faqs.entries()) {
      try {
        const faq = await prisma.companyFAQ.create({
          data: {
            ...faqData,
            companyId: company.id,
            order: index
          }
        });
        console.log(`✅ Created FAQ: ${faq.question.substring(0, 50)}...`);
      } catch (error) {
        console.error(`❌ Error creating FAQ:`, error);
      }
    }
  }
}

async function main() {
  try {
    console.log('🚀 Starting comprehensive content population...');
    
    await populateCompanies();
    await populateSystemDesignQuestions();
    await populateCompanyStrategies();
    await populateCompanyFAQs();
    
    console.log('✅ Comprehensive content population completed successfully!');
  } catch (error) {
    console.error('❌ Error during content population:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
