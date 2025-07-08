
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function seedTags() {
  console.log('Seeding tags...')

  // Create some sample tags
  const tags = [
    { name: 'Leadership', color: '#3B82F6' },
    { name: 'Technical Strategy', color: '#10B981' },
    { name: 'Problem Solving', color: '#F59E0B' },
    { name: 'Communication', color: '#EF4444' },
    { name: 'Innovation', color: '#8B5CF6' },
    { name: 'Project Management', color: '#06B6D4' },
    { name: 'Conflict Resolution', color: '#84CC16' },
    { name: 'Data Driven', color: '#F97316' },
    { name: 'Customer Focus', color: '#EC4899' },
    { name: 'Growth & Scale', color: '#6366F1' },
    { name: 'Crisis Management', color: '#EF4444' },
    { name: 'Cross-functional', color: '#10B981' },
    { name: 'Move Fast', color: '#3B82F6' },
    { name: 'Be Bold', color: '#F59E0B' },
    { name: 'Focus on Impact', color: '#8B5CF6' },
    { name: 'Customer Obsession', color: '#EC4899' },
    { name: 'Ownership', color: '#06B6D4' },
    { name: 'Invent and Simplify', color: '#84CC16' }
  ]

  for (const tag of tags) {
    await prisma.tag.upsert({
      where: { name: tag.name },
      update: {},
      create: tag
    })
  }

  // Create a sample story with tags
  const sampleStory = await prisma.story.upsert({
    where: { id: 'sample-story-1' },
    update: {},
    create: {
      id: 'sample-story-1',
      title: 'Led Cross-Functional Team Through System Migration',
      content: 'Successfully led a complex system migration project involving multiple teams and stakeholders.',
      situation: 'Our legacy payment system was causing frequent outages and couldn\'t handle the growing transaction volume. The system needed to be migrated to a new cloud-based architecture within 3 months to avoid major business impact.',
      task: 'As the technical lead, I was responsible for planning and executing the migration while ensuring zero downtime and maintaining data integrity. I needed to coordinate with 5 different teams across engineering, product, and operations.',
      action: 'I started by conducting a thorough analysis of the current system and dependencies. Created a detailed migration plan with rollback procedures. Set up weekly cross-functional meetings to track progress and address blockers. Implemented a phased migration approach, starting with non-critical components. Established comprehensive monitoring and alerting for the new system.',
      result: 'Successfully completed the migration 2 weeks ahead of schedule with zero downtime. The new system reduced transaction processing time by 60% and eliminated the previous outages. Received recognition from leadership and the approach became a template for future migrations.',
      reflection: 'This experience taught me the importance of thorough planning and clear communication in complex projects. I learned to anticipate potential issues and always have contingency plans ready.'
    }
  })

  // Link the story to some tags
  const leadershipTag = await prisma.tag.findUnique({ where: { name: 'Leadership' } })
  const projectMgmtTag = await prisma.tag.findUnique({ where: { name: 'Project Management' } })
  const crossFunctionalTag = await prisma.tag.findUnique({ where: { name: 'Cross-functional' } })

  if (leadershipTag && projectMgmtTag && crossFunctionalTag) {
    await prisma.storyTag.upsert({
      where: { 
        storyId_tagId: { 
          storyId: sampleStory.id, 
          tagId: leadershipTag.id 
        } 
      },
      update: {},
      create: {
        storyId: sampleStory.id,
        tagId: leadershipTag.id
      }
    })

    await prisma.storyTag.upsert({
      where: { 
        storyId_tagId: { 
          storyId: sampleStory.id, 
          tagId: projectMgmtTag.id 
        } 
      },
      update: {},
      create: {
        storyId: sampleStory.id,
        tagId: projectMgmtTag.id
      }
    })

    await prisma.storyTag.upsert({
      where: { 
        storyId_tagId: { 
          storyId: sampleStory.id, 
          tagId: crossFunctionalTag.id 
        } 
      },
      update: {},
      create: {
        storyId: sampleStory.id,
        tagId: crossFunctionalTag.id
      }
    })
  }

  console.log('Tags seeded successfully!')
}

seedTags()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
