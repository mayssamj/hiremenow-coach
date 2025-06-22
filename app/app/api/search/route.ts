
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { SearchResult } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q');

    if (!query || query.length < 2) {
      return NextResponse.json({ results: [] });
    }

    const searchQuery = query.toLowerCase().trim();
    const results: SearchResult[] = [];

    // Search questions
    const questions = await prisma.question.findMany({
      where: {
        OR: [
          { text: { contains: searchQuery } },
          { tags: { contains: searchQuery } },
        ],
      },
      include: {
        company: true,
      },
      take: 10,
    });

    questions.forEach(question => {
      results.push({
        id: question.id,
        type: 'question',
        title: question.text.slice(0, 100) + (question.text.length > 100 ? '...' : ''),
        content: question.text,
        url: `/questions/${question.id}`,
        company: question.company?.name,
        tags: JSON.parse(question.tags || '[]'),
      });
    });

    // Search stories
    const stories = await prisma.story.findMany({
      where: {
        userId: session.user.id,
        OR: [
          { title: { contains: searchQuery } },
          { situation: { contains: searchQuery } },
          { task: { contains: searchQuery } },
          { action: { contains: searchQuery } },
          { result: { contains: searchQuery } },
          { tags: { contains: searchQuery } },
        ],
      },
      take: 10,
    });

    stories.forEach(story => {
      results.push({
        id: story.id,
        type: 'story',
        title: story.title,
        content: story.situation.slice(0, 200) + (story.situation.length > 200 ? '...' : ''),
        url: `/stories/${story.id}`,
        tags: JSON.parse(story.tags || '[]'),
      });
    });

    // Search answers
    const answers = await prisma.answer.findMany({
      where: {
        userId: session.user.id,
        content: { contains: searchQuery },
      },
      include: {
        question: true,
        company: true,
      },
      take: 10,
    });

    answers.forEach(answer => {
      results.push({
        id: answer.id,
        type: 'answer',
        title: `Answer: ${answer.question.text.slice(0, 80)}...`,
        content: answer.content.slice(0, 200) + (answer.content.length > 200 ? '...' : ''),
        url: `/questions/${answer.question.id}?answer=${answer.id}`,
        company: answer.company?.name,
        tags: JSON.parse(answer.tags || '[]'),
      });
    });

    // Search companies
    const companies = await prisma.company.findMany({
      where: {
        OR: [
          { name: { contains: searchQuery } },
          { values: { contains: searchQuery } },
        ],
      },
      take: 5,
    });

    companies.forEach(company => {
      const values = JSON.parse(company.values || '[]');
      results.push({
        id: company.id,
        type: 'company',
        title: company.name,
        content: Array.isArray(values) ? values.join(', ').slice(0, 200) : '',
        url: `/companies/${company.slug}`,
        company: company.name,
      });
    });

    // Sort results by relevance (exact matches first, then partial matches)
    results.sort((a, b) => {
      const aExact = a.title.toLowerCase().includes(searchQuery) ? 1 : 0;
      const bExact = b.title.toLowerCase().includes(searchQuery) ? 1 : 0;
      return bExact - aExact;
    });

    return NextResponse.json({
      results: results.slice(0, 20), // Limit to 20 results
      total: results.length,
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    );
  }
}
