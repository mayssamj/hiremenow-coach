
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { hashPassword, setAuthCookie, validateUsername, validatePassword } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { username, password, preferredCompany } = await request.json();

    // Validate input
    const usernameError = validateUsername(username);
    if (usernameError) {
      return NextResponse.json({ error: usernameError }, { status: 400 });
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      return NextResponse.json({ error: passwordError }, { status: 400 });
    }

    // Check if username already exists
    const existingUser = await prisma.user.findUnique({
      where: { username }
    });

    if (existingUser) {
      return NextResponse.json({ error: 'Username already exists' }, { status: 400 });
    }

    // Hash password and create user
    const hashedPassword = await hashPassword(password);
    
    const user = await prisma.user.create({
      data: {
        id: crypto.randomUUID(),
        username,
        password: hashedPassword,
        preferredCompany: preferredCompany || null,
        updatedAt: new Date()
      }
    });

    // Set auth cookie
    await setAuthCookie({
      id: user.id,
      username: user.username,
      role: user.role,
      preferredCompany: user.preferredCompany || undefined
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        preferredCompany: user.preferredCompany
      }
    });

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
