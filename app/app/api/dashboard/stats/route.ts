
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { DashboardStats } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    // Get first available user or demo user for public access
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
      return NextResponse.json({ error: 'No user data available' }, { status: 404 });
    }

    const userId = user.id;

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
      const completionPercentage = totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0;
      
      return {
        company: {
          id: company.id,
          name: company.name,
          slug: company.slug,
        },
        totalQuestions,
        answeredQuestions,
        progress: completionPercentage,
      };
    }).filter(item => item.totalQuestions > 0)
      .sort((a, b) => b.progress - a.progress);

    // Calculate overall completion rate
    const totalQuestionsAvailable = progressByCompany.reduce((sum, item) => sum + item.totalQuestions, 0);
    const totalQuestionsAnswered = progressByCompany.reduce((sum, item) => sum + item.answeredQuestions, 0);
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
      totalQuestions: totalQuestionsAvailable,
      answeredQuestions: totalQuestionsAnswered,
      totalStories,
      totalAnswers,
      completionRate,
      companiesProgress: progressByCompany.map(item => ({
        id: item.company.id,
        name: item.company.name,
        totalQuestions: item.totalQuestions,
        answeredQuestions: item.answeredQuestions,
        progress: item.progress,
      })),
      progressByCompany,
      recentActivity,
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
