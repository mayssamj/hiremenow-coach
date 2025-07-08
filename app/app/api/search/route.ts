
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getCurrentUser } from '@/lib/auth';

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const type = searchParams.get('type'); // 'all', 'questions', 'stories', 'system-design', 'strategies', 'faqs'
    const companyId = searchParams.get('companyId');

    if (!query) {
      return NextResponse.json({ error: 'Search query is required' }, { status: 400 });
    }

    const results: any = {
      questions: [],
      stories: [],
      systemDesignQuestions: [],
      strategies: [],
      faqs: []
    };

    const searchCondition = {
      contains: query,
      mode: 'insensitive' as const
    };

    // Search behavioral questions
    if (!type || type === 'all' || type === 'questions') {
      const questionWhere: any = {
        OR: [
          { title: searchCondition },
          { content: searchCondition }
        ]
      };

      results.questions = await prisma.question.findMany({
        where: questionWhere,
        include: {
          companyQuestions: {
            where: companyId ? { companyId } : {},
            include: {
              company: {
                select: { id: true, name: true, slug: true, logoUrl: true }
              },
              category: {
                select: { id: true, name: true, slug: true, color: true }
              }
            }
          }
        },
        take: 10
      });
    }

    // Search stories
    if (!type || type === 'all' || type === 'stories') {
      const storyWhere: any = {
        OR: [
          { title: searchCondition },
          { content: searchCondition },
          { situation: searchCondition },
          { task: searchCondition },
          { action: searchCondition },
          { result: searchCondition }
        ]
      };

      // Only show public stories or user's own stories
      storyWhere.OR.push({
        OR: [
          { isPublic: true },
          { userId: user.id }
        ]
      });

      results.stories = await prisma.story.findMany({
        where: storyWhere,
        include: {
          user: {
            select: { id: true, username: true }
          },
          tags: {
            include: {
              tag: true
            }
          }
        },
        take: 10
      });
    }

    // Search system design questions
    if (!type || type === 'all' || type === 'system-design') {
      const systemDesignWhere: any = {
        isPublished: true,
        OR: [
          { title: searchCondition },
          { description: searchCondition }
        ]
      };

      if (companyId) {
        systemDesignWhere.companyId = companyId;
      }

      results.systemDesignQuestions = await prisma.systemDesignQuestion.findMany({
        where: systemDesignWhere,
        include: {
          company: {
            select: { id: true, name: true, slug: true, logoUrl: true }
          }
        },
        take: 10
      });
    }

    // Search company strategies
    if (!type || type === 'all' || type === 'strategies') {
      const strategyWhere: any = {
        isPublished: true,
        OR: [
          { title: searchCondition },
          { description: searchCondition },
          { content: searchCondition }
        ]
      };

      if (companyId) {
        strategyWhere.companyId = companyId;
      }

      results.strategies = await prisma.companyStrategy.findMany({
        where: strategyWhere,
        include: {
          company: {
            select: { id: true, name: true, slug: true, logoUrl: true }
          }
        },
        take: 10
      });
    }

    // Search company FAQs
    if (!type || type === 'all' || type === 'faqs') {
      const faqWhere: any = {
        isPublished: true,
        OR: [
          { question: searchCondition },
          { answer: searchCondition }
        ]
      };

      if (companyId) {
        faqWhere.companyId = companyId;
      }

      results.faqs = await prisma.companyFAQ.findMany({
        where: faqWhere,
        include: {
          company: {
            select: { id: true, name: true, slug: true, logoUrl: true }
          }
        },
        take: 10
      });
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error('Error performing search:', error);
    return NextResponse.json(
      { error: 'Failed to perform search' },
      { status: 500 }
    );
  }
}
