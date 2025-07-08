
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const interview = await prisma.interview.findFirst({
      where: {
        id: params.id,
        userId: user.id
      },
      include: {
        reflections: {
          orderBy: { order: 'asc' }
        }
      }
    });

    if (!interview) {
      return NextResponse.json({ error: 'Interview not found' }, { status: 404 });
    }

    return NextResponse.json(interview);
  } catch (error) {
    console.error('Error fetching interview:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const body = await request.json();
    const { title, company, date, round, interviewer, outcome, overallNotes, reflections } = body;

    // Check if interview belongs to user
    const existingInterview = await prisma.interview.findFirst({
      where: {
        id: params.id,
        userId: user.id
      }
    });

    if (!existingInterview) {
      return NextResponse.json({ error: 'Interview not found' }, { status: 404 });
    }

    // Delete existing reflections and create new ones
    await prisma.interviewReflection.deleteMany({
      where: { interviewId: params.id }
    });

    const interview = await prisma.interview.update({
      where: { id: params.id },
      data: {
        title,
        company,
        date: date ? new Date(date) : null,
        round,
        interviewer,
        outcome,
        overallNotes,
        reflections: {
          create: reflections?.map((reflection: any, index: number) => ({
            questionAsked: reflection.questionAsked,
            myResponse: reflection.myResponse,
            reflection: reflection.reflection,
            whatWentWell: reflection.whatWentWell,
            whatToImprove: reflection.whatToImprove,
            order: index
          })) || []
        }
      },
      include: {
        reflections: {
          orderBy: { order: 'asc' }
        }
      }
    });

    return NextResponse.json(interview);
  } catch (error) {
    console.error('Error updating interview:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    // Check if interview belongs to user
    const existingInterview = await prisma.interview.findFirst({
      where: {
        id: params.id,
        userId: user.id
      }
    });

    if (!existingInterview) {
      return NextResponse.json({ error: 'Interview not found' }, { status: 404 });
    }

    await prisma.interview.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting interview:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
