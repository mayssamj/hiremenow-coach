
export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')

    // First try to get stories with recent usage
    let uniqueStories = []
    
    try {
      const recentStoryQuestions = await prisma.storyQuestion.findMany({
        orderBy: { lastUsed: 'desc' },
        take: limit * 2, // Get more to account for duplicates
        include: {
          story: {
            include: {
              tags: {
                include: {
                  tag: true
                }
              }
            }
          }
        }
      })

      // Deduplicate stories and maintain order
      const seenStoryIds = new Set<string>()
      
      for (const sq of recentStoryQuestions) {
        if (!seenStoryIds.has(sq.story.id) && uniqueStories.length < limit) {
          seenStoryIds.add(sq.story.id)
          uniqueStories.push({
            ...sq.story,
            tags: sq.story.tags.map((st: any) => st.tag),
            lastUsed: sq.lastUsed,
            usageCount: sq.usageCount
          })
        }
      }

      // If we don't have enough recent stories, fill with recently updated stories
      if (uniqueStories.length < limit) {
        const additionalStories = await prisma.story.findMany({
          where: {
            id: { notIn: Array.from(seenStoryIds) }
          },
          orderBy: { updatedAt: 'desc' },
          take: limit - uniqueStories.length,
          include: {
            tags: {
              include: {
                tag: true
              }
            }
          }
        })

        const transformedAdditional = additionalStories.map((story: any) => ({
          ...story,
          tags: story.tags.map((st: any) => st.tag),
          lastUsed: null,
          usageCount: 0
        }))

        uniqueStories.push(...transformedAdditional)
      }
    } catch (storyQuestionError) {
      // If story-question queries fail, fall back to regular stories
      console.log('Falling back to regular stories:', storyQuestionError)
      
      const stories = await prisma.story.findMany({
        orderBy: { updatedAt: 'desc' },
        take: limit,
        include: {
          tags: {
            include: {
              tag: true
            }
          }
        }
      })

      uniqueStories = stories.map((story: any) => ({
        ...story,
        tags: story.tags.map((st: any) => st.tag),
        lastUsed: null,
        usageCount: 0
      }))
    }

    return NextResponse.json(uniqueStories)
  } catch (error) {
    console.error('Error fetching recent stories:', error)
    return NextResponse.json({ error: 'Failed to fetch recent stories' }, { status: 500 })
  }
}
