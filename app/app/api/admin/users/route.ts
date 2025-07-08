
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getAuthUserFromRequest, requireAdmin, hashPassword, validateUsername, validatePassword } from '@/lib/auth';

// Get all users (admin only)
export async function GET(request: NextRequest) {
  try {
    const user = getAuthUserFromRequest(request);
    requireAdmin(user);

    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        role: true,
        preferredCompany: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            Story: true,
            Progress: true,
            Interview: true,
            PrivateAnswer: true,
            PublicAnswer: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    if (error instanceof Error && error.message === 'Admin access required') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

// Create new user (admin only)
export async function POST(request: NextRequest) {
  try {
    const user = getAuthUserFromRequest(request);
    requireAdmin(user);

    const { username, password, role = 'USER', preferredCompany } = await request.json();

    // Validate input
    const usernameError = validateUsername(username);
    if (usernameError) {
      return NextResponse.json({ error: usernameError }, { status: 400 });
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      return NextResponse.json({ error: passwordError }, { status: 400 });
    }

    if (role && !['USER', 'ADMIN'].includes(role)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
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
    const newUser = await prisma.user.create({
      data: {
        id: crypto.randomUUID(),
        username,
        password: hashedPassword,
        role,
        preferredCompany,
        updatedAt: new Date()
      },
      select: {
        id: true,
        username: true,
        role: true,
        preferredCompany: true,
        createdAt: true,
        updatedAt: true
      }
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    if (error instanceof Error && error.message === 'Admin access required') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}
