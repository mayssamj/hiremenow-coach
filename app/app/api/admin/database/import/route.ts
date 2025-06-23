
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    console.log('📥 Database import initiated (public access)');
    
    const data = await req.json();
    
    // Validate data structure
    if (!data || typeof data !== 'object') {
      return NextResponse.json(
        { error: 'Invalid data format' },
        { status: 400 }
      );
    }
    
    let importStats = {
      users: 0,
      companies: 0,
      questions: 0,
      stories: 0,
      tags: 0,
      answers: 0,
    };
    
    // Import companies first (referenced by questions)
    if (data.companies && Array.isArray(data.companies)) {
      for (const company of data.companies) {
        await prisma.company.upsert({
          where: { slug: company.slug || company.name.toLowerCase().replace(/\s+/g, '-') },
          update: {
            name: company.name,
            industry: company.industry,
            description: company.description,
            website: company.website,
            logo: company.logo,
            values: company.values,
            evaluationCriteria: company.evaluationCriteria,
            interviewFormat: company.interviewFormat,
            successTips: company.successTips,
            redFlags: company.redFlags,
          },
          create: {
            name: company.name,
            slug: company.slug || company.name.toLowerCase().replace(/\s+/g, '-'),
            industry: company.industry || '',
            description: company.description || '',
            website: company.website,
            logo: company.logo,
            values: company.values || JSON.stringify([]),
            evaluationCriteria: company.evaluationCriteria || JSON.stringify([]),
            interviewFormat: company.interviewFormat || '',
            successTips: company.successTips || JSON.stringify([]),
            redFlags: company.redFlags || JSON.stringify([]),
          },
        });
        importStats.companies++;
      }
    }
    
    // Import users (excluding passwords for security)
    if (data.users && Array.isArray(data.users)) {
      for (const user of data.users) {
        // Skip if username already exists (don't overwrite existing users)
        const existing = await prisma.user.findUnique({
          where: { username: user.username }
        });
        
        if (!existing && user.username !== 'admin' && user.username !== 'demo') {
          // Generate a temporary password for imported users
          const bcrypt = require('bcryptjs');
          const tempPassword = await bcrypt.hash('temp123', 12);
          
          await prisma.user.create({
            data: {
              username: user.username,
              name: user.name || user.username,
              email: user.email || `${user.username}@example.com`,
              password: tempPassword,
              role: user.role || 'USER',
              themePreference: user.themePreference,
              isActive: user.isActive !== false,
            },
          });
          importStats.users++;
        }
      }
    }
    
    // Import questions
    if (data.questions && Array.isArray(data.questions)) {
      for (const question of data.questions) {
        // Check if question already exists
        const existing = await prisma.question.findFirst({
          where: {
            text: question.text,
            companyId: question.companyId,
          },
        });
        
        if (!existing) {
          await prisma.question.create({
            data: {
              text: question.text,
              category: question.category || 'BEHAVIORAL',
              difficulty: question.difficulty || 'MEDIUM',
              isCritical: question.isCritical || false,
              companyId: question.companyId,
              source: question.source || 'import',
              tags: question.tags || JSON.stringify([]),
            },
          });
          importStats.questions++;
        }
      }
    }
    
    // Import tags
    if (data.tags && Array.isArray(data.tags)) {
      for (const tag of data.tags) {
        await prisma.tag.upsert({
          where: { name: tag.name },
          update: {
            color: tag.color,
            description: tag.description,
            isGlobal: tag.isGlobal || false,
            usage_count: tag.usage_count || 0,
          },
          create: {
            name: tag.name,
            color: tag.color || '#3B82F6',
            description: tag.description || '',
            isGlobal: tag.isGlobal || false,
            usage_count: tag.usage_count || 0,
          },
        });
        importStats.tags++;
      }
    }
    
    // Import stories (only if users exist)
    if (data.stories && Array.isArray(data.stories)) {
      for (const story of data.stories) {
        // Check if user exists
        const user = await prisma.user.findUnique({
          where: { id: story.userId }
        });
        
        if (user) {
          await prisma.story.create({
            data: {
              title: story.title,
              situation: story.situation,
              task: story.task,
              action: story.action,
              result: story.result,
              reflection: story.reflection,
              learnings: story.learnings,
              tags: story.tags || JSON.stringify([]),
              userId: story.userId,
              isPublic: story.isPublic || false,
            },
          });
          importStats.stories++;
        }
      }
    }
    
    // Import answers (only if users and questions exist)
    if (data.answers && Array.isArray(data.answers)) {
      for (const answer of data.answers) {
        // Check if user and question exist
        const user = await prisma.user.findUnique({ where: { id: answer.userId } });
        const question = await prisma.question.findUnique({ where: { id: answer.questionId } });
        
        if (user && question) {
          await prisma.answer.create({
            data: {
              content: answer.content,
              userId: answer.userId,
              questionId: answer.questionId,
              companyId: answer.companyId,
              storyIds: answer.storyIds || JSON.stringify([]),
              tags: answer.tags || JSON.stringify([]),
              isComplete: answer.isComplete || false,
              timeSpent: answer.timeSpent || 0,
            },
          });
          importStats.answers++;
        }
      }
    }
    
    console.log('✅ Database import completed successfully:', importStats);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database imported successfully',
      stats: importStats
    });
  } catch (error) {
    console.error('❌ Database import error:', error);
    return NextResponse.json(
      { error: 'Failed to import database', details: error },
      { status: 500 }
    );
  }
}
