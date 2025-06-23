
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Get all stories (now publicly accessible)
    const stories = await prisma.story.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        situation: true,
        task: true,
        action: true,
        result: true,
        reflection: true,
        learnings: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            name: true,
            username: true,
          },
        },
      },
    });

    return NextResponse.json(stories);
  } catch (error) {
    console.error('Stories fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stories' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, situation, task, action, result, reflection, learnings } = body;

    // Get first available user for story creation
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { username: 'demo' },
          { username: 'admin' },
          { isActive: true }
        ]
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'No user available for story creation' }, { status: 404 });
    }

    const story = await prisma.story.create({
      data: {
        title,
        situation,
        task,
        action,
        result,
        reflection,
        learnings,
        userId: user.id,
      },
      include: {
        user: {
          select: {
            name: true,
            username: true,
          },
        },
      },
    });

    return NextResponse.json(story, { status: 201 });
  } catch (error) {
    console.error('Story creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create story' },
      { status: 500 }
    );
  }
}
