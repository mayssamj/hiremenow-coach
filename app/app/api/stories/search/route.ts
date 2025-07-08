
export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q') || ''
    const tags = searchParams.get('tags')?.split(',').filter(Boolean) || []
    const recent = searchParams.get('recent') === 'true'
    const limit = parseInt(searchParams.get('limit') || '20')

    let where: any = {}
    
    // Text search across title and content
    if (query) {
      where.OR = [
        { title: { contains: query, mode: 'insensitive' } },
        { content: { contains: query, mode: 'insensitive' } },
        { situation: { contains: query, mode: 'insensitive' } },
        { task: { contains: query, mode: 'insensitive' } },
        { action: { contains: query, mode: 'insensitive' } },
        { result: { contains: query, mode: 'insensitive' } }
      ]
    }

    // Tag filtering
    if (tags.length > 0) {
      where.tags = {
        some: {
          tag: {
            name: { in: tags }
          }
        }
      }
    }

    let orderBy: any = { updatedAt: 'desc' }
    // For now, just use simple ordering since story-question associations might not exist yet
    if (recent) {
      orderBy = { updatedAt: 'desc' }
    }

    const stories = await prisma.story.findMany({
      where,
      orderBy,
      take: limit,
      include: {
        tags: {
          include: {
            tag: true
          }
        },
        questions: {
          take: 3, // Include recent question associations
          include: {
            question: {
              select: {
                id: true,
                title: true
              }
            }
          }
        }
      }
    })

    // Transform the data
    const transformedStories = stories.map(story => ({
      ...story,
      tags: story.tags.map(st => st.tag),
      recentQuestions: story.questions.map(sq => sq.question)
    }))

    return NextResponse.json(transformedStories)
  } catch (error) {
    console.error('Error searching stories:', error)
    return NextResponse.json({ error: 'Failed to search stories' }, { status: 500 })
  }
}
