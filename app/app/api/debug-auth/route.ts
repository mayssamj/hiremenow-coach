
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    
    console.log('=== DEBUG AUTH API ===');
    console.log('Username:', username);
    console.log('Password provided:', !!password);
    
    if (!username || !password) {
      return NextResponse.json({
        success: false,
        error: 'Missing username or password',
        step: 'validation'
      });
    }

    // Step 1: Find user
    console.log('Step 1: Finding user...');
    const user = await prisma.user.findUnique({
      where: { username }
    });

    if (!user) {
      console.log('User not found');
      return NextResponse.json({
        success: false,
        error: 'User not found',
        step: 'user_lookup'
      });
    }

    console.log('User found:', {
      id: user.id,
      username: user.username,
      role: user.role,
      isActive: user.isActive
    });

    // Step 2: Check if active
    if (!user.isActive) {
      console.log('User is not active');
      return NextResponse.json({
        success: false,
        error: 'User is not active',
        step: 'user_status'
      });
    }

    // Step 3: Verify password
    console.log('Step 3: Verifying password...');
    console.log('Stored hash:', user.password);
    console.log('Password to verify:', password);
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Password valid:', isPasswordValid);

    if (!isPasswordValid) {
      return NextResponse.json({
        success: false,
        error: 'Invalid password',
        step: 'password_verification',
        details: {
          providedPassword: password,
          storedHash: user.password,
          bcryptResult: isPasswordValid
        }
      });
    }

    // Success
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      },
      step: 'complete'
    });

  } catch (error) {
    console.error('Debug auth error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      step: 'exception'
    });
  }
}
