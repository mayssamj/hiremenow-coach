
import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    console.log('🔄 Starting database refresh...');
    
    // Regenerate Prisma client and refresh database
    await execAsync('cd /home/ubuntu/hiremenow-coach/app && npx prisma generate');
    await execAsync('cd /home/ubuntu/hiremenow-coach/app && npx prisma db push');
    
    console.log('✅ Database refresh completed successfully');
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database refreshed successfully' 
    });
  } catch (error) {
    console.error('❌ Database refresh error:', error);
    return NextResponse.json(
      { error: 'Failed to refresh database', details: error },
      { status: 500 }
    );
  }
}
