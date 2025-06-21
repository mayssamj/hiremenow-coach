
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { DashboardStats } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;

    // Get total stories
    const totalStories = await prisma.story.count({
      where: { userId },
    });

    // Get total answers
    const totalAnswers = await prisma.answer.count({
      where: { userId },
    });

    // Get all companies with question counts
    const companies = await prisma.company.findMany({
      include: {
        _count: {
          select: { questions: true },
        },
      },
    });

    // Get user progress for each company
    const userProgress = await prisma.userProgress.findMany({
      where: { userId },
    });

    // Calculate progress by company
    const progressByCompany = companies.map(company => {
      const progress = userProgress.find(p => p.companyId === company.id);
      const totalQuestions = company._count.questions;
      const answeredQuestions = progress?.answeredQuestions || 0;
      const criticalAnswered = progress?.criticalAnswered || 0;
      
      return {
        company,
        progress: {
          totalQuestions,
          answeredQuestions,
          criticalAnswered,
          completionPercentage: totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0,
          averageTimePerAnswer: progress?.averageTimePerAnswer || 0,
        },
      };
    }).filter(item => item.progress.totalQuestions > 0)
      .sort((a, b) => b.progress.completionPercentage - a.progress.completionPercentage);

    // Calculate overall completion rate
    const totalQuestionsAvailable = progressByCompany.reduce((sum, item) => sum + item.progress.totalQuestions, 0);
    const totalQuestionsAnswered = progressByCompany.reduce((sum, item) => sum + item.progress.answeredQuestions, 0);
    const completionRate = totalQuestionsAvailable > 0 ? totalQuestionsAnswered / totalQuestionsAvailable : 0;

    // Get recent activity
    const recentStories = await prisma.story.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 3,
      select: {
        id: true,
        title: true,
        createdAt: true,
      },
    });

    const recentAnswers = await prisma.answer.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 3,
      include: {
        question: {
          select: {
            text: true,
          },
        },
      },
    });

    const recentNotes = await prisma.note.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 2,
      select: {
        id: true,
        content: true,
        createdAt: true,
      },
    });

    const recentActivity = [
      ...recentStories.map(story => ({
        type: 'story' as const,
        id: story.id,
        title: story.title,
        createdAt: story.createdAt,
      })),
      ...recentAnswers.map(answer => ({
        type: 'answer' as const,
        id: answer.id,
        title: `Answer: ${answer.question.text.slice(0, 50)}...`,
        createdAt: answer.createdAt,
      })),
      ...recentNotes.map(note => ({
        type: 'note' as const,
        id: note.id,
        title: `Note: ${note.content.slice(0, 50)}...`,
        createdAt: note.createdAt,
      })),
    ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);

    const stats: DashboardStats = {
      totalStories,
      totalAnswers,
      completionRate,
      recentActivity,
      progressByCompany,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}
