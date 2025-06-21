
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const question = await prisma.question.findUnique({
      where: {
        id: params.id,
      },
      include: {
        company: {
          select: {
            id: true,
            name: true,
            slug: true,
            industry: true,
            description: true,
          },
        },
        answers: {
          where: {
            userId: session.user.id,
          },
          select: {
            id: true,
            content: true,
            isComplete: true,
            timeSpent: true,
            storyIds: true,
            tags: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    if (!question) {
      return NextResponse.json({ error: 'Question not found' }, { status: 404 });
    }

    return NextResponse.json({ question });
  } catch (error) {
    console.error('Question fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch question' },
      { status: 500 }
    );
  }
}
