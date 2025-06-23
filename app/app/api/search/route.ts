
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.trim().length === 0) {
      return NextResponse.json({ results: [] });
    }

    const searchTerm = query.trim().toLowerCase();

    // Search across questions, stories, companies
    const [questions, stories, companies] = await Promise.all([
      // Search questions
      prisma.question.findMany({
        where: {
          text: { contains: searchTerm },
        },
        include: {
          company: {
            select: { name: true, slug: true }
          }
        },
        take: 10,
      }),

      // Search stories (public access)
      prisma.story.findMany({
        where: {
          OR: [
            { title: { contains: searchTerm } },
            { situation: { contains: searchTerm } },
            { task: { contains: searchTerm } },
            { action: { contains: searchTerm } },
            { result: { contains: searchTerm } },
          ],
        },
        select: {
          id: true,
          title: true,
          situation: true,
          createdAt: true,
          user: {
            select: { name: true }
          }
        },
        take: 10,
      }),

      // Search companies
      prisma.company.findMany({
        where: {
          OR: [
            { name: { contains: searchTerm } },
            { description: { contains: searchTerm } },
          ],
        },
        select: {
          id: true,
          name: true,
          slug: true,
          description: true,
        },
        take: 5,
      }),
    ]);

    const results = [
      ...questions.map(q => ({
        id: q.id,
        type: 'question' as const,
        title: q.text,
        subtitle: `${q.company?.name || 'Unknown'} • ${q.category}`,
        url: `/questions/${q.id}`,
      })),
      ...stories.map(s => ({
        id: s.id,
        type: 'story' as const,
        title: s.title,
        subtitle: s.situation.slice(0, 100) + (s.situation.length > 100 ? '...' : ''),
        url: `/stories/${s.id}`,
      })),
      ...companies.map(c => ({
        id: c.id,
        type: 'company' as const,
        title: c.name,
        subtitle: c.description?.slice(0, 80) + (c.description && c.description.length > 80 ? '...' : '') || 'Company profile',
        url: `/companies/${c.slug}`,
      })),
    ];

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    );
  }
}
