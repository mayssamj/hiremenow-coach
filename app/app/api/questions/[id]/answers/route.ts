
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const questionId = params.id;
    const body = await request.json();
    const { content, storyId } = body;

    // Get first available user for answer creation
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
      return NextResponse.json({ error: 'No user available for answer creation' }, { status: 404 });
    }

    const userId = user.id;

    // Check if question exists
    const question = await prisma.question.findUnique({
      where: { id: questionId },
      include: { company: true },
    });

    if (!question) {
      return NextResponse.json(
        { error: 'Question not found' },
        { status: 404 }
      );
    }

    // Create or update the answer
    const answer = await prisma.answer.upsert({
      where: {
        questionId_userId: {
          questionId,
          userId,
        },
      },
      update: {
        content,
      },
      create: {
        content,
        userId,
        questionId,
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

    // Update user progress (only if company exists)
    if (question.company?.id) {
      const existingProgress = await prisma.userProgress.findUnique({
        where: {
          userId_companyId: {
            userId,
            companyId: question.company.id,
          },
        },
      });

      if (existingProgress) {
        await prisma.userProgress.update({
          where: {
            userId_companyId: {
              userId,
              companyId: question.company.id,
            },
          },
          data: {
            answeredQuestions: {
              increment: 1,
            },
            criticalAnswered: question.isCritical
              ? { increment: 1 }
              : existingProgress.criticalAnswered,
          },
        });
      } else {
        await prisma.userProgress.create({
          data: {
            userId,
            companyId: question.company.id,
            answeredQuestions: 1,
            criticalAnswered: question.isCritical ? 1 : 0,
          },
        });
      }
    }

    return NextResponse.json(answer, { status: 201 });
  } catch (error) {
    console.error('Answer creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create answer' },
      { status: 500 }
    );
  }
}
