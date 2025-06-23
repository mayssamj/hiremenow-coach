
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    console.log('📤 Database export initiated (public access)');
    
    // Export all data from database
    const data = {
      users: await prisma.user.findMany({
        select: {
          id: true,
          username: true,
          name: true,
          email: true,
          role: true,
          themePreference: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
          // Exclude password for security
        }
      }),
      companies: await prisma.company.findMany(),
      questions: await prisma.question.findMany(),
      stories: await prisma.story.findMany(),
      tags: await prisma.tag.findMany(),
      answers: await prisma.answer.findMany(),
      exportTimestamp: new Date().toISOString(),
      version: '1.0'
    };
    
    console.log('✅ Database export completed successfully');
    
    return new Response(JSON.stringify(data, null, 2), {
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="hiremenow-export-${new Date().toISOString().split('T')[0]}.json"`,
      },
    });
  } catch (error) {
    console.error('❌ Database export error:', error);
    return NextResponse.json(
      { error: 'Failed to export database', details: error },
      { status: 500 }
    );
  }
}
