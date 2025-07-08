
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
    const questionId = searchParams.get('questionId')
    const storyId = searchParams.get('storyId')
    const companyId = searchParams.get('companyId')
    const recent = searchParams.get('recent') === 'true'

    let where: any = {}
    
    // Access control: only show user's own story-question associations unless admin
    if (!isAdmin(authUser)) {
      where.userId = authUser.id
    }
    
    if (questionId) where.questionId = questionId
    if (storyId) where.storyId = storyId
    if (companyId) where.companyId = companyId

    let orderBy: any = { createdAt: 'desc' }
    if (recent) {
      orderBy = { lastUsed: 'desc' }
    }

    const storyQuestions = await prisma.storyQuestion.findMany({
      where,
      orderBy,
      include: {
        user: {
          select: {
            id: true,
            username: true
          }
        },
        story: {
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
            }
          }
        },
        question: true
      }
    })

    // Transform the data to include tag information
    const transformedStoryQuestions = storyQuestions.map(sq => ({
      ...sq,
      story: {
        ...sq.story,
        tags: sq.story.tags.map(st => st.tag)
      }
    }))

    return NextResponse.json(transformedStoryQuestions)
  } catch (error) {
    console.error('Error fetching story-question associations:', error)
    if (error instanceof Error && error.message === 'Authentication required') {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Failed to fetch story-question associations' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = getAuthUserFromRequest(request);
    const authUser = requireAuth(user);

    const body = await request.json()
    const { storyId, questionId, companyId, relevance, customization } = body

    // Verify user has access to the story
    const story = await prisma.story.findUnique({
      where: { id: storyId },
      select: { userId: true, isPublic: true }
    });

    if (!story) {
      return NextResponse.json({ error: 'Story not found' }, { status: 404 });
    }

    // User can only associate stories they own or public stories
    if (!isAdmin(authUser) && story.userId !== authUser.id && !story.isPublic) {
      return NextResponse.json({ error: 'Access denied to this story' }, { status: 403 });
    }

    // Check if association already exists for this user
    const existing = await prisma.storyQuestion.findUnique({
      where: {
        storyId_questionId_companyId_userId: {
          storyId,
          questionId,
          companyId: companyId as any,
          userId: authUser.id
        }
      }
    })

    if (existing) {
      // Update existing association
      const updated = await prisma.storyQuestion.update({
        where: { id: existing.id },
        data: {
          relevance,
          customization,
          lastUsed: new Date(),
          usageCount: existing.usageCount + 1
        },
        include: {
          user: {
            select: {
              id: true,
              username: true
            }
          },
          story: {
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
              }
            }
          },
          question: true
        }
      })

      return NextResponse.json({
        ...updated,
        story: {
          ...updated.story,
          tags: updated.story.tags.map(st => st.tag)
        }
      })
    } else {
      // Create new association
      const storyQuestion = await prisma.storyQuestion.create({
        data: {
          storyId,
          questionId,
          companyId: companyId as any,
          userId: authUser.id,
          relevance,
          customization,
          lastUsed: new Date(),
          usageCount: 1
        },
        include: {
          user: {
            select: {
              id: true,
              username: true
            }
          },
          story: {
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
              }
            }
          },
          question: true
        }
      })

      return NextResponse.json({
        ...storyQuestion,
        story: {
          ...storyQuestion.story,
          tags: storyQuestion.story.tags.map(st => st.tag)
        }
      }, { status: 201 })
    }
  } catch (error) {
    console.error('Error creating/updating story-question association:', error)
    if (error instanceof Error && error.message === 'Authentication required') {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Failed to create/update story-question association' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = getAuthUserFromRequest(request);
    const authUser = requireAuth(user);

    const { searchParams } = new URL(request.url)
    const storyId = searchParams.get('storyId')
    const questionId = searchParams.get('questionId')
    const companyId = searchParams.get('companyId')

    if (!storyId || !questionId) {
      return NextResponse.json({ error: 'storyId and questionId are required' }, { status: 400 })
    }

    // Find the association to verify ownership
    const association = await prisma.storyQuestion.findUnique({
      where: {
        storyId_questionId_companyId_userId: {
          storyId,
          questionId,
          companyId: companyId as any,
          userId: authUser.id
        }
      }
    });

    if (!association) {
      return NextResponse.json({ error: 'Association not found' }, { status: 404 });
    }

    // Only allow deletion of user's own associations unless admin
    if (!isAdmin(authUser) && association.userId !== authUser.id) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    await prisma.storyQuestion.delete({
      where: { id: association.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting story-question association:', error)
    if (error instanceof Error && error.message === 'Authentication required') {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Failed to delete story-question association' }, { status: 500 })
  }
}
