
import { NextRequest, NextResponse } from 'next/server';
import { getServerAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerAuthSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { content, isComplete, storyIds, tags, timeSpent } = body;

    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { error: 'Answer content is required' },
        { status: 400 }
      );
    }

    // Verify question exists
    const question = await prisma.question.findUnique({
      where: { id: params.id },
      include: { company: true },
    });

    if (!question) {
      return NextResponse.json({ error: 'Question not found' }, { status: 404 });
    }

    // Upsert the answer (update if exists, create if not)
    const answer = await prisma.answer.upsert({
      where: {
        questionId_userId: {
          questionId: params.id,
          userId: session.user.id,
        },
      },
      update: {
        content: content.trim(),
        isComplete: !!isComplete,
        storyIds: storyIds || [],
        tags: tags || [],
        timeSpent: timeSpent || 0,
        updatedAt: new Date(),
      },
      create: {
        content: content.trim(),
        questionId: params.id,
        userId: session.user.id,
        companyId: question.companyId,
        isComplete: !!isComplete,
        storyIds: storyIds || [],
        tags: tags || [],
        timeSpent: timeSpent || 0,
      },
      include: {
        question: {
          select: {
            id: true,
            text: true,
            category: true,
            difficulty: true,
          },
        },
      },
    });

    return NextResponse.json({ answer }, { status: 200 });
  } catch (error) {
    console.error('Answer submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit answer' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // PUT uses the same logic as POST for upsert
  return POST(req, { params });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerAuthSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.answer.deleteMany({
      where: {
        questionId: params.id,
        userId: session.user.id,
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Answer deletion error:', error);
    return NextResponse.json(
      { error: 'Failed to delete answer' },
      { status: 500 }
    );
  }
}
