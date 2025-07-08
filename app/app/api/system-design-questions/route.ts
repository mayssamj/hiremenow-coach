
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
    const companyId = searchParams.get('companyId');
    const difficulty = searchParams.get('difficulty');
    const tags = searchParams.get('tags');
    const search = searchParams.get('search');
    const isGeneral = searchParams.get('isGeneral');

    const where: any = {
      isPublished: true
    };

    if (companyId) {
      where.companyId = companyId;
    }

    if (difficulty) {
      where.difficulty = difficulty;
    }

    if (isGeneral !== null) {
      where.isGeneral = isGeneral === 'true';
    }

    if (tags) {
      const tagArray = tags.split(',');
      where.tags = {
        hasSome: tagArray
      };
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { tags: { hasSome: [search] } }
      ];
    }

    const questions = await prisma.systemDesignQuestion.findMany({
      where,
      include: {
        Company: {
          select: {
            id: true,
            name: true,
            slug: true,
            logoUrl: true
          }
        },
        SystemDesignNote: {
          where: {
            userId: user.id
          }
        },
        SystemDesignAnswer: {
          where: {
            userId: user.id
          }
        }
      },
      orderBy: [
        { companyId: 'asc' },
        { order: 'asc' },
        { createdAt: 'desc' }
      ]
    });

    return NextResponse.json(questions);
  } catch (error) {
    console.error('Error fetching system design questions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch system design questions' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    
    const question = await prisma.systemDesignQuestion.create({
      data: {
        ...data,
        tags: data.tags || [],
        references: data.references || [],
        videoLinks: data.videoLinks || [],
        blogPosts: data.blogPosts || []
      },
      include: {
        Company: {
          select: {
            id: true,
            name: true,
            slug: true,
            logoUrl: true
          }
        }
      }
    });

    return NextResponse.json(question, { status: 201 });
  } catch (error) {
    console.error('Error creating system design question:', error);
    return NextResponse.json(
      { error: 'Failed to create system design question' },
      { status: 500 }
    );
  }
}
