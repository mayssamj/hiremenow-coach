
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
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    const where: any = {
      isPublished: true
    };

    if (companyId) {
      where.companyId = companyId;
    }

    if (category) {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { question: { contains: search, mode: 'insensitive' } },
        { answer: { contains: search, mode: 'insensitive' } },
        { tags: { hasSome: [search] } }
      ];
    }

    const faqs = await prisma.companyFAQ.findMany({
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

    return NextResponse.json(faqs);
  } catch (error) {
    console.error('Error fetching company FAQs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch company FAQs' },
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
    
    const faq = await prisma.companyFAQ.create({
      data: {
        ...data,
        tags: data.tags || []
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

    return NextResponse.json(faq, { status: 201 });
  } catch (error) {
    console.error('Error creating company FAQ:', error);
    return NextResponse.json(
      { error: 'Failed to create company FAQ' },
      { status: 500 }
    );
  }
}
