
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const questionId = searchParams.get('questionId');

    if (questionId) {
      // Get progress for specific question
      const progress = await prisma.progress.findUnique({
        where: {
          userId_questionId: {
            userId: user.id,
            questionId: questionId
          }
        }
      });

      return NextResponse.json(progress);
    } else {
      // Get all progress for user
      const progress = await prisma.progress.findMany({
        where: {
          userId: user.id
        },
        include: {
          question: {
            include: {
              companyQuestions: {
                include: {
                  company: true,
                  category: true
                }
              }
            }
          }
        }
      });

      return NextResponse.json(progress);
    }
  } catch (error) {
    console.error('Error fetching progress:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const { questionId, status, notes } = await request.json();

    if (!questionId || !status) {
      return NextResponse.json(
        { error: 'Question ID and status are required' },
        { status: 400 }
      );
    }

    // Upsert progress (create or update)
    const progress = await prisma.progress.upsert({
      where: {
        userId_questionId: {
          userId: user.id,
          questionId: questionId
        }
      },
      update: {
        status,
        notes: notes || null
      },
      create: {
        userId: user.id,
        questionId,
        status,
        notes: notes || null
      }
    });

    return NextResponse.json(progress);
  } catch (error) {
    console.error('Error updating progress:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const questionId = searchParams.get('questionId');

    if (!questionId) {
      return NextResponse.json(
        { error: 'Question ID is required' },
        { status: 400 }
      );
    }

    await prisma.progress.delete({
      where: {
        userId_questionId: {
          userId: user.id,
          questionId: questionId
        }
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting progress:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
