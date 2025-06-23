
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getAllThemes } from '@/lib/themes/registry';

export const dynamic = 'force-dynamic';

// GET available themes (now publicly accessible)
export async function GET() {
  try {
    const themes = getAllThemes();
    return NextResponse.json({ themes });
  } catch (error) {
    console.error('Error fetching themes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch themes' },
      { status: 500 }
    );
  }
}
