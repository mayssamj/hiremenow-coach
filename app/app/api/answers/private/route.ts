
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getAuthUserFromRequest, requireAuth, isAdmin } from '@/lib/auth';

// Get private answers for a user
export async function GET(request: NextRequest) {
  try {
    const user = getAuthUserFromRequest(request);
    const authUser = requireAuth(user);

    const { searchParams } = new URL(request.url);
    const questionId = searchParams.get('questionId');
    const companyId = searchParams.get('companyId');

    const where: any = {
      userId: authUser.id
    };

    if (questionId) where.questionId = questionId;
    if (companyId) where.companyId = companyId;

    const privateAnswers = await prisma.privateAnswer.findMany({
      where,
      include: {
        Question: {
          include: {
            CompanyQuestion: {
              include: {
                Company: true
              }
            }
          }
        }
      },
      orderBy: { updatedAt: 'desc' }
    });

    return NextResponse.json(privateAnswers);
  } catch (error) {
    console.error('Error fetching private answers:', error);
    if (error instanceof Error && error.message === 'Authentication required') {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Failed to fetch private answers' }, { status: 500 });
  }
}

// Create or update private answer
export async function POST(request: NextRequest) {
  try {
    const user = getAuthUserFromRequest(request);
    const authUser = requireAuth(user);

    const { questionId, companyId, content, notes } = await request.json();

    if (!questionId || !content) {
      return NextResponse.json({ error: 'questionId and content are required' }, { status: 400 });
    }

    // Check if answer already exists
    const existing = await prisma.privateAnswer.findUnique({
      where: {
        userId_questionId_companyId: {
          userId: authUser.id,
          questionId,
          companyId: companyId || null
        }
      }
    });

    if (existing) {
      // Update existing answer
      const updated = await prisma.privateAnswer.update({
        where: { id: existing.id },
        data: {
          content,
          notes
        },
        include: {
          Question: {
            include: {
              CompanyQuestion: {
                include: {
                  Company: true
                }
              }
            }
          }
        }
      });

      return NextResponse.json(updated);
    } else {
      // Create new answer
      const newAnswer = await prisma.privateAnswer.create({
        data: {
          id: require('crypto').randomBytes(12).toString('base64url'),
          userId: authUser.id,
          questionId,
          companyId: companyId || null,
          content,
          notes,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        include: {
          Question: {
            include: {
              CompanyQuestion: {
                include: {
                  Company: true
                }
              }
            }
          }
        }
      });

      return NextResponse.json(newAnswer, { status: 201 });
    }
  } catch (error) {
    console.error('Error creating/updating private answer:', error);
    if (error instanceof Error && error.message === 'Authentication required') {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Failed to create/update private answer' }, { status: 500 });
  }
}

// Delete private answer
export async function DELETE(request: NextRequest) {
  try {
    const user = getAuthUserFromRequest(request);
    const authUser = requireAuth(user);

    const { searchParams } = new URL(request.url);
    const questionId = searchParams.get('questionId');
    const companyId = searchParams.get('companyId');

    if (!questionId) {
      return NextResponse.json({ error: 'questionId is required' }, { status: 400 });
    }

    const deleted = await prisma.privateAnswer.deleteMany({
      where: {
        userId: authUser.id,
        questionId,
        companyId: companyId || null
      }
    });

    if (deleted.count === 0) {
      return NextResponse.json({ error: 'Answer not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting private answer:', error);
    if (error instanceof Error && error.message === 'Authentication required') {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Failed to delete private answer' }, { status: 500 });
  }
}
