
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getAuthUserFromRequest, requireAuth, isAdmin } from '@/lib/auth';

// Get public answers
export async function GET(request: NextRequest) {
  try {
    const user = getAuthUserFromRequest(request);
    requireAuth(user);

    const { searchParams } = new URL(request.url);
    const questionId = searchParams.get('questionId');
    const companyId = searchParams.get('companyId');
    const userId = searchParams.get('userId'); // For admin to view specific user's answers

    const where: any = {
      isApproved: true
    };

    if (questionId) where.questionId = questionId;
    if (companyId) where.companyId = companyId;
    
    // If userId is specified and user is admin, filter by that user
    if (userId && isAdmin(user)) {
      where.userId = userId;
    }

    const publicAnswers = await prisma.publicAnswer.findMany({
      where,
      include: {
        User: {
          select: {
            id: true,
            username: true
          }
        },
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
      orderBy: [
        { upvotes: 'desc' },
        { updatedAt: 'desc' }
      ]
    });

    return NextResponse.json(publicAnswers);
  } catch (error) {
    console.error('Error fetching public answers:', error);
    if (error instanceof Error && error.message === 'Authentication required') {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Failed to fetch public answers' }, { status: 500 });
  }
}

// Create or update public answer
export async function POST(request: NextRequest) {
  try {
    const user = getAuthUserFromRequest(request);
    const authUser = requireAuth(user);

    const { questionId, companyId, content, title } = await request.json();

    if (!questionId || !content) {
      return NextResponse.json({ error: 'questionId and content are required' }, { status: 400 });
    }

    // Check if answer already exists
    const existing = await prisma.publicAnswer.findFirst({
      where: {
        userId: authUser.id,
        questionId,
        companyId: companyId || null
      }
    });

    if (existing) {
      // Update existing answer
      const updated = await prisma.publicAnswer.update({
        where: { id: existing.id },
        data: {
          content,
          title
        },
        include: {
          User: {
            select: {
              id: true,
              username: true
            }
          },
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
      const newAnswer = await prisma.publicAnswer.create({
        data: {
          id: require('crypto').randomBytes(12).toString('base64url'),
          userId: authUser.id,
          questionId,
          companyId: companyId || null,
          content,
          title,
          isApproved: true, // Auto-approve for now
          upvotes: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        include: {
          User: {
            select: {
              id: true,
              username: true
            }
          },
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
    console.error('Error creating/updating public answer:', error);
    if (error instanceof Error && error.message === 'Authentication required') {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Failed to create/update public answer' }, { status: 500 });
  }
}

// Delete public answer
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

    // Find the answer to verify ownership
    const answer = await prisma.publicAnswer.findFirst({
      where: {
        userId: authUser.id,
        questionId,
        companyId: companyId || null
      }
    });

    if (!answer) {
      return NextResponse.json({ error: 'Answer not found' }, { status: 404 });
    }

    // Only allow deletion of user's own answers unless admin
    if (!isAdmin(authUser) && answer.userId !== authUser.id) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    await prisma.publicAnswer.delete({
      where: { id: answer.id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting public answer:', error);
    if (error instanceof Error && error.message === 'Authentication required') {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Failed to delete public answer' }, { status: 500 });
  }
}
