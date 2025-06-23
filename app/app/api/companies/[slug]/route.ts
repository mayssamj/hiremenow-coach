
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const companySlug = params.slug;

    const company = await prisma.company.findUnique({
      where: { slug: companySlug },
      include: {
        questions: {
          include: {
            answers: {
              select: {
                id: true,
                content: true,
                user: {
                  select: {
                    name: true,
                    username: true,
                  },
                },
              },
            },
          },
          orderBy: [
            { isCritical: 'desc' },
            { difficulty: 'asc' },
            { text: 'asc' },
          ],
        },
        _count: {
          select: {
            questions: true,
          },
        },
      },
    });

    if (!company) {
      return NextResponse.json(
        { error: 'Company not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(company);
  } catch (error) {
    console.error('Company fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch company' },
      { status: 500 }
    );
  }
}
