
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

// Test endpoint to demonstrate that form submission logic is now working
export async function POST(req: NextRequest) {
  try {
    // Simulate authenticated user (demo user)
    const demoUserId = 'cmc5d77nb0001tf2l5t42gldx'; // Demo user ID from our test
    
    const body = await req.json();
    const { testType, ...data } = body;

    if (testType === 'question-answer') {
      // Test question answer submission
      const { questionId, content, isComplete, tags, timeSpent } = data;
      
      // Verify question exists
      const question = await prisma.question.findUnique({
        where: { id: questionId },
        include: { company: true },
      });

      if (!question) {
        return NextResponse.json({ error: 'Question not found' }, { status: 404 });
      }

      // Create answer (this is the exact logic that was failing before)
      const answer = await prisma.answer.upsert({
        where: {
          questionId_userId: {
            questionId: questionId,
            userId: demoUserId,
          },
        },
        update: {
          content: content.trim(),
          isComplete: !!isComplete,
          tags: tags || [],
          timeSpent: timeSpent || 0,
          updatedAt: new Date(),
        },
        create: {
          content: content.trim(),
          questionId: questionId,
          userId: demoUserId,
          companyId: question.companyId,
          isComplete: !!isComplete,
          tags: tags || [],
          timeSpent: timeSpent || 0,
        },
      });

      return NextResponse.json({ 
        success: true, 
        message: 'Question answer submission working!',
        answer: { id: answer.id, content: answer.content }
      });

    } else if (testType === 'story-creation') {
      // Test story creation
      const { title, situation, task, action, result, reflection, learnings, tags, isPublic } = data;
      
      // Validate required fields
      if (!title || title.trim() === '') {
        return NextResponse.json({ error: 'Title is required' }, { status: 400 });
      }
      if (!situation || situation.trim() === '') {
        return NextResponse.json({ error: 'Situation is required' }, { status: 400 });
      }
      if (!task || task.trim() === '') {
        return NextResponse.json({ error: 'Task is required' }, { status: 400 });
      }
      if (!action || action.trim() === '') {
        return NextResponse.json({ error: 'Action is required' }, { status: 400 });
      }
      if (!result || result.trim() === '') {
        return NextResponse.json({ error: 'Result is required' }, { status: 400 });
      }
      
      // Create story (this is the exact logic that was failing before)
      const story = await prisma.story.create({
        data: {
          title,
          situation,
          task,
          action,
          result,
          reflection: reflection || null,
          learnings: learnings || null,
          tags: tags || [],
          isPublic: !!isPublic,
          userId: demoUserId,
        },
      });

      return NextResponse.json({ 
        success: true, 
        message: 'Story creation working!',
        story: { id: story.id, title: story.title }
      });
    }

    return NextResponse.json({ error: 'Invalid test type' }, { status: 400 });

  } catch (error) {
    console.error('Test endpoint error:', error);
    return NextResponse.json(
      { error: 'Form submission test failed', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
