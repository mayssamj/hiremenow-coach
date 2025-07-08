
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
    const type = searchParams.get('type');

    const where: any = {
      isPublished: true
    };

    if (companyId) {
      where.companyId = companyId;
    }

    if (type) {
      where.type = type;
    }

    const strategies = await prisma.companyStrategy.findMany({
      where,
      include: {
        Company: {
          select: {
            id: true,
            name: true,
            slug: true,
            logoUrl: true
          }
        }
      },
      orderBy: [
        { companyId: 'asc' },
        { order: 'asc' }
      ]
    });

    return NextResponse.json(strategies);
  } catch (error) {
    console.error('Error fetching company strategies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch company strategies' },
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
    
    const strategy = await prisma.companyStrategy.create({
      data: {
        ...data,
        keyPoints: data.keyPoints || [],
        examples: data.examples || [],
        tips: data.tips || []
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

    return NextResponse.json(strategy, { status: 201 });
  } catch (error) {
    console.error('Error creating company strategy:', error);
    return NextResponse.json(
      { error: 'Failed to create company strategy' },
      { status: 500 }
    );
  }
}
