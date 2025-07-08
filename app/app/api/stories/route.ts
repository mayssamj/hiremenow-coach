
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getAuthUserFromRequest, requireAuth, isAdmin } from '@/lib/auth'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const user = getAuthUserFromRequest(request);
    const authUser = requireAuth(user);

    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const tags = searchParams.get('tags')?.split(',').filter(Boolean) || []
    const showPublicOnly = searchParams.get('public') === 'true'
    
    const whereClause: any = {}
    
    // Access control: Show user's own stories + public stories, or all stories if admin
    if (isAdmin(authUser)) {
      // Admin can see all stories
    } else if (showPublicOnly) {
      // Only public stories
      whereClause.isPublic = true
    } else {
      // User's own stories + public stories
      whereClause.OR = [
        { userId: authUser.id },
        { isPublic: true }
      ]
    }
    
    // Add search filter
    if (search) {
      const searchConditions = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
        { situation: { contains: search, mode: 'insensitive' } },
        { task: { contains: search, mode: 'insensitive' } },
        { action: { contains: search, mode: 'insensitive' } },
        { result: { contains: search, mode: 'insensitive' } },
        { reflection: { contains: search, mode: 'insensitive' } }
      ]
      
      if (whereClause.OR) {
        // Combine access control with search
        whereClause.AND = [
          { OR: whereClause.OR },
          { OR: searchConditions }
        ]
        delete whereClause.OR
      } else {
        whereClause.OR = searchConditions
      }
    }
    
    // Add tag filter
    if (tags.length > 0) {
      const tagCondition = {
        tags: {
          some: {
            tag: {
              name: { in: tags }
            }
          }
        }
      }
      
      if (whereClause.AND) {
        whereClause.AND.push(tagCondition)
      } else if (whereClause.OR && !search) {
        whereClause.AND = [
          { OR: whereClause.OR },
          tagCondition
        ]
        delete whereClause.OR
      } else {
        whereClause.tags = tagCondition.tags
      }
    }
    
    const stories = await prisma.story.findMany({
      where: whereClause,
      orderBy: { updatedAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            username: true
          }
        },
        tags: {
          include: {
            tag: true
          }
        },
        questions: {
          include: {
            question: {
              include: {
                companyQuestions: {
                  include: {
                    company: true
                  }
                }
              }
            }
          }
        }
      }
    })

    return NextResponse.json(stories)
  } catch (error) {
    console.error('Error fetching stories:', error)
    if (error instanceof Error && error.message === 'Authentication required') {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Failed to fetch stories' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = getAuthUserFromRequest(request);
    const authUser = requireAuth(user);

    const body = await request.json()
    const { title, content, situation, task, action, result, reflection, tags = [], isPublic = false } = body

    // Create the story first
    const story = await prisma.story.create({
      data: {
        title,
        content: content || '',
        situation,
        task,
        action,
        result,
        reflection,
        isPublic,
        userId: authUser.id
      }
    })

    // Handle tags if provided
    if (tags.length > 0) {
      // Create or find existing tags
      const tagPromises = tags.map(async (tagName: string) => {
        const existingTag = await prisma.tag.findUnique({
          where: { name: tagName }
        })
        
        if (existingTag) {
          return existingTag
        } else {
          return await prisma.tag.create({
            data: {
              name: tagName,
              color: getRandomTagColor()
            }
          })
        }
      })
      
      const createdTags = await Promise.all(tagPromises)
      
      // Create story-tag relationships
      const storyTagPromises = createdTags.map(tag =>
        prisma.storyTag.create({
          data: {
            storyId: story.id,
            tagId: tag.id
          }
        })
      )
      
      await Promise.all(storyTagPromises)
    }

    // Fetch the complete story with tags and questions
    const completeStory = await prisma.story.findUnique({
      where: { id: story.id },
      include: {
        user: {
          select: {
            id: true,
            username: true
          }
        },
        tags: {
          include: {
            tag: true
          }
        },
        questions: {
          include: {
            question: {
              include: {
                companyQuestions: {
                  include: {
                    company: true
                  }
                }
              }
            }
          }
        }
      }
    })

    return NextResponse.json(completeStory, { status: 201 })
  } catch (error) {
    console.error('Error creating story:', error)
    if (error instanceof Error && error.message === 'Authentication required') {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Failed to create story' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = getAuthUserFromRequest(request);
    const authUser = requireAuth(user);

    const body = await request.json()
    const { id, title, content, situation, task, action, result, reflection, tags = [], isPublic } = body

    // Check if user owns the story or is admin
    const existingStory = await prisma.story.findUnique({
      where: { id },
      select: { userId: true }
    });

    if (!existingStory) {
      return NextResponse.json({ error: 'Story not found' }, { status: 404 });
    }

    if (!isAdmin(authUser) && existingStory.userId !== authUser.id) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    // Update the story
    const updateData: any = {
      title,
      content: content || '',
      situation,
      task,
      action,
      result,
      reflection
    };

    if (isPublic !== undefined) {
      updateData.isPublic = isPublic;
    }

    const story = await prisma.story.update({
      where: { id },
      data: updateData
    })

    // Remove existing tag relationships
    await prisma.storyTag.deleteMany({
      where: { storyId: id }
    })

    // Handle new tags
    if (tags.length > 0) {
      const tagPromises = tags.map(async (tagName: string) => {
        const existingTag = await prisma.tag.findUnique({
          where: { name: tagName }
        })
        
        if (existingTag) {
          return existingTag
        } else {
          return await prisma.tag.create({
            data: {
              name: tagName,
              color: getRandomTagColor()
            }
          })
        }
      })
      
      const createdTags = await Promise.all(tagPromises)
      
      // Create new story-tag relationships
      const storyTagPromises = createdTags.map(tag =>
        prisma.storyTag.create({
          data: {
            storyId: id,
            tagId: tag.id
          }
        })
      )
      
      await Promise.all(storyTagPromises)
    }

    // Fetch the complete updated story
    const completeStory = await prisma.story.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            username: true
          }
        },
        tags: {
          include: {
            tag: true
          }
        },
        questions: {
          include: {
            question: {
              include: {
                companyQuestions: {
                  include: {
                    company: true
                  }
                }
              }
            }
          }
        }
      }
    })

    return NextResponse.json(completeStory)
  } catch (error) {
    console.error('Error updating story:', error)
    if (error instanceof Error && error.message === 'Authentication required') {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }
    if (error instanceof Error && error.message === 'Access denied') {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }
    return NextResponse.json({ error: 'Failed to update story' }, { status: 500 })
  }
}

function getRandomTagColor(): string {
  const colors = [
    '#3B82F6', // blue
    '#10B981', // emerald
    '#F59E0B', // amber
    '#EF4444', // red
    '#8B5CF6', // violet
    '#06B6D4', // cyan
    '#84CC16', // lime
    '#F97316', // orange
    '#EC4899', // pink
    '#6366F1'  // indigo
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}
