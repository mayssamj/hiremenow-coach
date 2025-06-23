
import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    console.log('🌱 Starting database reseed...');
    
    // Run database reset and seed commands
    await execAsync('cd /home/ubuntu/hiremenow-coach/app && npx prisma db push --force-reset');
    await execAsync('cd /home/ubuntu/hiremenow-coach/app && npx prisma db seed');
    
    console.log('✅ Database reseed completed successfully');
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database reseeded successfully' 
    });
  } catch (error) {
    console.error('❌ Database reseed error:', error);
    return NextResponse.json(
      { error: 'Failed to reseed database', details: error },
      { status: 500 }
    );
  }
}
