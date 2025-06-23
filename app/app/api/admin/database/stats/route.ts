
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Get database statistics (now publicly accessible)
    const [
      userCount,
      companyCount,
      questionCount,
      storyCount,
      answerCount,
      progressCount,
      noteCount
    ] = await Promise.all([
      prisma.user.count(),
      prisma.company.count(),
      prisma.question.count(),
      prisma.story.count(),
      prisma.answer.count(),
      prisma.userProgress.count(),
      prisma.note.count(),
    ]);

    const stats = {
      users: userCount,
      companies: companyCount,
      questions: questionCount,
      stories: storyCount,
      answers: answerCount,
      userProgress: progressCount,
      notes: noteCount,
      lastUpdated: new Date().toISOString(),
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Database stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch database stats' },
      { status: 500 }
    );
  }
}
