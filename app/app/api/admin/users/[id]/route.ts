
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getAuthUserFromRequest, requireAdmin, hashPassword, validateUsername, validatePassword } from '@/lib/auth';

// Get specific user details (admin only)
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = getAuthUserFromRequest(request);
    requireAdmin(user);

    const targetUser = await prisma.user.findUnique({
      where: { id: params.id },
      include: {
        Story: {
          include: {
            StoryTag: {
              include: {
                Tag: true
              }
            }
          }
        },
        Progress: {
          include: {
            Question: true
          }
        },
        Interview: {
          include: {
            InterviewReflection: true
          }
        },
        PrivateAnswer: {
          include: {
            Question: true
          }
        },
        PublicAnswer: {
          include: {
            Question: true
          }
        },
        _count: {
          select: {
            Story: true,
            Progress: true,
            Interview: true,
            PrivateAnswer: true,
            PublicAnswer: true
          }
        }
      }
    });

    if (!targetUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = targetUser;

    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error('Error fetching user:', error);
    if (error instanceof Error && error.message === 'Admin access required') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}

// Update user (admin only)
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = getAuthUserFromRequest(request);
    requireAdmin(user);

    const { username, password, role, preferredCompany } = await request.json();

    const updateData: any = {};

    if (username !== undefined) {
      const usernameError = validateUsername(username);
      if (usernameError) {
        return NextResponse.json({ error: usernameError }, { status: 400 });
      }

      // Check if username is already taken by another user
      const existingUser = await prisma.user.findFirst({
        where: {
          username,
          NOT: { id: params.id }
        }
      });

      if (existingUser) {
        return NextResponse.json({ error: 'Username already exists' }, { status: 400 });
      }

      updateData.username = username;
    }

    if (password !== undefined && password !== '') {
      const passwordError = validatePassword(password);
      if (passwordError) {
        return NextResponse.json({ error: passwordError }, { status: 400 });
      }
      updateData.password = await hashPassword(password);
    }

    if (role !== undefined) {
      if (!['USER', 'ADMIN'].includes(role)) {
        return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
      }
      updateData.role = role;
    }

    if (preferredCompany !== undefined) {
      updateData.preferredCompany = preferredCompany;
    }

    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: updateData,
      select: {
        id: true,
        username: true,
        role: true,
        preferredCompany: true,
        createdAt: true,
        updatedAt: true
      }
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    if (error instanceof Error && error.message === 'Admin access required') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

// Delete user (admin only)
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = getAuthUserFromRequest(request);
    const adminUser = requireAdmin(user);

    // Prevent admin from deleting themselves
    if (adminUser.id === params.id) {
      return NextResponse.json({ error: 'Cannot delete your own account' }, { status: 400 });
    }

    await prisma.user.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting user:', error);
    if (error instanceof Error && error.message === 'Admin access required') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}
