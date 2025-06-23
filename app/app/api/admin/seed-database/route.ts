
import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    console.log('🌱 Manual database seeding initiated (public access)');
    
    // Run database seed command
    await execAsync('cd /home/ubuntu/hiremenow-coach/app && npx prisma db seed');
    
    console.log('✅ Manual database seeding completed successfully');
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database seeded successfully' 
    });
  } catch (error) {
    console.error('❌ Manual database seeding error:', error);
    return NextResponse.json(
      { error: 'Failed to seed database', details: error },
      { status: 500 }
    );
  }
}
