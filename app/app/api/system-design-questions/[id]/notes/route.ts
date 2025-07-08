
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getCurrentUser } from '@/lib/auth';

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { content, isPrivate = true } = await request.json();

    const note = await prisma.systemDesignNote.upsert({
      where: {
        userId_questionId: {
          userId: user.id,
          questionId: params.id
        }
      },
      update: {
        content,
        isPrivate
      },
      create: {
        userId: user.id,
        questionId: params.id,
        content,
        isPrivate
      }
    });

    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    console.error('Error creating/updating system design note:', error);
    return NextResponse.json(
      { error: 'Failed to save note' },
      { status: 500 }
    );
  }
}
