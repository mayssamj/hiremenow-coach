
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const interviews = await prisma.interview.findMany({
      where: {
        userId: user.id
      },
      include: {
        reflections: {
          orderBy: { order: 'asc' }
        }
      },
      orderBy: {
        date: 'desc'
      }
    });

    return NextResponse.json(interviews);
  } catch (error) {
    console.error('Error fetching interviews:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const body = await request.json();
    const { title, company, date, round, interviewer, outcome, overallNotes, reflections } = body;

    // Create interview with reflections
    const interview = await prisma.interview.create({
      data: {
        userId: user.id,
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
    console.error('Error creating interview:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
