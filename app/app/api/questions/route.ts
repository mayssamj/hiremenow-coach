
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const companySlug = searchParams.get('company');
    const category = searchParams.get('category');
    const type = searchParams.get('type');

    let whereCondition: any = {};

    if (companySlug) {
      whereCondition.company = { slug: companySlug };
    }

    if (category && category !== 'all') {
      whereCondition.category = category;
    }

    if (type && type !== 'all') {
      whereCondition.type = type;
    }

    const questions = await prisma.question.findMany({
      where: whereCondition,
      include: {
        company: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        _count: {
          select: {
            answers: true,
          },
        },
      },
      orderBy: [
        { isCritical: 'desc' },
        { difficulty: 'asc' },
        { text: 'asc' },
      ],
    });

    return NextResponse.json({ questions });
  } catch (error) {
    console.error('Questions fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch questions' },
      { status: 500 }
    );
  }
}
