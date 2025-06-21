
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const category = searchParams.get('category');
    const difficulty = searchParams.get('difficulty');
    const companyId = searchParams.get('companyId');
    const critical = searchParams.get('critical');

    const skip = (page - 1) * limit;

    const where: any = {};

    if (category && category !== 'all') {
      where.category = category;
    }

    if (difficulty && difficulty !== 'all') {
      where.difficulty = difficulty;
    }

    if (companyId && companyId !== 'all') {
      where.companyId = companyId;
    }

    if (critical === 'true') {
      where.isCritical = true;
    }

    const questions = await prisma.question.findMany({
      where,
      include: {
        company: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        answers: {
          where: {
            userId: session.user.id,
          },
          select: {
            id: true,
            isComplete: true,
          },
        },
      },
      orderBy: [
        { isCritical: 'desc' },
        { createdAt: 'desc' },
      ],
      skip,
      take: limit,
    });

    const total = await prisma.question.count({ where });

    return NextResponse.json({
      questions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Questions fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch questions' },
      { status: 500 }
    );
  }
}
