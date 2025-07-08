
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getCurrentUser } from '@/lib/auth';

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const question = await prisma.systemDesignQuestion.findUnique({
      where: { id: params.id },
      include: {
        company: {
          select: {
            id: true,
            name: true,
            slug: true,
            logoUrl: true
          }
        },
        userNotes: {
          where: {
            userId: user.id
          }
        },
        userAnswers: {
          where: {
            userId: user.id
          }
        }
      }
    });

    if (!question) {
      return NextResponse.json({ error: 'Question not found' }, { status: 404 });
    }

    return NextResponse.json(question);
  } catch (error) {
    console.error('Error fetching system design question:', error);
    return NextResponse.json(
      { error: 'Failed to fetch system design question' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    
    const question = await prisma.systemDesignQuestion.update({
      where: { id: params.id },
      data: {
        ...data,
        tags: data.tags || [],
        references: data.references || [],
        videoLinks: data.videoLinks || [],
        blogPosts: data.blogPosts || []
      },
      include: {
        company: {
          select: {
            id: true,
            name: true,
            slug: true,
            logoUrl: true
          }
        }
      }
    });

    return NextResponse.json(question);
  } catch (error) {
    console.error('Error updating system design question:', error);
    return NextResponse.json(
      { error: 'Failed to update system design question' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.systemDesignQuestion.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ message: 'Question deleted successfully' });
  } catch (error) {
    console.error('Error deleting system design question:', error);
    return NextResponse.json(
      { error: 'Failed to delete system design question' },
      { status: 500 }
    );
  }
}
